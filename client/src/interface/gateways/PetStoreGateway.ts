import { PetData } from '@/domain/entities/Pet'

export default interface PetStoreGateway {
  getPets: (params?: { limit?: number; offset?: number }) => Promise<PetData[]>
  getPet: (id: PetData['id']) => Promise<PetData>
  createPet: (params: Omit<PetData, 'id'>) => Promise<PetData>
}
