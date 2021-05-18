import axios from 'axios'
// import cheerio from 'cheerio'

const SUNSET_URL = process.env.REACT_APP_SUNSET ? process.env.REACT_APP_SUNSET : ''

export default function ModeCheck(): string {

  axios.get(SUNSET_URL)
    .then(res => {
      // let titleList = []
      // const data = cheerio.load(res.data)
      console.log(res)
    })

  const date = new Date()
  if (date.getHours() <= 22) {
    return 'light'
  }


  return 'dark'
}
