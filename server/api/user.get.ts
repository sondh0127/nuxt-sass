// server/api/user.get.ts
export default defineEventHandler((event) => {
  return event.context.user
})
