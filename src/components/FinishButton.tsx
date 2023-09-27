import { useQuiz } from '../context/QuizContext'

function FinishButton() {
	const { dispatch } = useQuiz()
	return (
		<button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
			Finish
		</button>
	)
}

export default FinishButton
