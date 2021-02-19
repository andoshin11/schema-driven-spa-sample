import { createTypeSafeStore } from '@/libs/vuex-type-kit'

import * as pet from './modules/pet'

export interface RootState {
  pet: pet.PetState
}

const modules = {
  pet: pet.module
}

export const createStore = () => createTypeSafeStore<RootState, typeof modules>({
  modules
})

export type Store = ReturnType<typeof createStore>
