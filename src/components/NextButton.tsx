import { useQuiz } from '../context/QuizContext'

function NextButton() {
	const { dispatch } = useQuiz()
	return (
		<button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
			Next
		</button>
	)
}

export default NextButton
