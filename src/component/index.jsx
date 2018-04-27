import React from 'react'
import { hot } from 'react-hot-loader'
import { withStatechart } from 'react-automata'
import TrafficLight from './traffic-light'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/do'
import './index.scss'

export const lightStateChart = {
	key: 'light',
	initial: 'green',
	states: {
		green: {
			onEntry: 'green',
			on: {
				TIMER: 'orange'
			}
		},
		orange: {
			onEntry: ['orange', 'flashOn'],
			on: {
				TIMER: 'red'
			},
			onExit: 'flashOff'
		},
		red: {
			onEntry: 'red',
			on: {
				TIMER: 'green'
			}
		}
	}
}

class Root extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			light: lightStateChart.initial,
			flash: false
		}
	}

	componentDidMount() {
		this.clickObservable.subscribe()
	}

	componentWillUnmount() {
		this.clickObservable.unsubscribe()
	}

	green = () => this.setState({ light: 'green' })
	orange = () => this.setState({ light: 'orange' })
	red = () => this.setState({ light: 'red' })
	flashOn = () => this.setState({ flash: true })
	flashOff = () => this.setState({ flash: false })

	clickSubject = new Subject()

	clickObservable = Observable.from(this.clickSubject)
		.delay(2000)
		.do(() => this.timer())
		.delay(3000)
		.do(() => this.timer())
		.delay(5000)
		.do(() => this.timer())

	timer = () => {
		this.props.transition('TIMER')
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

export default hot(module)(withStatechart(lightStateChart)(Root))
