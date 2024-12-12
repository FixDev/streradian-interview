<template>
  <div class="q-pa-md">
    <h4>Order List</h4>
    <q-btn
      class="q-mb-sm"
      color="primary"
      label="Add Order"
      @click="() => router.push('/order/add')"
    />
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
          <q-td key="car_id" :props="props">
            {{ props.row.car_id }}
          </q-td>

          <q-td key="order_date" :props="props">
            {{ props.row.order_date }}
          </q-td>
          <q-td key="pickup_date" :props="props">
            {{ props.row.pickup_date }}
          </q-td>
          <q-td key="dropoff_date" :props="props">
            {{ props.row.dropoff_date }}
          </q-td>
          <q-td key="dropoff_location" :props="props">
            {{ props.row.dropoff_location }}
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
import { useOrdersStore } from 'src/stores/orders'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const orderStore = useOrdersStore()

onMounted(async () => await orderStore.getOrders())

const rows = computed(() => orderStore.getRow)

const router = useRouter()
const columns = [
  {
    name: 'car_id',
    required: true,
    label: 'Car ID',
    align: 'left',
    field: (row) => row.car_id,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'order_date', align: 'center', label: 'Order Date', field: 'order_date', sortable: true },
  {
    name: 'pickup_date',
    align: 'center',
    label: 'Pickup Date',
    field: 'pickup_date',
    sortable: true,
  },
  {
    name: 'dropoff_date',
    align: 'center',
    label: 'Dropoff Date',
    field: 'dropoff_date',
    sortable: true,
  },
  {
    name: 'dropoff_location',
    align: 'center',
    label: 'Dropoff Location',
    field: 'dropoff_location',
  },
  {
    name: 'id',
    align: 'center',
    label: 'ID',
    field: 'id',
  },
  {
    name: 'action',
    align: 'center',
    label: 'Action',
    field: '',
  },
]

const view = (id) => {
  router.push(`/order/view/${id}`)
}
const edit = (id) => {
  router.push(`/order/edit/${id}`)
}

const deleteRow = async (id) => {
  await orderStore.deleteOrder(id)

  await orderStore.getOrders()
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
