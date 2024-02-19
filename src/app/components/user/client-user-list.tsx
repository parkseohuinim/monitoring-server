'use client'
import styles from '../../user/user.module.css'
import UserTable from './userTable'
import { useUserList } from '../../hooks/useUseList'

export default function ClientUserList() {
  const { userList, error, isLoading } = useUserList()

  const deleteUser = async (id: number): Promise<void> => {
    if (id) {
      const response = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        alert('Deletion completed')
      }
    }
  }

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <h1>Fetch Data From Realtime Database</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {
            userList && userList.map((user) => <UserTable key={user.id} {...user} deleteUser={deleteUser} />)
          }
        </tbody>
      </table>
    </main>
  )
}