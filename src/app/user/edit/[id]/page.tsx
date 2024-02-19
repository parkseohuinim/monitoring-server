'use client'
import ClientUserEdit from '../../../components/user/client-user-edit'

export default function Page({ params: { id } }: { params: { id: number } }) {
  return (
    <ClientUserEdit params={{ id }} />
  )
}