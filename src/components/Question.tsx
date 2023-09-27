import { useQuiz } from '../context/QuizContext'
import Options from './Options'

function Question() {
	const { questionObject } = useQuiz()
	const { question } = questionObject

	return (
		<div>
			<h4>{question}</h4>
			<Options />
		</div>
	)
}

export default Question
