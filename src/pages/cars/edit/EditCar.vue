<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h4>Car Form Edit</h4>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Car Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="image"
        label="Image"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <q-img v-if="image !== ''" :src="image" />

      <q-input
        filled
        v-model="month_rate"
        label="Month Rate"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please types something']"
      />

      <q-input
        filled
        v-model="day_rate"
        label="Day Rate"
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
import { useCarsStore } from 'src/stores/cars'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const $q = useQuasar()
    const store = useCarsStore()
    const name = ref(null)
    const image = ref(null)
    const month_rate = ref(null)
    const day_rate = ref(null)
    let isLoading = ref(false)
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
      isLoading,

      async onSubmit() {
        isLoading.value = true

        const body = {
          name: name.value,
          image: image.value,
          month_rate: month_rate.value,
          day_rate: day_rate.value,
        }
        await store.editCar(id, body)
        isLoading.value = false
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          position: 'top',
          icon: 'cloud_done',
          message: 'Submitted',
        })
      },
      router,
    }
  },
}
</script>
