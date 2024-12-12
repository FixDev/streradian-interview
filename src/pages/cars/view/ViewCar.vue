<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h4>Car Form View</h4>
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Car Name"
        lazy-rules
        disable
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="image"
        label="Image"
        lazy-rules
        disable
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <q-img v-if="image !== ''" :src="image" />

      <q-input
        filled
        v-model="month_rate"
        label="Month Rate"
        lazy-rules
        disable
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <q-input
        filled
        v-model="day_rate"
        label="Day Rate"
        lazy-rules
        disable
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <div>
        <q-btn label="Back" color="primary" @click="() => routers.back()" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useCarsStore } from 'src/stores/cars'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRoute()
    const routers = useRouter()
    const id = router.params.id
    const store = useCarsStore()
    const name = ref(null)
    const image = ref(null)
    const month_rate = ref(null)
    const day_rate = ref(null)
    onMounted(async () => {
      const res = await store.getCar(id)

      name.value = res.name
      image.value = res.image
      month_rate.value = res.month_rate
      day_rate.value = res.day_rate
    })
    return {
      name,
      image,
      month_rate,
      day_rate,
      routers,
    }
  },
}
</script>
