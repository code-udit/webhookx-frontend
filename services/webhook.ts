import api from "./api"

export const createWebhook = async (url: string) => {

  const response = await api.post(
    `/webhook/create?url=${encodeURIComponent(url)}`
  )

  return response.data
}