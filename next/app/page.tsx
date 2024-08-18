// next/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import { User } from '@/types' // パスが正しいことを確認してください

function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const res = await fetch('/api/users')
    const data = (await res.json()) as User[]
    setUsers(data)
  }

  async function createUser() {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    })
    if (response.ok) {
      fetchUsers()
      resetForm()
    }
  }

  async function updateUser() {
    if (selectedId === null) return
    const response = await fetch(`/api/users/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail: email, newName: name }),
    })
    if (response.ok) {
      fetchUsers()
      resetForm()
    }
  }

  async function deleteUser(userId: number) {
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    fetchUsers()
  }

  function resetForm() {
    setEmail('')
    setName('')
    setSelectedId(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className={styles.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button className={styles.button} onClick={createUser}>
          Create User
        </button>
        {selectedId && (
          <button className={styles.button} onClick={updateUser}>
            Update User
          </button>
        )}
      </div>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            ID: {user.id}, {user.email} - {user.name}
            <button
              className={styles.button}
              onClick={() => {
                setSelectedId(user.id)
                setEmail(user.email)
                setName(user.name || '')
              }}
            >
              Select
            </button>
            <button
              className={styles.button}
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
