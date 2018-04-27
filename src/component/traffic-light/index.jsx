import * as React from 'react'
import classnames from 'classnames'
import './traffic-light.scss'

export default ({ light, flashing }) => (
	<div className="traffic-light">
		<div className={classnames({ lit: light === 'red' })} />
		<div className={classnames({ lit: light === 'orange', flashing })} />
		<div className={classnames({ lit: light === 'green' })} />
	</div>
)
