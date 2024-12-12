<template>
  <div class="q-pa-md">
    <h4>Car List</h4>
    <q-btn class="q-mb-sm" color="primary" label="Add Car" @click="() => router.push('/car/add')" />
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      flat
      bordered
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      row-key="index"
      :rows="rows || []"
      :columns="columns"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="image" :props="props">
            <q-img
              :src="props.row.image"
              spinner-color="white"
              style="height: 140px; max-width: 150px"
            />
          </q-td>
          <q-td key="month_rate" :props="props">
            {{ props.row.month_rate }}
          </q-td>
          <q-td key="day_rate" :props="props">
            {{ props.row.day_rate }}
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>

          <q-td key="action" :props="props">
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="view(props.row.id)"
              icon="visibility"
            ></q-btn>
            <q-btn dense round flat color="grey" @click="edit(props.row.id)" icon="edit"></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="deleteRow(props.row.id)"
              icon="delete"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useCarsStore } from 'src/stores/cars'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const carStore = useCarsStore()

onMounted(async () => await carStore.getCars())

const rows = computed(() => carStore.getRow)

const router = useRouter()
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'image', align: 'center', label: 'Image', field: 'image' },
  { name: 'month_rate', align: 'center', label: 'Month Rate', field: 'month_rate', sortable: true },
  { name: 'day_rate', align: 'center', label: 'Day Rate', field: 'day_rate', sortable: true },
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  {
    name: 'action',
    align: 'center',
    label: 'Action',
    field: '',
  },
]

const view = (id) => {
  router.push(`/car/view/${id}`)
}
const edit = (id) => {
  router.push(`/car/edit/${id}`)
}

const deleteRow = async (id) => {
  await carStore.deleteCar(id)

  await carStore.getCars()
}
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 600px

  .q-table__top,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: $primary
    color: white

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
