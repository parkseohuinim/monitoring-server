'use client'
import Link from 'next/link'
import { useUser } from '../../hooks/useUseList'

export default function ClientUserDetail({ params: { id } }: { params: { id: number } }) {
  const { user, error, isLoading } = useUser(id)

  if (error) return <div>An error occurred.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <main>
      <h1>User Detail</h1>
      <div>
        <h2>{user.title}</h2>
        <p>{user.subtitle}</p>
        <Link href={`/user`}>
          List
        </Link>
      </div>
    </main>
  )
}