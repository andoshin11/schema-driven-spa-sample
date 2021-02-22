import PetEntity, { PetData } from '@/domain/entities/Pet'

export default interface PetRepository {
  getPets(): PetEntity[]
  getPet(id: PetData['id']): PetEntity | null
  savePets(pets: PetData[]): void
}
