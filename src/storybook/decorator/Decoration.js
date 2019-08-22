import * as styles from './styles'

export default class Badge
{
  constructor (type, props) 
  {
    this.style = styles[type]
    this.props = Object.assign({}, props || {})
  }

  toString ()
  {
    return this.style(this.props)
  }
}