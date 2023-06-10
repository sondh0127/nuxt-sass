import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const helloRouter = router({
  hello: publicProcedure
    // This is the input schema of your procedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    }),
})
