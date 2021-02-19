import { singleton, inject } from 'tsyringe'
import PetRepository from '@/interface/repositories/PetRepository'
import { Store } from '@/store'
import PetEntity, { PetData } from '@/domain/Pet'

@singleton()
export default class PetRepositoryImpl implements PetRepository {
  constructor(@inject('Store') private _store: Store) {}

  getPets() {
    const { state } = this._store // Type Safe Access
    const { allIds } = state.pet
    const dataList = allIds.map(id => state.pet.byIds[id]).filter(Boolean)
    return dataList.map(data => new PetEntity(data))
  }

  getPet(id: PetData['id']) {
    const { state } = this._store // Type Safe Access
    const data = state.pet.byIds[id]
    return data ? new PetEntity(data) : null
  }

  savePets(pets: PetData[]) {
    // Type Safe Mutation (Both mutation type & payload type)
    this._store.commit('pet/store_all_pets', { pets })
  }
}
