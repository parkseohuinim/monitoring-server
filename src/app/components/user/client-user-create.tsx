'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientUserCreate() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  const addUser = async (e: any) => {
    e.preventDefault()
    
    if (title != '' || subtitle != '') {  
      const formData = {
        title: title,
        subtitle: subtitle
      }
      const add = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      await add.json()
      router.push('/user')
    }
  }

  return (
    <main>
      <h1>Add Data To Firebase Realtime Database</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sub Title"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      <button onClick={addUser}>
        Add Data
      </button>
    </main>
  )
}