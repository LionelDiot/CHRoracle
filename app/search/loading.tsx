import LoadingComponent from '@/components/loading/loading'

export default function Loading () {
  const searchUsers = "Searching for users..."

  return(<LoadingComponent page={searchUsers} />)
}