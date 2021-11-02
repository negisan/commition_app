export const errorMessage = (err: any): string => {
  return (
    err.response?.data?.ErrorMessageJP ||
    err.response?.data?.ErrorMessageEN ||
    err.response?.data?.message ||
    err.toString()
  )
}