export class ApiError extends Error {
  constructor(url, status) {
    super(`'${url} returned ${status}`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }
    this.name = "ApiError"
    this.status = status
  }
}

export const fetchJson = async (url, option) => {
  const response = await fetch(url, option)
  if (!response.ok) {
    throw new ApiError(url, response.status)
  }
  return await response.json()
}
