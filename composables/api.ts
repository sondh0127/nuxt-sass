import type { UseFetchOptions } from 'nuxt/app'

export function useApi() {
  const nuxtApp = useNuxtApp()

  const useGet: typeof useFetch = <ResT>(
    url: Parameters<typeof useFetch<ResT>>[0],
    options: Omit<UseFetchOptions<ResT>, 'method'> = {},
  ) => {
    const { refresh, ...rest } = useFetch(url, {
      ...options,
      $fetch: nuxtApp.$api,
    })

    const handler = async () => {
      await refresh()
    }
    if (typeof url === 'string')
      nuxtApp.$apiContext.addRefreshHandler(url, handler)

    onUnmounted(() => {
      nuxtApp.$apiContext.removeRefreshHandler(handler)
    })

    return {
      ...rest,
      refresh,
    }
  }

  return {
    invoke: nuxtApp.$api,
    useGet,
  }
}
