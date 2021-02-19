import axios, { AxiosResponse } from 'axios'
import { injectable } from 'tsyringe'
import { APIRequest } from './APIRequest'
import { APIError } from './APIError'
import { HTTPMethod } from './types'

@injectable()
export class APIClient implements NetworkClient {
  baseURL: string
  timeout = 15 * 1000
  appConfig: Config['app']

  constructor(private metaRepository?: MetaRepository) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.appConfig = process.env.APP_CONFIG as any

    /**
     * 下記のクライテリアに沿ってリクエストホストを設定。
     *
     * 1. 開発用モード(Agreed Mode)かどうかの判定
     * 2. SSRかどうかの判定(Deprecated)
     *
     */

    const isAgreedMode = process.env.FLAG_AGREED === 'enabled' && process.env.NODE_ENV !== 'production'

    if (!isAgreedMode) {
      this.baseURL = this.appConfig ? this.appConfig.services.snapsnap.base : ''
    } else {
      this.baseURL = 'http://127.0.0.1:3010/api'
    }
  }

  request<U>(request: APIRequest<U>): Promise<U> {
    const isGET = request.method === HTTPMethod.GET
    const { deleteCachesAfterSuccess, deleteAllCaches } = request

    return new Promise<U>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: request.method,
          params: isGET && request.params,
          data: !isGET && this.encodedParams(request.params, request.method),
          withCredentials: true,
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders(),
          httpsAgent
        })
        .then(data => {
          // Response interceptor
          this.saveLatestServerTimestamp(data.headers)

          const response = request.parse ? request.parse(data) : this.parse<U>(data)
          return response
        })
        .then(async response => {
          // Service Workerがキャッシュした内容をlocal cacheから削除
          if (!!deleteCachesAfterSuccess && !!navigator.serviceWorker) {
            console.info(`purging client cache: ${JSON.stringify(deleteCachesAfterSuccess)}`)
            await Promise.all(
              deleteCachesAfterSuccess.map(async key => {
                await caches.delete(key)
              })
            )
          }

          if (!!deleteAllCaches && !!navigator.serviceWorker) {
            const keys = await caches.keys()
            const targetKeys = keys.filter(k => /^snapsnap-api-.*$/.test(k))
            console.log('deleting all caches...')
            await Promise.all(
              targetKeys.map(async key => {
                await caches.delete(key)
              })
            )
          }

          resolve(response)
        })
        .catch(err => {
          const apiError = this.normalizeError(err)
          reject(apiError)
        })
    })
  }

  // MetaRepositoryに最新のServerTimestampを保存する擬似Middleware
  // TODO: 出来ればGateway Layerで処理したい - 20190516 Shin Ando
  private saveLatestServerTimestamp(headers: AxiosResponse['headers']) {
    const serverTimestamp = headers['x-server-timestamp'] as string | undefined

    if (!serverTimestamp || !this.metaRepository) return
    this.metaRepository.saveLatestServerTimestamp(serverTimestamp)
  }

  // Default parser
  private parse<U>(data: AxiosResponse): U {
    return data.data
  }

  // Convert axios error into APIError
  private normalizeError(error: HttpError): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error
    }
  }

  private encodedParams(params: Record<string, string>, method: TupleToUnion<typeof HTTPMethod>) {
    if (method === HTTPMethod.POST && process.env.FLAG_AGREED === 'enabled') {
      return qs.stringify(params)
    }

    // Escape string
    // if (!params) return params

    // const escapeParams = (p: any): any => {
    //   if (typeof p === 'object') {
    //     if (Array.isArray(p)) {
    //       return p.map(escapeParams)
    //     }
    //     return Object.entries(p).reduce((acc, [_key, _val]) => {
    //       acc[_key] = escapeParams(_val)
    //       return acc
    //     }, {} as Record<string, string>)
    //   } else if (typeof p === 'string') {
    //     return escape(p)
    //   } else {
    //     return p
    //   }
    // }

    // return Object.entries(params).reduce(
    //     (acc, [key, val]) => {
    //       acc[key] = escapeParams(val)
    //       return acc
    //     },
    //     {} as typeof params
    //   )

    return params
  }

  // Create headers
  private createHeaders() {
    let header = {
      'Content-Type': 'application/json',
      xhrFields: true,
      withCredentials: true,
      'Access-Control-Allow-Origin': '*'
    } as object

    // For Dev use only
    if (process.env.NODE_ENV !== 'production' && process.env.FLAG_AGREED === 'enabled') {
      header = {}
    }

    return header
  }
}