import ollama from 'ollama'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await ollama.chat({
    model: 'mistral',
    messages: [
      {
        role: 'user',
        content: body.content,
      },
    ],
  })
  return response
})
