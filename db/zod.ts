import type { z } from 'zod'

export const InsertSchemaTodo = createInsertSchema(todo)
export type EditSchema = z.infer<typeof InsertSchemaTodo>
