

export default function ModeCheck(): string {

  const date = new Date()
  if (date.getHours() <= 9) {
    return 'light'
  }


  return 'dark'
}
