import { defineStore, acceptHMRUpdate } from 'pinia'
import { getCars, getCar, editCar, deleteCar, addCar } from 'src/services/cars'

export const useCarsStore = defineStore('cars', {
  state: () => ({
    rows: [],
  }),
  getters: {
    getRow: (state) => state.rows,
  },
  actions: {
    async getCars() {
      const res = await getCars()

      this.rows = res.data

      return res.data
    },
    async getCar(id) {
      const res = await getCar(id)

      return res.data
    },
    async addCar(body) {
      const res = await addCar(body)

      this.rows = res.data
    },
    async editCar(id, body) {
      const res = await editCar(id, body)

      this.rows = res.data
    },
    async deleteCar(id) {
      const res = await deleteCar(id)

      this.rows = res.data
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCarsStore, import.meta.hot))
}
