import { AuthHeader } from "./components/authHeader"
import { GuestHeader } from "./components/guestHeader"


interface HeaderProps {
  variant?: 'guest' | 'auth' | 'course'
  user?: {
    fullName: string
    avatarUrl: string
  }
}

export const Header = ({ variant = 'guest', user }: HeaderProps) => {
  if (variant === 'auth') {
    if (!user) throw new Error('AuthHeader requires a user object')
    return <AuthHeader user={user} />
  }
  return <GuestHeader />
}
