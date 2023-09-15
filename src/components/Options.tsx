function Options({
	options,
	dispatch,
	answer,
	correctOption,
}: {
	options: string[]
	dispatch: () => void
	answer: number | null
	correctOption: number
}) {
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
