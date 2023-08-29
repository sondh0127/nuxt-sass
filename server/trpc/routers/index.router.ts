import { router } from '../trpc'
import { accountRouter } from './account.router'
import { authRouter } from './auth.router'
import { notesRouter } from './notes.router'
import { brainRouter } from './brain.router'

export const appRouter = router({
  auth: authRouter,
  // account: accountRouter,
  // notes: notesRouter,
  // brain: brainRouter,
})

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter
