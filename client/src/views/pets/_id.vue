<template>
  <div class="PetProfile">
    <h1>Pet Profile</h1>
    <Suspense>
      <template #default>
        <PetProfile :petId="petId"/>
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from 'vue-router'
import PetProfile from '@/containers/Pet/Profile'

export default defineComponent({
  components: {
    PetProfile
  },
  name: "PetProfile",
  setup() {
    const route = useRoute()
    const petId = computed(() => parseInt(route.params.petId as string, 10))

    return {
      petId
    }
  }
});
</script>
