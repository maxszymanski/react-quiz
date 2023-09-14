import { useEffect, useReducer } from 'react'
import Header from './Header'
import Section from './Section'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'

type Questions = {
	question: string
	options: string[]
	correctOption: number
	points: number
}

type State = {
	questions: Questions[]
	status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
}

type Action = { type: 'dataRecived'; payload: Questions[] } | { type: 'dataFailed'; payload: Questions[] }

const initlialState: State = {
	questions: [],
	status: 'loading',
}

const reducer = (state: State[], action: Action) => {
	switch (action.type) {
		case 'dataRecived':
			return { ...state, questions: action.payload, status: 'ready' }
		case 'dataFailed':
			return { ...state, status: 'error' }

		default:
			throw new Error('Action Unnown')
	}
}

const App = () => {
	const [{ question, status }, dispatch] = useReducer(reducer, initlialState)

	const numQuestions = questions

	useEffect(() => {
		fetch('http://localhost:8000/questions')
			.then(res => res.json())
			.then((data: Questions[]) => dispatch({ type: 'dataRecived', payload: data }))
			.catch(err => dispatch({ type: 'dataFailed' }))
	}, [])

	return (
		<div className="app">
			<Header />
			<Section>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen />}
			</Section>
		</div>
	)
}

export default App
