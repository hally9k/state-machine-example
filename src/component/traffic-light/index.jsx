import * as React from 'react'
import './traffic-light.scss'

export default ({ light }) => (
	<div className="traffic-light">
		<div className={light === 'red' ? 'lit' : ''} />
		<div className={light === 'orange' ? 'lit' : ''} />
		<div className={light === 'green' ? 'lit' : ''} />
	</div>
)
