import React, {Component} from 'react'
import ResponsiveDropdown from '../src/ResponsiveDropdown'
import {sentenceCase} from 'change-case'
import npmPackage from '../package.json'
import './style.css'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      position: 'left',
      itemProps: {...ResponsiveDropdown.defaultProps, visible: true, hideOnOutsideClick: false}
    }
  }

  handleToggle () {
    this.setState({
      itemProps: {...this.state.itemProps, visible: !this.state.itemProps.visible}
    })
  }

  handleClickPosition (val, event) {
    this.setState({
      position: val
    })
  }

  handleChange (key, event) {
    this.setState({
      itemProps: {...this.state.itemProps, [key]: event.target.value}
    })
  }

  handleChangeNumber (key, event) {
    this.setState({
      itemProps: {...this.state.itemProps, [key]: parseInt(event.target.value, 10)}
    })
  }

  render () {
    return (
      <div>
        <section className='hero is-info'>
          <div className='hero-body'>
            <div className='container'>
              <a href={npmPackage.homepage} className='is-pulled-right is-medium tag is-dark'>Fork on Github</a>
              <h1 className='title'>
                {sentenceCase(npmPackage.name)} ({npmPackage.version})
              </h1>
              <h2 className='subtitle'>
                {npmPackage.description}
              </h2>
            </div>
          </div>
        </section>
        <section className='section'>
          <div className='container'>
            <hr />
            {this.renderControls()}
            <hr />
            {this.renderLayoutTitle()}
            {this.renderDropdown()}
          </div>
        </section>
        <footer className='footer is-info'>
          <div className='container'>
            <div className='has-text-centered'>
              <p><a className='is-white' href={npmPackage.homepage}>Fork on Github</a> | Designtheme powered by <a className='is-white' href='http://bulma.io/'>bulma.io</a></p>
              <br />
            </div>
          </div>
        </footer>
      </div>
    )
  }

  renderLayoutTitle () {
    const {position} = this.state
    return (
      <nav className='level'>
        <div className='level-left'>
          <div className='level-item'>
            <h3 className='title is-white is-5'><strong>Preview</strong></h3>
          </div>
        </div>
        <div className='level-right'>
          <div className='level-item'>
            Simulate layout
          </div>
          {this.renderLayoutControl('Left', 'left', position)}
          {this.renderLayoutControl('Center', 'center', position)}
          {this.renderLayoutControl('Right', 'right', position)}
        </div>
      </nav>
    )
  }

  renderLayoutControl (title, val, selected) {
    return (
      <div className='level-item'>
        <a className={`tag is-medium ${(selected === val) ? 'is-dark' : 'is-success'}`} onClick={this.handleClickPosition.bind(this, val)}>{title}</a>
      </div>
    )
  }

  renderControls () {
    const {itemProps} = this.state
    return (
      <div>
        <h3 className='title is-white is-5'><strong>Component props</strong></h3>
        <div className='box is-black'>
          <div className='columns'>
            <div className='column'>
              <div className='is-horizontal control'>
                <div className='control-label'>
                  <label className='label'>backgroundColor</label>
                </div>
                <div className='control'>
                  <input className='input' type='color' value={itemProps.backgroundColor} onChange={this.handleChange.bind(this, 'backgroundColor')} />
                </div>
              </div>
              <div className='is-horizontal control'>
                <div className='control-label'>
                  <label className='label'>borderColor</label>
                </div>
                <div className='control'>
                  <input className='input' type='color' value={itemProps.borderColor} onChange={this.handleChange.bind(this, 'borderColor')} />
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='is-horizontal control'>
                <div className='control-label'>
                  <label className='label'>width</label>
                </div>
                <div className='control'>
                  <input className='input-custom' type='range' value={itemProps.width} onChange={this.handleChangeNumber.bind(this, 'width')} min={100} max={1000} step={100} />
                </div>
              </div>
              <div className='is-horizontal control'>
                <div className='control-label'>
                  <label className='label'>arrowSize</label>
                </div>
                <div className='control'>
                  <input className='input-custom' type='range' value={itemProps.arrowSize} onChange={this.handleChangeNumber.bind(this, 'arrowSize')} min={1} max={20} step={1} />
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='is-horizontal control'>
                <div className='control-label'>
                  <label className='label'>borderRadius</label>
                </div>
                <div className='control'>
                  <input className='input-custom' type='range' value={itemProps.borderRadius} onChange={this.handleChangeNumber.bind(this, 'borderRadius')} min={0} max={15} step={1} />
                </div>
              </div>
              <div className='is-horizontal control'>
                <div className='control-label'>
                  <label className='label'>borderWidth</label>
                </div>
                <div className='control'>
                  <input className='input-custom' type='range' value={itemProps.borderWidth} onChange={this.handleChangeNumber.bind(this, 'borderWidth')} min={1} max={20} step={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderDropdown () {
    const {itemProps, position} = this.state
    return (
      <div style={{textAlign: position, marginBottom: 100}}>
        <ResponsiveDropdown
          {...itemProps}
          cacheKey={position}
          dropdownView={(
            <div className='dropdown-content'>
              Lorem ipusm deja vu
            </div>
          )}
          clickOverlay={this.handleToggle.bind(this)}
          >
          <button className='button is-warning is-large' onClick={this.handleToggle.bind(this)}>{itemProps.visible ? 'Close' : 'Open'}</button>
        </ResponsiveDropdown>
      </div>
    )
  }
}
