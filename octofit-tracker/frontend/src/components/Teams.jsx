import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const normalize = (payload) => (Array.isArray(payload) ? payload : payload?.results ?? [])

function Teams() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(normalize(data)))
      .catch(() => setItems([]))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id ?? item.name}>{item.name}</li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
