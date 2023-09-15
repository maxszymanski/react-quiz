import Options from './Options'

function Question({
	questionObject,
	dispatch,
	answer,
}: {
	questionObject: { question: string; options: string[]; correctOption: number }
	dispatch: () => void
	answer: number | null
}) {
	const { question, options, correctOption } = questionObject

	return (
		<div>
			<h4>{question}</h4>
			<Options options={options} dispatch={dispatch} answer={answer} correctOption={correctOption} />
		</div>
	)
}

export default Question
