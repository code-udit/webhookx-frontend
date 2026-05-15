import api from "./api"

export const retryDelivery = async (id: number) => {
  const res = await api.post(`/webhook/retry/${id}`)
  return res.data
}