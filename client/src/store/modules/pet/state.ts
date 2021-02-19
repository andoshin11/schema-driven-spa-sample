import { PetData } from '@/domain/Pet'

export interface PetState {
  byIds: Record<PetData['id'], PetData>,
  allIds: Array<PetData['id']>
}

export const initialState = (): PetState => ({
  byIds: {},
  allIds: []
})
