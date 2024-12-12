import { defineStore, acceptHMRUpdate } from 'pinia'
import { addOrder, deleteOrder, editOrder, getOrder, getOrders } from 'src/services/orders'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    rows: [],
  }),
  getters: {
    getRow: (state) => state.rows,
  },
  actions: {
    async getOrders() {
      const res = await getOrders()

      this.rows = res.data
    },
    async getOrder(id) {
      const res = await getOrder(id)

      return res.data
    },
    async addOrder(body) {
      const res = await addOrder(body)

      this.rows = res.data
    },
    async editOrder(id, body) {
      const res = await editOrder(id, body)

      this.rows = res.data
    },
    async deleteOrder(id) {
      const res = await deleteOrder(id)

      this.rows = res.data
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrdersStore, import.meta.hot))
}
