

export default function ModeCheck(): string {

  const date = new Date()
  if (date.getHours() <= 10) {
    return 'light'
  }


  return 'dark'
}
