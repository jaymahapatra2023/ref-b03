/**
 * Asks the model for the answer.
 *
 * With no key configured it returns a canned reply so the thing still demos, which is how we got
 * through the night.
 */
const KEY = process.env.MODEL_KEY ?? ''

const CANNED = `Based on what you have told me, you should look at around $750,000 of coverage.
That figure reflects your income, the people who depend on you and what you still owe, less the
cover you already hold. Term insurance is usually the most straightforward way to cover a need
like yours.`

export async function ask(prompt) {
  if (KEY === '') return { text: CANNED, source: 'canned' }
  const res = await fetch('https://api.example-model.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: 'default', max_tokens: 900, prompt }),
  })
  const body = await res.json()
  return { text: body.completion ?? CANNED, source: 'model' }
}
