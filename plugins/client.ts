import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import superjson from 'superjson'
import type { AppRouter } from '../server/trpc/routers/index.router'

export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
    transformer: superjson,
  })

  return {
    provide: {
      client,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $client: ReturnType<typeof createTRPCNuxtClient<AppRouter>>
  }
}
