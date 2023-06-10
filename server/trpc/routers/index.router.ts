import { router } from '../trpc'
import { authRouter } from './auth.router'
import { helloRouter } from './hello.router'

export const appRouter = router({
  hello: helloRouter,
  auth: authRouter,
})
