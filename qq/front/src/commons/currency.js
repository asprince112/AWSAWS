export const formatPrice = cents => {
  return (cents / 100).toLocaleString('gb', {
    style: 'currency',
    currency: 'GBP'
  })
}