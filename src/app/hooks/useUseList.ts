import useSWR from 'swr';
import { User } from '../types/user'
import { fetcher } from '../lib/fetcher'

interface userListResponse {
  userList: User[];
}

export function useUserList() {
  const { data, error, isLoading } = useSWR<userListResponse>(`/api/user`, fetcher)

  return {
    userList: data ? data.userList : [],
    error,
    isLoading,
  }
}

interface userResponse {
  user: User;
}

export function useUser(id: number) {
  const { data, error, isLoading } = useSWR<userResponse>(`/api/user/${id}`, fetcher)

  return {
    user: data?.user,
    error,
    isLoading,
  }
}