

export default function ModeCheck(): string {

  const date = new Date()
  if (date.getHours() <= -1) {
    return 'light'
  }


  return 'dark'
}
