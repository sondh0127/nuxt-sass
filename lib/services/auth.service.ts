import generator from 'generate-password-ts'
import type { FullDBUser } from './service.types'
import { fullDBUser } from './service.types'
import { UtilService } from './util.service'
import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum'
import prisma_client from '~~/prisma/prisma.client'
import { db, users } from '@/db'

const config = useRuntimeConfig()

export default class AuthService {
  async getFullUserBySupabaseId(supabase_uid: string): Promise<FullDBUser | null> {
    return prisma_client.user.findFirst({
      where: { supabase_uid },
      ...fullDBUser,
    })
  }

  async getUserById(user_id: number): Promise<FullDBUser | null> {
    return prisma_client.user.findFirstOrThrow({
      where: { id: user_id },
      ...fullDBUser,
    })
  }

  async createUser(supabaseUid: string, displayName: string, email: string): Promise<FullDBUser | null> {
    // const trialPlan = await prisma_client.plan.findFirstOrThrow({ where: { name: config.initialPlanName } })
    const join_password: string = generator.generate({
      length: 10,
      numbers: true,
    })

    // TODO: handle create account via membership creation
    return await db.insert(users).values({ supabaseUid, displayName, email })

    // return prisma_client.user.create({
    //   data: {
    //     supabase_uid,
    //     display_name,
    //     email,
    //     memberships: {
    //       create: {
    //         account: {
    //           create: {
    //             name: display_name,
    //             current_period_ends: UtilService.addMonths(new Date(), config.initialPlanActiveMonths),
    //             plan_id: trialPlan.id,
    //             features: trialPlan.features,
    //             max_notes: trialPlan.max_notes,
    //             max_members: trialPlan.max_members,
    //             plan_name: trialPlan.name,
    //             join_password,
    //           },
    //         },
    //         access: ACCOUNT_ACCESS.OWNER,
    //       },
    //     },
    //   },
    //   ...fullDBUser,
    // })
  }

  async deleteUser(user_id: number): Promise<FullDBUser> {
    return prisma_client.user.delete({
      where: { id: user_id },
      ...fullDBUser,
    })
  }
}
