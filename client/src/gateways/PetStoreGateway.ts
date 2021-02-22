import { singleton } from 'tsyringe'
import PetStoreGateway from '@/interface/gateways/PetStoreGateway'
import APIClient from '@/infra/network/APIClient'
import { listPets, showPetById, createPets } from '@/infra/network/requests'
import { PetData } from '@/domain/entities/Pet'

const DEFAULT_LIMIT = 5
const DEFAULT_OFFSET = 0

@singleton()
export default class PetStoreGatewayImpl implements PetStoreGateway {
  constructor(private client: APIClient) {}

  async getPets(params: { limit?: number; offset?: number } = {}) {
    const limit = params.limit || DEFAULT_LIMIT
    const offset = params.offset || DEFAULT_OFFSET
    const req = new listPets({
      params: { limit, offset }
    })
    const { pets } = await this.client.request(req)

    return pets
  }

  async getPet(id: PetData['id']) {
    const req = new showPetById({
      pathParameter: { petId: '' + id }
    })
    const { pet } = await this.client.request(req)

    return pet
  }

  async createPet(params: Omit<PetData, 'id'>) {
    const req = new createPets({
      params
    })
    const { pet } = await this.client.request(req)

    return pet
  }
}
