import { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

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

function QuizProvider({ children }) {
	const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
		reducer,
		initlialState
	)
	const numQuestions: number = questions.length
	const allPoints: number = questions.reduce((acc: number, cur: number) => acc + cur.points, 0)
	const questionObject = questions[index]

	useEffect(() => {
		fetch('http://localhost:8000/questions')
			.then(res => res.json())
			.then((data: Questions[]) => dispatch({ type: 'dataRecived', payload: data }))
			.catch(dispatch({ type: 'dataFailed' }))
	}, [])

	return (
		<QuizContext.Provider
			value={{
				numQuestions,
				status,
				index,
				answer,
				points,
				allPoints,
				highscore,
				secondsRemaining,
				questionObject,
				dispatch,
			}}>
			{children}
		</QuizContext.Provider>
	)
}
function useQuiz() {
	const contexts = useContext(QuizContext)
	if (contexts === undefined) throw new Error('City context was used outside Provider')
	return contexts
}
export { QuizProvider, useQuiz }
