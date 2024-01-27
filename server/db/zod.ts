import type { z } from 'zod'
import { todoTable } from './schema'

export const InsertSchemaTodo = createInsertSchema(todoTable)
export type EditSchema = z.infer<typeof InsertSchemaTodo>
