

export default function ModeCheck(): string {

  const date = new Date()
  if (date.getHours() <= 11) {
    return 'light'
  }


  return 'dark'
}
