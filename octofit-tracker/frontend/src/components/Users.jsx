import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const normalize = (payload) => (Array.isArray(payload) ? payload : payload?.results ?? [])

function Users() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setItems(normalize(data)))
      .catch(() => setItems([]))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id ?? item.email}>{item.name}</li>
        ))}
      </ul>
    </section>
  )
}

export default Users
