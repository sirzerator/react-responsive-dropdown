import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
    height: '100%',
    zIndex: 5000
  },
  overlayMobileBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(0%, 0%, 0%, .75)',
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
  },
  overlayCrossLeft: {
    width: 1,
    backgroundColor: '#fff',
    height: 20,
    position: 'absolute',
    top: 10,
    right: 20,
    transform: 'rotate(45deg)'
  },
  overlayCrossRight: {
    width: 1,
    backgroundColor: '#fff',
    height: 20,
    position: 'absolute',
    top: 10,
    right: 20,
    transform: 'rotate(-45deg)'
  }
}

const POSITION_LEFT = 'left'
const POSITION_RIGHT = 'right'
const POSITION_CENTER = 'center'

class ResponsiveDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: {},
      size: {}
    }
  }

  getPlacement () {
    const {element, size} = this.state
    const {width} = this.props
    if (element.x < width / 2) {
      return POSITION_LEFT
    }
    if ((element.x + width) > size.width) {
      return POSITION_RIGHT
    }
    return POSITION_CENTER
  }

  styleForOverlay () {
    const {size} = this.state
    const {
      arrowSize,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      overlayOffsetTop,
      overlayOffsetRight,
      overlayOffsetLeft,
      width
    } = this.props
    if (this.isMobile()) {
      return Object.assign({}, styles.overlayMobile, {height: size.height})
    }
    const baseProps = Object.assign({}, styles.overlay, {
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderRadius: borderRadius,
      borderWidth: borderWidth,
      top: arrowSize + borderWidth + overlayOffsetTop
    })
    switch (this.getPlacement()) {
      case POSITION_LEFT:
        return Object.assign({}, baseProps, {
          width: width,
          left: 0 + overlayOffsetLeft
        })
      case POSITION_RIGHT:
        return Object.assign({}, baseProps, {
          width: width,
          left: 'auto',
          right: 0 + overlayOffsetRight
        })
      default:
        return Object.assign({}, baseProps, {
          width: width,
          left: '50%',
          marginLeft: `-${parseInt(width / 2, 10) + overlayOffsetLeft}px`
        })
    }
  }

  styleForArrow () {
    const {element} = this.state
    const {
      arrowOffsetLeft,
      arrowOffsetRight,
      arrowOffsetTop,
      arrowSize,
      borderColor,
      borderWidth
    } = this.props
    const baseProps = Object.assign({}, styles.arrow, {
      borderBottomColor: borderColor,
      borderWidth: (arrowSize + borderWidth) + 1,
      marginTop: borderWidth * -1 + arrowOffsetTop,
      marginLeft: ((arrowSize + borderWidth) + borderWidth + 1) * -1
    })
    switch (this.getPlacement()) {
      case POSITION_LEFT:
        return Object.assign({}, baseProps, {
          left: parseInt(element.width / 2, 10) + arrowOffsetLeft
        })
      case POSITION_RIGHT:
        return Object.assign({}, baseProps, {
          left: 'auto',
          marginRight: baseProps.marginLeft,
          right: parseInt(element.width / 2, 10) + arrowOffsetRight
        })
      default:
        return Object.assign({}, baseProps)
    }
  }

  styleForArrowInner () {
    const {element} = this.state
    const {
      arrowOffsetLeft,
      arrowOffsetRight,
      arrowOffsetTop,
      arrowSize,
      backgroundColor,
      borderWidth
    } = this.props
    const baseProps = Object.assign({}, styles.arrow, {
      borderBottomColor: backgroundColor,
      marginTop: -1 + arrowOffsetTop,
      borderWidth: arrowSize,
      marginLeft: (arrowSize + borderWidth) * -1
    })
    switch (this.getPlacement()) {
      case POSITION_LEFT:
        return Object.assign({}, baseProps, {
          left: parseInt(element.width / 2, 10) + arrowOffsetLeft
        })
      case POSITION_RIGHT:
        return Object.assign({}, baseProps, {
          left: 'auto',
          marginRight: baseProps.marginLeft,
          right: parseInt(element.width / 2, 10) + arrowOffsetRight
        })
      default:
        return Object.assign({}, baseProps)
    }
  }

  styleForInner () {
    const {size} = this.state
    const {width, backgroundColor, borderColor, borderWidth} = this.props
    return Object.assign({}, styles.overlayMobileHolderInner, {
      width: Math.min(width, size.width),
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: borderWidth
    })
  }

  componentDidMount () {
    this.getPosition()
    global.addEventListener('resize', this.onResize)
    global.addEventListener('click', this.onWindowClick)
    this.visible = this.props.visible
  }

  componentWillUnmount () {
    global.removeEventListener('resize', this.onResize)
    global.removeEventListener('click', this.onWindowClick)
  }

  componentDidUpdate (prevProps) {
    if (this.props.visible !== prevProps.visible || this.props.cacheKey !== prevProps.cacheKey) {
      this.getPosition()
    }
    setTimeout(() => {
      this.visible = this.props.visible
    })
  }

  onWindowClick = (event) => {
    if (this.rootElement && this.props.visible && this.visible) {
      const domNode = this.rootElement
      if (event.target !== domNode && !domNode.contains(event.target) && this.props.hideOnOutsideClick) {
        this.handleClickOverlay()
      }
    }
  }

  onResize = (event) => {
    throttle(() => {
      this.getSize()
    }, 500)
  }

  getPosition () {
    if (this.rootElement) {
      const domNode = this.rootElement
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
    if (this.rootElement) {
      const {size: {width, height}} = this.state
      const {innerWidth, innerHeight} = global
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
  }

  isMobile () {
    const {width, breakpoint} = this.props
    const {size} = this.state
    return size.width < breakpoint || width > size.width
  }

  handleClickOverlay = () => {
    this.props.clickOverlay && this.props.clickOverlay()
  }

  render () {
    const {children, dropdownView, visible} = this.props
    if (!visible) {
      return React.Children.only(this.props.children)
    } else {
      const {element} = this.state
      return (
        <div
          style={styles.holder}
          ref={(element) => { this.rootElement = element }}
        >
          {children}
          {element && (
            <div style={styles.overlayHolder}>
              <div style={this.styleForOverlay()}>
                {this.isMobile() && (
                  <div style={styles.overlayMobileHolder}>
                    <div style={styles.overlayMobileBackground} onClick={this.handleClickOverlay}>
                      <div style={styles.overlayCrossLeft} />
                      <div style={styles.overlayCrossRight} />
                    </div>
                    <div style={this.styleForInner()}>
                      {dropdownView}
                    </div>
                  </div>
                )}
                {!this.isMobile() && (
                  <div>
                    <div style={this.styleForArrow()} />
                    <div style={this.styleForArrowInner()} />
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
  arrowSize: 10,
  hideOnOutsideClick: true,
  overlayOffsetTop: 0,
  overlayOffsetLeft: 0,
  overlayOffsetRight: 0,
  arrowOffsetTop: 0,
  arrowOffsetLeft: 0,
  arrowOffsetRight: 0
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
  arrowSize: PropTypes.number,
  hideOnOutsideClick: PropTypes.bool,
  overlayOffsetLeft: PropTypes.number,
  overlayOffsetRight: PropTypes.number,
  overlayOffsetTop: PropTypes.number,
  arrowOffsetLeft: PropTypes.number,
  arrowOffsetRight: PropTypes.number,
  arrowOffsetTop: PropTypes.number
}

export default ResponsiveDropdown
