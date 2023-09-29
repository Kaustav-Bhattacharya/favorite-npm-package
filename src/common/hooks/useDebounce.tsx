import { useEffect, useState } from 'react'

const DEBOUNCE_DELAY = 1000

//Use debouncing to limit the number of requests to the server
const useDebouncedValue = (value: string, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
			setLoading(false)
		}, delay || DEBOUNCE_DELAY)

		return () => {
			clearTimeout(handler)
			setLoading(true)
		}
	}, [value, delay])

	return { debouncedValue, debouncing: loading }
}

export { useDebouncedValue }
