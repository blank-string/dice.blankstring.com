import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chance from 'chance'
import './app.css'

const chance = Chance()

const Add = ({onClick, children}) => <div className='add'>
  <div className='tags has-addons' onClick={() => {
    onClick()
  }}>
    <span className='tag is-link is-medium'>
      <span className='icon'>
        <i className='fa fa-plus' />
      </span>
    </span>
    <span className='tag is-dark is-medium add-name'>{children}</span>
  </div>
</div>

Add.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
}

const Die = ({children, result, onRoll, onRemove}) => <div className='die'>
  <div className='tags has-addons'>
    <span className='die-delete tag is-danger is-medium is-delete' onClick={onRemove} />
    <span className='die-details tag is-link is-medium'>
      {children}
    </span>
    <div className='tag is-link is-medium'>
      <button onClick={onRoll} className='die-result'>{result}</button>
    </div>
  </div>
</div>

Die.propTypes = {
  children: PropTypes.any.isRequired,
  result: PropTypes.number.isRequired,
  onRoll: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

const Stat = ({children}) => <div className='stat'>
  <span className='tag is-info is-medium'>{children}</span>
</div>

Stat.propTypes = {
  children: PropTypes.any.isRequired
}

const Dice = {
  d2: {
    roll: () => chance.natural({min: 1, max: 2}),
    label: 'Coin'
  },
  d4: {
    roll: () => chance.natural({min: 1, max: 4}),
    label: 'D4'
  },
  d6: {
    roll: () => chance.natural({min: 1, max: 6}),
    label: 'D6'
  },
  d8: {
    roll: () => chance.natural({min: 1, max: 8}),
    label: 'D8'
  },
  d10a: {
    roll: () => chance.natural({min: 1, max: 10}),
    label: "D10 (1's)"
  },
  d10b: {
    roll: () => chance.natural({min: 1, max: 10}) * 10,
    label: "D10 (10's)"
  },
  d12: {
    roll: () => chance.natural({min: 1, max: 12}),
    label: 'D12'
  },
  d20: {
    roll: () => chance.natural({min: 1, max: 20}),
    label: 'D20'
  },
  d100: {
    roll: () => chance.natural({min: 1, max: 100}),
    label: 'D100'
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dice: [],
      average: 0,
      sum: 0
    }
  }
  update (dice) {
    const sum = dice.reduce((sum, current) => {
      return sum + current.result
    }, 0)
    const average = Math.round(sum / dice.length) || 0
    this.setState({dice, sum, average})
  }
  rollAll () {
    const dice = this.state.dice.map(die => {
      die.result = Dice[die.size].roll()
      return die
    })
    this.update(dice)
  }
  roll (index) {
    const dice = [].concat(this.state.dice)
    const die = dice[index]
    die.result = Dice[die.size].roll()
    dice[index] = die
    this.update(dice)
  }
  add (size) {
    const dice = [].concat(this.state.dice)
    dice.push({
      size,
      label: Dice[size].label,
      result: Dice[size].roll()
    })
    this.update(dice)
  }
  remove (index) {
    this.state.dice.splice(index, 1)
    this.update(this.state.dice)
  }
  render () {
    return (
      <div className='dice'>
        <section className='section'>
          <div className='container'>
            <h1 className='title'>Blank String Dice</h1>
            <div className='columns'>
              <div className='column is-3'>
                <h2 className='subtitle'>
                  Add
                  <br />
                  <i className='subscript'>Click size to add multiple dice</i>
                </h2>
                <Add onClick={() => this.add('d2')}>{Dice.d2.label}</Add>
                <Add onClick={() => this.add('d4')}>{Dice.d4.label}</Add>
                <Add onClick={() => this.add('d6')}>{Dice.d6.label}</Add>
                <Add onClick={() => this.add('d8')}>{Dice.d8.label}</Add>
                <Add onClick={() => this.add('d10a')}>{Dice.d10a.label}</Add>
                <Add onClick={() => this.add('d10b')}>{Dice.d10b.label}</Add>
                <Add onClick={() => this.add('d12')}>{Dice.d12.label}</Add>
                <Add onClick={() => this.add('d20')}>{Dice.d20.label}</Add>
                <Add onClick={() => this.add('d100')}>{Dice.d100.label}</Add>
              </div>
              <div className='column is-3'>
                <h2 className='subtitle'>
                  Dice
                  <br />
                  <i className='subscript'>Click a die to roll</i>
                </h2>
                <button className='roll-all button is-link' onClick={() => { this.rollAll() }}>
                  <span className='icon'>
                    <i className='fa fa-random' />
                  </span>
                  <span>Roll All</span>
                </button>
                {this.state.dice.map((die, index) => <Die
                  key={`die-${die.size}-${index}`}
                  result={die.result}
                  onRoll={() => { this.roll(index) }}
                  onRemove={() => { this.remove(index) }}>{die.label}
                </Die>)}
              </div>
              <div className='column is-3'>
                <h2 className='subtitle'>
                  Summary
                  <br />
                  <i className='subscript'>Stats from rolls</i>
                </h2>
                <Stat>Sum {this.state.sum}</Stat>
                <Stat>Average {this.state.average}</Stat>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
