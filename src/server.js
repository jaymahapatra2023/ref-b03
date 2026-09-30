/**
 * Life insurance needs calculator.
 *
 * One form, one answer. The model does the working out from everything the user entered.
 */
import { createServer } from 'node:http'
import { ask } from './model.js'

const PORT = Number(process.env.PORT ?? 8080)

const FORM = `<!doctype html><html><head><meta charset="utf-8">
<title>Life insurance needs calculator</title></head><body>
<h1>Life insurance needs calculator</h1>
<form method="post" action="/calculate">
  <p>Number of dependents <input name="dependents"></p>
  <p>Ages of dependents <input name="dependentAges"></p>
  <p>Annual income to replace <input name="income"></p>
  <p>Total debts <input name="debts"></p>
  <p>Education costs <input name="education"></p>
  <p>Existing coverage <input name="existing"></p>
  <p>Affordable monthly premium <input name="affordable"></p>
  <p><button type="submit">Calculate</button></p>
</form>
</body></html>`

function prompt(fields) {
  return `Work out how much life insurance this person needs and explain why.

Dependents: ${fields.dependents}
Ages: ${fields.dependentAges}
Income to replace: ${fields.income}
Debts: ${fields.debts}
Education costs: ${fields.education}
Existing coverage: ${fields.existing}
Affordable monthly: ${fields.affordable}

Give a recommended coverage amount in dollars and explain the reasoning. Also explain the
difference between term and whole life insurance.`
}

const server = createServer(async (req, res) => {
  const url = (req.url ?? '/').split('?')[0]

  if (req.method === 'GET' && (url === '/' || url === '/health')) {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end(FORM)
    return
  }

  if (req.method === 'POST' && url === '/calculate') {
    let raw = ''
    for await (const chunk of req) raw += chunk
    const fields = Object.fromEntries(new URLSearchParams(raw))
    const reply = await ask(prompt(fields))
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end(`<h1>Your result</h1><pre>${reply.text}</pre>
      <p>This is an estimate. Speak to a financial professional.</p>
      <p><a href="/">Start again</a></p>`)
    return
  }

  res.writeHead(404, { 'content-type': 'text/plain' })
  res.end('not found')
})

server.listen(PORT, () => console.log(JSON.stringify({ event: 'listening', port: PORT })))
