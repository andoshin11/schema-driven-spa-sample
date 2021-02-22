<template>
{{ presenter }}
  <div class="PetProfile" v-if="presenter.pet">
    <div class="block">
      <label class="label">ID</label>
      <div class="content">{{ presenter.pet.id }}</div>
    </div>
    <div class="block">
      <label class="label">Name</label>
      <div class="content">{{ presenter.pet.name }}</div>
    </div>
    <div class="block">
      <label class="label">Type</label>
      <div class="content">{{ presenter.pet.categoryStr }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { container } from 'tsyringe'
import PetRepository from '@/interface/repositories/PetRepository'
import FetchPetUseCase from '@/usecases/pet/FetchPetUseCase'
import { usePresenter } from '@/hooks/usePresenter'

export default defineComponent({
  props: {
    petId: {
      type: Number,
      required: true
    }
  },
  async setup(props) {

    const fetchPostsUsecase = container.resolve(FetchPetUseCase)
    await fetchPostsUsecase.execute(props.petId)

    const presenter = usePresenter(() => {
      const petRepository = container.resolve<PetRepository>('PetRepository')
      const pet = petRepository.getPet(props.petId)

      return {
        pet
      }
    })
    
    return {
      presenter
    }
  }
});
</script>
