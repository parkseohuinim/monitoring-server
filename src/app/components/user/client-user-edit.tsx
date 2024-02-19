'use client'
import Link from 'next/link'
import {useRouter } from 'next/navigation'
import { mutate } from 'swr';
import { useUser } from '../../hooks/useUseList'

export default function ClientUserEdit({ params: { id } }: { params: { id: number } }) {
  const router = useRouter()
  const { user, error, isLoading } = useUser(id)
  console.log('user', user)

  const updateUser = async (event: React.FormEvent) => {
    event.preventDefault()
    const title = (event.target as any).title.value
    const subtitle = (event.target as any).subtitle.value
    const res = await fetch(`/api/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, subtitle })
    })
    if (res.ok) {
      mutate(`/api/user/${id}`)
      router.push('/user')
    }
  }

  if (error) return <div>An error occurred.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <form onSubmit={updateUser}>
      <main>
        <h1>User Edit</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" defaultValue={user.title} />
        </div>
        <div>
          <label htmlFor="subtitle">Subtitle</label>
          <input id="subtitle" type="text" defaultValue={user.subtitle} />
        </div>
        <div>
          <button type="submit">Save</button>
          <Link href={`/user`}>
            List
          </Link>
        </div>
      </main>
    </form>
  )
}