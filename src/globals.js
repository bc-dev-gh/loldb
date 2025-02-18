export default class Globals {
  static lolVersion =  '15.3.1'
  static locale = 'en_US'

  static ddImgUrl(category, name) {
    if (['champion/loading', 'champion/splash'].includes(category)) {
      return `https://ddragon.leagueoflegends.com/cdn/img/${category}/${name}`
    }
    return `https://ddragon.leagueoflegends.com/cdn/${this.lolVersion}/img/${category}/${name}`
  }
  
  static ddDataUrl(category, name) {
    if (name) {
      return `https://ddragon.leagueoflegends.com/cdn/${this.lolVersion}/data/${this.locale}/${category}/${name}.json`
    }
    return `https://ddragon.leagueoflegends.com/cdn/${this.lolVersion}/data/${this.locale}/${category}.json`
  }
}


