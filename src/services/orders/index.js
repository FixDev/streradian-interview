import axios from 'axios'

const endpoint = 'https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders'

export const getOrders = async () => {
  try {
    const res = await axios.get(endpoint)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const getOrder = async (id) => {
  try {
    const res = await axios.get(`${endpoint}/${id}`)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const addOrder = async (body) => {
  try {
    const res = await axios.post(endpoint, body)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const editOrder = async (id, body) => {
  try {
    const res = await axios.put(`${endpoint}/${id}`, body)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${endpoint}/${id}`)

    return res
  } catch (error) {
    console.error(error)
  }
}
