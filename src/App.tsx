import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Section from './components/Section'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'
import FinishButton from './components/FinishButton'
import Footer from './components/Footer'
import Timer from './components/Timer'

type Questions = {
	question: string
	options: string[]
	correctOption: number
	points: number
}

interface State {
	questions: Questions[]
	status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
	index: number
	answer: null | number
	points: number
	highscore: number
	secondsRemaining: number | null
}

type Action =
	| { type: 'dataRecived'; payload: Questions[] }
	| { type: 'dataFailed'; payload: Questions[] }
	| { type: 'start'; payload: Questions[] }
	| { type: 'newAnswer'; payload: number }
	| { type: 'nextQuestion'; payload: number }
	| { type: 'finish'; payload: number }
	| { type: 'reset'; payload: number }
	| { type: 'tick'; payload: number }

const SECS_PER_QUESTIONS = 30

const initlialState: State = {
	questions: [],
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
}

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'dataRecived':
			return { ...state, questions: action.payload, status: 'ready' }
		case 'dataFailed':
			return { ...state, status: 'error' }
		case 'start':
			return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTIONS }
		case 'newAnswer': {
			const question = state.questions[state.index]
			return {
				...state,
				answer: action.payload,
				points: action.payload === question.correctOption ? state.points + question.points : state.points,
			}
		}
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			}
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore: state.points > state.highscore ? state.points : state.highscore,
			}
		case 'reset':
			return { ...state, status: 'ready', index: 0, points: 0, answer: null, secondsRemaining: 10 }
		case 'tick': {
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
				highscore: state.secondsRemaining === 0 ? Math.max(state.points, state.highscore) : state.highscore,
			}
		}
		default:
			throw new Error('Action Unnown')
	}
}

const App = () => {
	const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
		reducer,
		initlialState
	)

	const numQuestions: number = questions.length
	const allPoints: number = questions.reduce((acc: number, cur: number) => acc + cur.points, 0)

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
				{status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
				{status === 'active' && (
					<>
						<Progress numQuestions={numQuestions} index={index} points={points} allPoints={allPoints} answer={answer} />
						<Question questionObject={questions[index]} dispatch={dispatch} answer={answer} />{' '}
						<Footer>
							<Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
							{answer !== null && index < numQuestions - 1 && <NextButton dispatch={dispatch} />}
							{answer !== null && index === numQuestions - 1 && <FinishButton dispatch={dispatch} />}
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen points={points} allPoints={allPoints} highscore={highscore} dispatch={dispatch} />
				)}
			</Section>
		</div>
	)
}

export default App
