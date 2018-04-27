// Wraps the given epic so that it asynchronously throws the error and restarts.
export const wrapEpic: * = (epic: *): * => (...args: *): * =>
	epic(...args).catch((error: *, source: *): * => {
		setTimeout(() => {
			throw error
		}, 0)

		return source
	})
