import Link from 'next/link'
import styled from 'styled-components'
import { useAuth } from '../context/Firebase/AuthContext'

const HeaderStyles = styled.header`
  grid-area: header;

  padding: 16px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left,
    .right {
      display: flex;
      justify-content: space-between;

      & > a {
        flex: 1 1 auto;
        min-width: 50px;
      }
    }
  }
`

interface Props {}

const Header: React.FC<Props> = () => {
  const { user, loggedIn, logout } = useAuth()

  const displayName = user ? user.displayName || user.email : ''

  const handleLogout = () => {
    logout()
  }

  return (
    <HeaderStyles>
      <nav>
        <div className='left'>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </div>

        <div className='right'>
          {!loggedIn && !user ? (
            <>
              <Link href='/login'>
                <a>Login</a>
              </Link>

              <Link href='/register'>
                <a>Register</a>
              </Link>
            </>
          ) : (
            <>
              <span>Welcome {displayName}</span>

              <button type='button' onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </HeaderStyles>
  )
}

export default Header
