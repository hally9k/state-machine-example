import { List } from 'immutable'

const REQUEST = 'REQUEST'
const RECEIVE = 'RECEIVE'

export const request = payload => ({ type: REQUEST, payload })
const receive = payload => ({ type: RECEIVE, payload })

const INITIAL_STATE = null

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action

	switch (type) {
		case RECEIVE:
			return payload

		default:
			return state
	}
}

let count = 0
const img = new Image()

const fallbackImages = [
	{
		user: {
			name: 'Austin Chan',
			links: {
				self: 'https://unsplash.com/@austinchan'
			}
		},
		urls: {
			small:
				'https://images.unsplash.com/photo-1496450080853-5f78c43af9e9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f54e10ce09c4da2615d286adf51dcbe3&w=300'
		}
	},
	{
		user: {
			name: 'Mink Mingle',
			links: {
				self: 'https://unsplash.com/@minkmingle'
			}
		},
		urls: {
			small:
				'https://images.unsplash.com/photo-1492931307820-62fa5a68e0df?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=94a8e0cd065fc2c6b25a500c0103211b&w=300'
		}
	},
	{
		user: {
			name: 'Ren Ran',
			links: {
				self: 'https://unsplash.com/@renran'
			}
		},
		urls: {
			small:
				'https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffad2c9362425e381f40c99fe548eb0e&w=300'
		}
	}
]

const requestEpic = $action =>
	$action.ofType(REQUEST).mergeMap(({ payload }) => {
		return fetch(
			`https://api.unsplash.com/search/photos/?page=1&query=${payload} texture&client_id=73c33f84498fa526d6cfa571253007d571012760a3b48cb5ebfdcd518083c45b`
		)
			.then(x => x.json())
			.then(data => receive(processResponse(data)))
			.catch(() => receive(processResponse()))
	})

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function processResponse(data) {
	const result =
		data && data.results && data.results.length
			? data.results[getRandomInt(0, data.results.length - 1)]
			: fallbackImages[getRandomInt(0, fallbackImages.length - 1)]

	const {
		user: {
			name: photographerName,
			links: { self: photographerProfile }
		},
		urls: { small: imageUrl }
	} = result

	img.src = imageUrl

	return {
		photographerName,
		photographerProfile,
		imageUrl
	}
}

export const epics = {
	requestEpic
}
