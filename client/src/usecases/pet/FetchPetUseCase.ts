import { inject, injectable } from 'tsyringe'
import PetStoreGateway from '@/interface/gateways/PetStoreGateway'
import PetRepository from '@/domain/repositories/PetRepository'
import { PetData } from '@/domain/entities/Pet'

@injectable()
export default class FetchPetUsecase implements BaseUseCase {
  constructor(
    @inject('PetStoreGateway') private petStoreGateway: PetStoreGateway,
    @inject('PetRepository') private petRepository: PetRepository
  ) {}

  async execute(petId: PetData['id']) {
   try {
    const pet = await this.petStoreGateway.getPet(petId)
    this.petRepository.savePets([pet])
   } catch (e) {
     // TODO: send logs via injected Logger
     throw e
   }
  }
}
