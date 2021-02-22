import { inject, injectable } from 'tsyringe'
import PetStoreGateway from '@/interface/gateways/PetStoreGateway'
import PetRepository from '@/domain/repositories/PetRepository'

@injectable()
export default class FetchPetsUsecase implements BaseUseCase {
  constructor(
    @inject('PetStoreGateway') private petStoreGateway: PetStoreGateway,
    @inject('PetRepository') private petRepository: PetRepository
  ) {}

  async execute(params?: { limit?: number; offset?: number }) {
   try {
    const pets = await this.petStoreGateway.getPets(params)
    this.petRepository.savePets(pets)
   } catch (e) {
     // TODO: send logs via injected Logger
     throw e
   }
  }
}
