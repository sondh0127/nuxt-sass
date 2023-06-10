import { router } from '../trpc'
import { helloRouter } from './hello.router'

export const appRouter = router({
  hello: helloRouter,
})
