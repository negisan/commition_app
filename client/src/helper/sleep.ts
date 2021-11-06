export const sleep = (msec: number) => {
  return new Promise<void>((resolve) => {
    return setTimeout(() => resolve(), msec)
  })
}
