fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ history: [{ role: 'user', content: 'hello' }] })
}).then(r => r.json()).then(console.log);
