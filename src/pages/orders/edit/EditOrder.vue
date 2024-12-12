<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h4>Order Form Edit</h4>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-select
        filled
        v-model="car_id"
        use-input
        input-debounce="0"
        label="Car ID"
        :options="options"
        @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input label="Order Date" filled v-model="order_date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="order_date" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input label="Pickup Date" filled v-model="pickup_date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="pickup_date" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input label="Dropoff Date" filled v-model="dropoff_date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dropoff_date" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        filled
        v-model="pickup_location"
        label="Pickup Location"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <q-input
        filled
        v-model="dropoff_location"
        label="Dropoff Location"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <div class="q-gutter-sm">
        <q-btn label="Back" color="primary" @click="() => router.back()" />
        <q-btn label="Submit" type="submit" color="primary" :loading="isLoading" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useOrdersStore } from 'src/stores/orders'
import { useCarsStore } from 'src/stores/cars'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()
    const id = route.params.id
    const store = useOrdersStore()
    const carStore = useCarsStore()
    const car_id = ref(null)
    const order_date = ref(null)
    const pickup_date = ref(null)
    const dropoff_date = ref(null)
    const dropoff_location = ref(null)
    const pickup_location = ref(null)
    let isLoading = ref(false)
    onMounted(async () => {
      const res = await store.getOrder(id)

      car_id.value = res.car_id
      order_date.value = res.order_date
      pickup_date.value = res.pickup_date
      dropoff_date.value = res.dropoff_date
      dropoff_location.value = res.dropoff_location
      pickup_location.value = res.pickup_location
    })

    let options = ref([])
    onMounted(() => getCar())
    const getCar = async () => {
      const res = await carStore.getCars()

      options.value = res.map((value) => {
        return `${value.name} - ${value.id}`
      })
    }

    return {
      car_id,
      order_date,
      pickup_date,
      dropoff_date,
      pickup_location,
      dropoff_location,
      router,
      isLoading,

      async onSubmit() {
        isLoading.value = true

        const body = {
          car_id: car_id.value,
          order_date: order_date.value,
          pickup_date: pickup_date.value,
          dropoff_date: dropoff_date.value,
          dropoff_location: dropoff_location.value,
        }
        await store.editOrder(id, body)
        isLoading.value = false
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          position: 'top',
          icon: 'cloud_done',
          message: 'Submitted',
        })
      },
      options,
      async filterFn(val, update) {
        update(async () => {
          const needle = val.toLowerCase()
          const temp = await carStore.getCars()
          let _tmp = temp.map((value) => {
            return `${value.name} - ${value.id}`
          })
          options.value = _tmp.filter((v) => v.toLowerCase().indexOf(needle) > -1)
        })
      },
    }
  },
}
</script>
