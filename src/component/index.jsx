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

export const statechart = {
	key: 'light',
	initial: 'green',
	states: {
		green: {
			on: {
				TIMER: {
					orange: {
						cond: (extState, eventObj) => {
							return 'orange'
						}
					}
				}
			}
		},
		orange: {
			onEntry: 'flashOn',
			on: {
				TIMER: 'red'
			},
			onExit: 'flashOff'
		},
		red: {
			on: {
				TIMER: 'green'
			}
		}
	}
}

export class Root extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			flashing: false
		}
	}

	componentDidMount() {
		this.clickObservable.subscribe()
	}

	componentWillUnmount() {
		this.clickObservable.unsubscribe()
	}

	flashOn = () => this.setState({ flashing: true })
	flashOff = () => this.setState({ flashing: false })

	clickSubject = new Subject()

	clickObservable = Observable.from(this.clickSubject)
		.delay(2000)
		.do(() => this.timer())
		.delay(3000)
		.do(() => this.timer())
		.delay(5000)
		.do(() => this.timer())

	timer = () => {
		this.props.transition('TIMER', this.state)
	}

	get color() {
		return this.props.machineState.value
	}

	render() {
		const { flashing } = this.state

		console.log('Parent render')
		return (
			<div className="app">
				{[[{}]].map((_, index) =>
					_.map(() => <TrafficLight key={index} color={this.color} flashing={flashing} />)
				)}
				<div className="cross-button" onClick={() => this.clickSubject.next()} />
			</div>
		)
	}
}

export default hot(module)(withStatechart(statechart)(Root))
