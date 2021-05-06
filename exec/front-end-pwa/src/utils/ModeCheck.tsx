

export default function ModeCheck(): string {

  const date = new Date()
  if (date.getHours() <= 20) {
    return 'light'
  }


  return 'dark'
}
