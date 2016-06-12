import React, {Component, PropTypes} from 'react'
import throttle from 'lodash.throttle'

const styles = {
  holder: {
    position: 'relative',
    display: 'inline-block'
  },
  overlayHolder: {
    position: 'relative',
    display: 'block'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 10,
    borderRadius: 5,
    border: '1px solid #fff'
  },
  overlayMobile: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  overlayMobileBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    background: 'rgba(0%, 0%, 0%, .1)',
    zIndex: 1
  },
  overlayMobileHolder: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  overlayMobileHolderInner: {
    position: 'relative',
    border: '1px solid #fff',
    backgroundColor: '#fff',
    borderRadius: 5,
    zIndex: 3
  },
  arrow: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    width: 0,
    height: 0,
    marginLeft: -10,
    border: 'solid transparent',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderBottomColor: '#fff',
    borderWidth: 10
  }
}

const POSITION_LEFT = 'left'
const POSITION_RIGHT = 'right'
const POSITION_CENTER = 'center'

function getPlacement (element, window, width) {
  if (element.x < width / 2) {
    return POSITION_LEFT
  }
  if ((element.x + width) > window.width) {
    return POSITION_RIGHT
  }
  return POSITION_CENTER
}

function styleForOverlay (element, window, width, isMobile, bg, borderColor, borderRadius, borderWidth, arrowSize) {
  if (isMobile) {
    return styles.overlayMobile
  }
  const baseProps = Object.assign({}, styles.overlay, {
    backgroundColor: bg,
    borderColor: borderColor,
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    top: arrowSize + borderWidth
  })
  switch (getPlacement(element, window, width)) {
    case POSITION_LEFT:
      return Object.assign({}, baseProps, {
        width: width,
        left: 0
      })
    case POSITION_RIGHT:
      return Object.assign({}, baseProps, {
        width: width,
        left: 'auto',
        right: 0
      })
    default:
      return Object.assign({}, baseProps, {
        width: width,
        left: '50%',
        marginLeft: `-${parseInt(width / 2, 10)}px`
      })
  }
}

function styleForArrow (element, window, width, borderColor, borderWidth, arrowSize) {
  const baseProps = Object.assign({}, styles.arrow, {
    borderBottomColor: borderColor,
    borderWidth: (arrowSize + borderWidth) + 1,
    marginTop: borderWidth * -1,
    marginLeft: ((arrowSize + borderWidth) + borderWidth + 1) * -1
  })
  switch (getPlacement(element, window, width)) {
    case POSITION_LEFT:
      return Object.assign({}, baseProps, {
        left: parseInt(element.width / 2, 10)
      })
    case POSITION_RIGHT:
      return Object.assign({}, baseProps, {
        left: 'auto',
        marginRight: baseProps.marginLeft,
        right: parseInt(element.width / 2, 10)
      })
    default:
      return Object.assign({}, baseProps)
  }
}

function styleForArrowInner (element, window, width, borderColor, borderWidth, arrowSize) {
  const baseProps = Object.assign({}, styles.arrow, {
    borderBottomColor: borderColor,
    marginTop: -1,
    borderWidth: arrowSize,
    marginLeft: (arrowSize + borderWidth) * -1
  })
  switch (getPlacement(element, window, width)) {
    case POSITION_LEFT:
      return Object.assign({}, baseProps, {
        left: parseInt(element.width / 2, 10)
      })
    case POSITION_RIGHT:
      return Object.assign({}, baseProps, {
        left: 'auto',
        marginRight: baseProps.marginLeft,
        right: parseInt(element.width / 2, 10)
      })
    default:
      return Object.assign({}, baseProps)
  }
}

function styleForInner (element, window, width = 200, bg, borderColor, borderWidth) {
  return Object.assign({}, styles.overlayMobileHolderInner, {
    width: Math.min(width, window.width),
    backgroundColor: bg,
    borderColor: borderColor,
    borderWidth: borderWidth
  })
}

class ResponsiveDropdown extends Component {

  constructor (props) {
    super(props)
    this.state = {
      position: {},
      size: {}
    }
  }

  componentDidMount () {
    this.getPosition()
    window.addEventListener('resize', throttle(() => this.getSize(), 500))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getSize)
  }

  componentDidUpdate (prevProps) {
    if (this.props.visible !== prevProps.visible || this.props.cacheKey !== prevProps.cacheKey) {
      this.getPosition()
    }
  }

  getPosition () {
    if (this.refs.root) {
      const domNode = this.refs.root
      this.setState({
        element: {
          x: domNode.offsetLeft,
          y: domNode.offsetTop,
          width: domNode.offsetWidth,
          height: domNode.offsetHeight
        },
        size: this.getSize(true)
      })
    }
  }

  getSize (onlyReturn = false) {
    const {size: {width, height}} = this.state
    const {innerWidth, innerHeight} = window
    const newSize = {
      width: innerWidth,
      height: innerHeight
    }
    if (onlyReturn) {
      return newSize
    }
    if (width !== innerWidth || height !== innerHeight) {
      this.setState({size: newSize})
    }
  }

  isMobile () {
    const {width, breakpoint} = this.props
    const {size} = this.state
    return size.width < breakpoint || width > size.width
  }

  handleClickOverlay () {
    this.props.clickOverlay && this.props.clickOverlay()
  }

  render () {
    const {children, dropdownView, visible, width, backgroundColor, borderColor, borderRadius, borderWidth, arrowSize} = this.props
    if (!visible) {
      return React.Children.only(this.props.children)
    } else {
      const {element, size} = this.state
      return (
        <div ref='root' style={styles.holder}>
          {children}
          {element && (
            <div style={styles.overlayHolder}>
              <div style={styleForOverlay(element, size, width, this.isMobile(), backgroundColor, borderColor, borderRadius, borderWidth, arrowSize)}>
                {this.isMobile() && (
                  <div style={styles.overlayMobileHolder}>
                    <div style={styles.overlayMobileBackground} onClick={this.handleClickOverlay.bind(this)} />
                    <div style={styleForInner(element, size, width, backgroundColor, borderColor, borderWidth)}>
                      {dropdownView}
                    </div>
                  </div>
                )}
                {!this.isMobile() && (
                  <div>
                    <div style={styleForArrow(element, size, width, borderColor, borderWidth, arrowSize)} />
                    <div style={styleForArrowInner(element, size, width, backgroundColor, borderWidth, arrowSize)} />
                    {dropdownView}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )
    }
  }
}

ResponsiveDropdown.defaultProps = {
  width: 200,
  breakpoint: 500,
  cacheKey: 'hello world',
  backgroundColor: '#ffffff',
  borderColor: '#ffffff',
  borderRadius: 4,
  borderWidth: 1,
  arrowSize: 10
}

ResponsiveDropdown.propTypes = {
  children: PropTypes.any.isRequired,
  dropdownView: PropTypes.element.isRequired,
  visible: PropTypes.bool,
  width: PropTypes.number,
  breakpoint: PropTypes.number,
  cacheKey: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  clickOverlay: PropTypes.func,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  arrowSize: PropTypes.number
}

export default ResponsiveDropdown
