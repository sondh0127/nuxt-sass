import { OAuth2RequestError } from 'arctic'
import { generateId } from 'lucia'
import { UserTable } from '~/server/db/schema'
import { useLucia } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const lucia = await useLucia()
  const query = getQuery(event)
  const code = query.code?.toString() ?? null
  const state = query.state?.toString() ?? null
  const storedState = getCookie(event, 'github_oauth_state') ?? null
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(code)
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })
    const githubUser: GitHubUser = await githubUserResponse.json()
    const existingUser = await db.select().from(UserTable).where(eq(UserTable.githubId, githubUser.id)).limit(1)

    if (existingUser.length) {
      const session = await lucia.createSession(existingUser[0].id, {})
      appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize())
      return sendRedirect(event, '/')
    }

    const userId = generateId(15)
    await db.insert(UserTable).values({
      id: userId,
      githubId: githubUser.id,
      username: githubUser.login,
    })
    const session = await lucia.createSession(userId, {})
    appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize())
    return sendRedirect(event, '/')
  }
  catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      throw createError({
        status: 400,
      })
    }
    throw createError({
      status: 500,
    })
  }
})

interface GitHubUser {
  id: string
  login: string
}
