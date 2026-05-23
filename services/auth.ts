import api from "./api"

export const loginUser = async (
  email: string,
  password: string
) => {

  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  ).catch(() => {
    throw new Error("Login failed")
  })

  const token =
    response.data?.access_token ||
    response.data?.token

  if (!token || token === "undefined") {
    throw new Error("Invalid token from backend")
  }

  localStorage.setItem("token", token)

  return response.data
}

export const registerUser = async (
  email: string,
  password: string
) => {

  const response = await api.post(
    "/auth/register",
    {
      email,
      password,
    }
  )

  return response.data
}