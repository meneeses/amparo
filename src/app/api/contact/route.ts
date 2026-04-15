export async function POST(req: Request) {
  const body = await req.json()

  const res = await fetch(`https://formspree.io/f/${process.env.FORM_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  return new Response(JSON.stringify({ ok: res.ok }), {
    status: res.status,
  })
}