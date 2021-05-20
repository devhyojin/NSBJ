import axios from 'axios'

const SUNSET_URL = 'https://api.sunrise-sunset.org/json?lat=37.053745&lng=-4.4203400&date=today'

export default function ModeCheck(): string {
  const getSunset = () => {
    axios.get(SUNSET_URL)
      .then(res => {
        const { data: { results: { sunset } } } = res
        localStorage.setItem('sunset_nsbj', sunset)
      })
  }

  getSunset()
  const date = new Date()
  const sunsetTime = localStorage.getItem('sunset_nsbj') ? localStorage.getItem('sunset_nsbj') : null

  if (sunsetTime === null) {
    if (date.getHours() < 18) {
      return 'light'
    }
    return 'dark'
  }


  const sunsetArray = sunsetTime.split(':')
  if (date.getHours() < parseInt(sunsetArray[0], 10) + 12 || ((date.getHours() === parseInt(sunsetArray[0], 10) + 12) && (date.getMinutes() < parseInt(sunsetArray[1], 10)))) {
    return 'light'
  }
  return 'dark'
  // return 'dark'

}

