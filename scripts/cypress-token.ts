import { sign } from 'jsonwebtoken'

export const token = (pw = 'Password123') =>
  sign(
    { scopes: 'orders:order:create orders:order:delete orders:order:update' },
    pw,
    {
      algorithm: 'HS512',
      expiresIn: '10m'
    }
  )
