type Handler = () => Promise<void>
type Path = string

export default defineNuxtPlugin(() => {
  let refreshHandlers: { path: Path, handler: Handler }[] = []

  const $apiContext = {
    addRefreshHandler(path: Path, handler: Handler) {
      refreshHandlers.push({ path, handler })
    },
    removeRefreshHandler(handler: Handler) {
      refreshHandlers = refreshHandlers.filter(h => h.handler !== handler)
    },
    async refreshIncludedPaths(path: string) {
      const matchingHandlers = refreshHandlers.filter(r =>
        path.includes(r.path),
      )
      await Promise.all(matchingHandlers.map(h => h.handler()))
    },
  }

  const $api = $fetch.create({
    onResponse(context) {
      if (
        context.options.method === undefined
        || context.options.method === 'GET'
      )
        return
      if (typeof context.request !== 'string')
        return
      $apiContext.refreshIncludedPaths(context.request)
    },
  })

  return {
    provide: {
      api: $api,
      apiContext: $apiContext,
    },
  }
})
