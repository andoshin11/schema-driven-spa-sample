import PetEntity, { PetData } from '@/domain/Pet'

export default interface PetRepository {
  getPets(): PetEntity[]
  getPet(id: PetData['id']): PetEntity | null
  savePets(pets: PetData[]): void
}
