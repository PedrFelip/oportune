export function capitalizeFirstLetter(string: string) {
  return string
    .split(' ')
    .map(palavra => {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1)
    })
    .join(' ')
}
