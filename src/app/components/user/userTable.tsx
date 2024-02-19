import Link from 'next/link'
import { User } from '../../types/user'

export default function UserTable(user: User) {
  return (
    <tr>
      <td>
        <Link href={`/user/read/${user.id}`}>
          {user.title}
        </Link>
      </td>
      <td>{user.subtitle}</td>
      <td>
        <Link href={`/user/edit/${user.id}`}>
          Edit
        </Link>
        <button onClick={() => user.deleteUser(user.id)}>Delete</button>
      </td>
    </tr>
  );
}