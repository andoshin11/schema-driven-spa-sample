<template>
  <div class="PetList">
    <DataTable :value="presenter.pets">
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="categoryStr" header="Type" :sortable="true"></Column>
      <Column header="Link">
        <template #body="slotProps">
          <router-link :to="`/pets/${slotProps.data.id}`">
            Link
          </router-link>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { container } from 'tsyringe'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import PetRepository from '@/interface/repositories/PetRepository'
import { usePresenter } from '@/hooks/usePresenter'

export default defineComponent({
  components: {
    DataTable,
    Column
  },
  setup() {
    const presenter = usePresenter(() => {
      const petRepository = container.resolve<PetRepository>('PetRepository')
      const pets = petRepository.getPets()

      return {
        pets
      }
    })
    
    return {
      presenter
    }
  }
});
</script>
