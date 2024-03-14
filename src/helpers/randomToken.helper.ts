import * as crypto from 'crypto'
export function generateRandomToken(length = 32): string {
  const buffer = crypto.randomBytes(length)
  const token = buffer.toString('base64')
  return token
}
