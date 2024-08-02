export function getRandomProductImage(
  index: number,
  productId: string
): string {
  let productImages = localStorage.getItem('productImages')
  if (!productImages) {
    productImages = '{}'
  }
  const parsedProductImages = JSON.parse(productImages)
  if (!parsedProductImages[productId]) {
    const imageUrl = `https://picsum.photos/id/${index * 10}/200/200`
    parsedProductImages[productId] = imageUrl
    localStorage.setItem('productImages', JSON.stringify(parsedProductImages))
  }
  return parsedProductImages[productId]
}
