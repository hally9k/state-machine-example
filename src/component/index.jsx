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

class Root extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			light: 'green'
		}
	}

	lightMachine = Machine({
		key: 'light',
		initial: 'green',
		states: {
			green: {
				on: {
					TIMER: 'orange'
				}
			},
			orange: {
				on: {
					TIMER: 'red'
				}
			},
			red: {
				on: {
					TIMER: 'green'
				}
			}
		}
	})

	clickSubject = new Subject()

	clickObservable = Observable.from(this.clickSubject)
		.delay(2000)
		.do(() => this.transitionLightState())
		.delay(2000)
		.do(() => this.transitionLightState())
		.delay(5000)
		.do(() => this.transitionLightState())
		.subscribe()

	handleCrossingRequest = () => {}

	transitionLightState = () => {
		this.setState(() => ({
			light: this.lightMachine.transition(this.state.light, 'TIMER').value
		}))
	}

	render() {
		return (
			<div className="app">
				<TrafficLight light={this.state.light} />
				<div className="cross-button" onClick={() => this.clickSubject.next()} />
			</div>
		)
	}
}

export default hot(module)(Root)
