export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server)
    return
  const user = useUser()
  if (!user.value)
    return navigateTo('/login')
})
