import { accountRouter } from './account.router'
import { todoRouter } from './todo.router'
import { notesRouter } from './notes.router'
import { brainRouter } from './brain.router'

export const appRouter = router({
  todo: todoRouter,
  // account: accountRouter,
  // notes: notesRouter,
  // brain: brainRouter,
})

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter
