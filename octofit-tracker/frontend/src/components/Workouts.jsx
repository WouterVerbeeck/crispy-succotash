import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const normalize = (payload) => (Array.isArray(payload) ? payload : payload?.results ?? [])

function Workouts() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(normalize(data)))
      .catch(() => setItems([]))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id ?? item.title}>{item.title}</li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
