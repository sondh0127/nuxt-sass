const localStorageBrain = useLocalStorage('localStorageBrain', {})

export function useBrainState() {
  const queryClient = useQueryClient()
  const { $client } = useNuxtApp()

  const createMutation = useMutation(
    async (brain_name: string) => {
      return $client.brain.createBrain.mutate({ brain_name })
    },
    {
      onSettled() {
        // setAllBrains(prevBrains => [...prevBrains, createdBrain])
        // queryClient.invalidateQueries([])
      },
    },
  )

  async function createBrain(name: string) {
    const createdBrain = await createMutation.mutateAsync(name)

    if (createdBrain !== undefined) {
      localStorageBrain.value = createdBrain
      return createdBrain.id
    }
    else {
      ElMessage.error('Error occured while creating a brain')
    }
  }

  return {
    createBrain,
    createMutation,
  }
}
