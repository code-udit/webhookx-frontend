import api from "./api"

export const createWebhook = async (
  target_url: string
) => {

  const response = await api.post(
    `/webhook/create?url=${target_url}`
  )

  return response.data
}