export interface User {
  id: number,
  title: string,
  subtitle: string,
  deleteUser: (id: number) => Promise<void>
}