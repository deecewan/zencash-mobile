import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Toolbar,
  Button
} from 'react-onsenui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setSecretPhrase, setSecretItems } from '../actions/Secrets'
import { phraseToSecretItems } from '../utils/wallet'

import chance from 'chance'

class SetupPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tempSecretPhrase: ''
    }

    this.handleLoadWallet = this.handleLoadWallet.bind(this)
    this.handleNewWallet = this.handleNewWallet.bind(this)
  }

  handleNewWallet () {
    // generate random phrase
    const Chance = chance
    var c = new Chance()
    var randomPhrase = c.sentence({words: 12})

    // want 64 max
    if (randomPhrase.length > 64) {
      randomPhrase = randomPhrase.slice(0, 64)
    }

    // trim whitespace at the back
    randomPhrase = randomPhrase.trim()

    this.handleLoadWallet(randomPhrase)
  }

  handleLoadWallet (phrase) {
    const secretItems = phraseToSecretItems(phrase)

    this.props.setSecretPhrase(phrase)
    this.props.setSecretItems(secretItems)

    // Sets has existing wallet so we pop back out
    // and goto the 'main page'
    this.props.setHasExistingWallet(true)
  }

  renderToolbar () {
    return (
      <Toolbar>
        <div className='center'>
          ZEN Wallet Setup
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{padding: '12px 12px 0 12px'}}>
          <p>
            <textarea
              style={{width: '100%'}}
              onChange={(e) => this.setState({ tempSecretPhrase: e.target.value })}
              className="textarea" rows="3" placeholder="secret phrase"
              maxLength={64}
            >
            </textarea>
          </p>

          <Button
            onClick={() => this.handleLoadWallet(this.state.tempSecretPhrase)}
            disabled={this.state.tempSecretPhrase.length < 16}
            style={{width: '100%'}}
          >Recover Wallet
          </Button>

          <div style={{paddingTop: '20px', paddingBottom: '20px', textAlign: 'center'}}>OR</div>

          <Button
            onClick={() => this.handleNewWallet()}
            style={{width: '100%'}}
          >New Wallet
          </Button>
        </div>
      </Page>
    )
  }
}

SetupPage.propTypes = {
  context: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setHasExistingWallet: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setSecretPhrase,
      setSecretItems
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
