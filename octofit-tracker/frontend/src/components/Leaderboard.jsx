import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const normalize = (payload) => (Array.isArray(payload) ? payload : payload?.results ?? [])

function Leaderboard() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(normalize(data)))
      .catch(() => setItems([]))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id ?? item.user}>{item.user}: {item.points}</li>
        ))}
      </ul>
    </section>
  )
}

export default Leaderboard
