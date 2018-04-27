// @flow
import * as React from 'react'

const { Component, Node }: * = React

export function guard<P, S>(requiredPropKeys: Array<string>, component: Component<P, S>): * {
	function defensiveWrapper<PN>(props: PN): Node {
		const Component: Component<*, *> = requiredPropKeys.reduce(
			(nextComponent: Component<*, *>, key: string): Component<*, *> => {
				// $FlowTODO
				if (!props[key]) {
					return Fallback
				}

				return nextComponent
			},
			component
		)

		return <Component {...props} />
	}

	return defensiveWrapper
}

export class Fallback extends Component<*, *> {
	render(): Node {
		return <h1>Loading...</h1>
	}
}
