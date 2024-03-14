export function generateRandomOtp(len: number, isNumber = false) {
  // radix 10 for number generation
  return Math.random()
    .toString(isNumber ? 10 : 36)
    .substring(2, len + 2)
}
