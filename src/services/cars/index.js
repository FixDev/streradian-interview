import axios from 'axios'

const endpoint = 'https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars'

export const getCars = async () => {
  try {
    const res = await axios.get(endpoint)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const getCar = async (id) => {
  try {
    const res = await axios.get(`${endpoint}/${id}`)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const addCar = async (body) => {
  try {
    const res = await axios.post(endpoint, body)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const editCar = async (id, body) => {
  try {
    const res = await axios.put(`${endpoint}/${id}`, body)

    return res
  } catch (error) {
    console.error(error)
  }
}
export const deleteCar = async (id) => {
  try {
    const res = await axios.delete(`${endpoint}/${id}`)

    return res
  } catch (error) {
    console.error(error)
  }
}
