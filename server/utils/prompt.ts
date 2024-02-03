export const baseTemplate = `
[INST]
{question}
[/INST]`.trim()

export const baseChatHistoryTemplate = `
{history}
${baseTemplate}
`.trim()

/**
 * Generating reflection question for accurate question for vector retrieval
 *
 * Required params:
 * - `chat_history`: A string formatted history with alternating question and answer pairs,
 *   like so: USER: <user>\n SYSTEM: <system>
 * - `question`: The user's last question
 */
export const chatHistoryReflectTemplate = `[INST]
  Given the following conversation and a follow up question, `
  + `rephrase the follow up question to be a standalone question.\r\n\r\n`
  + `Chat History:\r\n`
  + `{chat_history}\r\n\r\n`
  + `Follow Up Input: {question}\r\n\r\n`
  + `Standalone Question:
  [/INST]`
