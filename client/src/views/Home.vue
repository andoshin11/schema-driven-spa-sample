<template>
  <div class="home">
    <h1>Pet List</h1>
    <PetList/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { container } from 'tsyringe'
import FetchPostsUsecase from '@/usecases/pet/FetchPetsUsecase'
import PetList from '@/containers/Pet/List'

export default defineComponent({
  components: {
    PetList
  },
  name: "Home",
  setup() {
    onBeforeMount(async () => {
      const fetchPostsUsecase = container.resolve(FetchPostsUsecase)
      await fetchPostsUsecase.execute()
    })
  }
});
</script>
