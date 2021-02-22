import { Plugin } from 'vue'
import { container, Lifecycle } from 'tsyringe'
import { Store } from '@/store'
import PetStoreGatewayImpl from '@/gateways/PetStoreGateway'
import PetRepositoryImpl from '@/domain/repositories/PetRepository'

const plugin: Plugin = {
  install: (app) => {
    const store = app._context.provides.store as Store

    container.register('Store', { useValue: store })

    // Repository
    container.register('PetRepository', { useClass: PetRepositoryImpl }, { lifecycle: Lifecycle.Singleton })

    // Gateway
    container.register('PetStoreGateway', { useClass: PetStoreGatewayImpl }, { lifecycle: Lifecycle.Singleton })
  }
}

export default plugin
