export function formatPrice(val, keepPoint = true) {
  const priceArr = (val / 100).toFixed(2).split('.')
  if (keepPoint) {
    return priceArr[0] + '.' + priceArr[1]
  } else {
    return Number(priceArr[0] + '.' + priceArr[1])
  }
}
