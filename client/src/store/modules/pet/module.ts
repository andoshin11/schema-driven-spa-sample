import { PetState, initialState } from './state'
import { createTypeSafeModule } from '@/libs/vuex-type-kit'
import { PetData } from '@/domain/Pet'

export const module = createTypeSafeModule({
  namespaced: true,
  state: initialState,
  mutations: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    store_all_pets: (state, payload: { pets: PetData[] }) => {
      const hash = payload.pets.reduce((acc, ac) => ((acc[ac.id] = ac), acc), {} as PetState['byIds'])
      state.byIds = {
        ...state.byIds,
        ...hash
      }
      state.allIds = Object.keys(hash).map(Number)
    }
  }
})
