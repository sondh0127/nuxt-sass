import type { z } from 'zod'
import { TodoTable } from './schema'

export const InsertSchemaTodo = createInsertSchema(TodoTable)
export type EditSchema = z.infer<typeof InsertSchemaTodo>
