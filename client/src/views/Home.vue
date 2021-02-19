<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { container } from 'tsyringe'
import PetRepository from '@/interface/repositories/PetRepository'

export default defineComponent({
  name: "Home",
  setup() {
    console.log('Inside setup')
    const repository = container.resolve<PetRepository>('PetRepository')
    console.log('repository')
    console.log(repository)
  }
});
</script>
