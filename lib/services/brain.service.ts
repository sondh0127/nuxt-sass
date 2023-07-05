import { $$fetch } from './fetch'

export default class BrainService {
  async createBrain(account_id: number, brain_text: string) {
    const { data } = await $$fetch('/brains/', { method: 'POST', body: { text: brain_text } })
    return data
  }
}
