import ClientUserDetail from '../../../components/user/client-user-detail';

export default function Page({ params: { id } }: { params: { id: number } }) {
  return (
    <ClientUserDetail params={{ id }} />
  )
}