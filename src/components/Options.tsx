import { useQuiz } from '../context/QuizContext'

function Options() {
	const { questionObject, answer, dispatch } = useQuiz()
	const { options, correctOption } = questionObject
	const hasAnswered: boolean = answer !== null
	return (
		<div className="options">
			{options.map((option, index) => (
				<button
					className={`btn btn-option ${index === answer ? 'answer' : ''} ${
						hasAnswered ? (index === correctOption ? 'correct' : 'wrong') : ''
					} `}
					key={option}
					disabled={hasAnswered}
					onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
					{option}
				</button>
			))}
		</div>
	)
}

export default Options
