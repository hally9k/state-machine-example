import React from 'react'
import { hot } from 'react-hot-loader'
import { Machine } from 'xstate'
import TrafficLight from './traffic-light'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/takeWhile'
import 'rxjs/add/operator/do'
import './index.scss'

const lightMachine = Machine({
	key: 'light',
	initial: 'green',
	states: {
		green: {
			on: {
				TIMER: 'orange'
			}
		},
		orange: {
			onEntry: ['flashOn'],
			on: {
				TIMER: 'red'
			},
			onExit: ['flashOff']
		},
		red: {
			on: {
				TIMER: 'green'
			}
		}
	}
})

class Root extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			light: lightMachine.initialState.value,
			flash: false
		}
	}

	command = action => {
		switch (action) {
			case 'flashOn':
				this.setState({ flash: true })
				break
			case 'flashOff':
				this.setState({ flash: false })
				break
			default:
				break
		}
	}

	clickSubject = new Subject()

	clickObservable = Observable.from(this.clickSubject)
		.delay(2000)
		.do(() => this.transitionLightState())
		.delay(3000)
		.do(() => this.transitionLightState())
		.delay(5000)
		.do(() => this.transitionLightState())
		.subscribe()

	transitionLightState = () => {
		const nextLightState = lightMachine.transition(this.state.light, 'TIMER')

		nextLightState.actions.forEach(this.command)

		this.setState(() => ({
			light: nextLightState.value
		}))
	}

	render() {
		const { light, flash } = this.state
		return (
			<div className="app">
				<TrafficLight light={light} flashing={flash} />
				<div className="cross-button" onClick={() => this.clickSubject.next()} />
			</div>
		)
	}
}

export default hot(module)(Root)
