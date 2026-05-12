import api from "./api"

export const deleteWebhook = async (id: number) => {
  const response = await api.delete(`/webhook/delete/${id}`)

  return response.data
}