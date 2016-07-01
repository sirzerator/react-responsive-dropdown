# React responsive dropdown #

[See demo](http://gerhardsletten.github.io/react-responsive-dropdown/)

## Install ##

`npm i react-responsive-dropdown`

## Usage ##

And in your react-component...

```js
import React, {Component} from 'react'
import {ResponsiveDropdown} from 'react-responsive-dropdown'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleToggle () {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    const {visible} = this.state
    return (
      <div>
        <ResponsiveDropdown
          visible={visible}
          dropdownView={(
            <div className='dropdown-content'>
              This will show when you dropdown is visible
            </div>
          )}
          clickOverlay={this.handleToggle.bind(this)}
          >
          <button onClick={this.handleToggle.bind(this)}>Open/close dropdown</button>
        </ResponsiveDropdown>
      </div>
    )
  }
}
```

#### All props ####

```js
ResponsiveDropdown.propTypes = {
  children: PropTypes.any.isRequired, // The element you want the dropdown bound to
  dropdownView: PropTypes.element.isRequired, // What to show in dropdown
  visible: PropTypes.bool, // Show / hide dropdown
  width: PropTypes.number, // The width of the dropdown
  breakpoint: PropTypes.number, // Breakpoint in width when dropdown should display as popup
  cacheKey: PropTypes.string, // cache-key if you need to re-render dropdown, ie the the button that is bound to the dropdown has moved
  backgroundColor: PropTypes.string, // background color for dropdown
  borderColor: PropTypes.string, // border color for dropdown
  clickOverlay: PropTypes.func, // func in above compontent that should be called if you click the overlay outside of dropdown
  borderRadius: PropTypes.number, // border radius of dropdown
  borderWidth: PropTypes.number, // border width of dropdown
  arrowSize: PropTypes.number, // size of dropdown arrow
  hideOnOutsideClick: PropTypes.bool // wheather click outside of dropdown should close the dropdown, ie call the clickOverlay function
}
```

#### Default props ####

```js
ResponsiveDropdown.defaultProps = {
  width: 200,
  breakpoint: 500,
  cacheKey: 'hello world',
  backgroundColor: '#ffffff',
  borderColor: '#ffffff',
  borderRadius: 4,
  borderWidth: 1,
  arrowSize: 10,
  hideOnOutsideClick: true
}
```

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
