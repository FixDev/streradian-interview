<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h4>Order Form Add</h4>
    <q-form class="q-gutter-md">
      <q-input
        filled
        disable=""
        v-model="car_id"
        label="Car ID"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input disable label="Order Date" filled v-model="order_date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date disable v-model="order_date" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input disable label="Pickup Date" filled v-model="pickup_date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date disable v-model="pickup_date" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input disable="" label="Dropoff Date" filled v-model="dropoff_date">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date disable v-model="dropoff_date" mask="YYYY-MM-DD">
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
        disable=""
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <q-input
        filled
        v-model="dropoff_location"
        label="Dropoff Location"
        lazy-rules
        disable=""
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <div class="q-gutter-sm">
        <q-btn label="Back" color="primary" @click="() => router.back()" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useOrdersStore } from 'src/stores/orders'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const store = useOrdersStore()
    const car_id = ref(null)
    const order_date = ref(null)
    const pickup_date = ref(null)
    const dropoff_date = ref(null)
    const dropoff_location = ref(null)
    const pickup_location = ref(null)
    onMounted(async () => {
      const res = await store.getOrder(id)

      car_id.value = res.car_id
      order_date.value = res.order_date
      pickup_date.value = res.pickup_date
      dropoff_date.value = res.dropoff_date
      dropoff_location.value = res.dropoff_location
      pickup_location.value = res.pickup_location
    })

    return {
      car_id,
      order_date,
      pickup_date,
      dropoff_date,
      pickup_location,
      dropoff_location,
      router,
    }
  },
}
</script>
