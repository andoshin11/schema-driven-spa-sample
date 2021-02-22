import axios from 'axios'
import { injectable } from 'tsyringe'
import { APIRequest } from './APIRequest'
import { APIError } from './APIError'
import { HTTPMethod } from './types'

interface HttpError extends Error {
  response?: {
    status: number
  }
  message: string
}

@injectable()
export default class APIClient {
  baseURL = process.env.NODE_ENV === 'production' ? 'http://petstore.swagger.io/v1' : 'http://localhost:3010'
  timeout = 15 * 1000

  request<U>(request: APIRequest<U>): Promise<U> {
    const isGET = request.method === HTTPMethod.GET

    return new Promise<U>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: request.method,
          params: isGET && request.params,
          data: !isGET && request.params,
          withCredentials: true,
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders()
        })
        .then(async response => {
          resolve(response.data)
        })
        .catch(err => {
          const apiError = this.normalizeError(err)
          reject(apiError)
        })
    })
  }

  // Convert axios error into APIError
  private normalizeError(error: HttpError): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error
    }
  }

  // Create headers
  private createHeaders() {
    let header = {
      'Content-Type': 'application/json'
    } as object

    return header
  }
}
