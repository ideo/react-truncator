import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

class Truncator extends React.Component {
  constructor(props) {
    super(props)
    this.elRef = React.createRef()
    this.state = {
      truncated: false,
      alteredText: props.text,
    }
    this.onResize = _.debounce(this._onResize, 100)
  }

  componentDidMount() {
    this.truncate()
    window.addEventListener('resize', this.onResize)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ truncated: false }, () => { this.truncate() })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  _onResize = () => {
    this.setState({ truncated: false }, () => { this.truncate() })
  }

  truncate = () => {
    const { debug, text, overrideWidth } = this.props
    const el = this.elRef
    if (!el) return
    const width = overrideWidth || el.offsetWidth
    const overage = el.scrollWidth - width
    const typefaceModifier = el.scrollWidth / text.length
    let lettersToRemove = parseInt(overage / typefaceModifier) + 1
    if (lettersToRemove > 1) {
      if (lettersToRemove > text.length) {
        lettersToRemove = text.length - (width / typefaceModifier)
      }
      const mid = parseInt((text.length - lettersToRemove) / 2)
      const first = text.slice(0, mid)
      const rest = text.slice(mid + lettersToRemove, text.length)
      const truncated = `${first}…${rest}`
      this.setState({ alteredText: truncated, truncated: true })
    } else {
      this.setState({ alteredText: text, truncated: true })
    }
    if (debug) {
      this.setState({ alteredText: text, truncated: false })
    }
  }

  get mainStyles() {
    const { extraSpacing, minWidth, overrideStyle } = this.props
    const { truncated } = this.state

    if (truncated) return overrideStyle
    const styles = {
      overflowX: 'scroll',
      maxWidth: `calc(100% - ${extraSpacing}px)`,
      width: '100%',
      whiteSpace: 'nowrap'
    }
    if (minWidth > 0) {
      styles.minWidth = `${minWidth - extraSpacing}px`
    }
    return Object.assign({}, styles, overrideStyle)
  }

  render() {
    const { text } = this.props
    const { alteredText, truncated } = this.state
    return (
      <div style={this.mainStyles} ref={(el) => (this.elRef = el)}>
        { truncated ? alteredText : text }
      </div>
    )
  }
}

Truncator.propTypes = {
  text: PropTypes.string.isRequired,
  extraSpacing: PropTypes.number,
  minWidth: PropTypes.number,
  debug: PropTypes.bool,
  overrideWidth: PropTypes.number,
  overrideStyle: PropTypes.shape(),
}
Truncator.defaultProps = {
  extraSpacing: 0,
  minWidth: 0,
  debug: false,
  overrideWidth: null,
  overrideStyle: {},
}

export default Truncator
