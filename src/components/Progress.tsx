function Progress({
	index,
	numQuestions,
	points,
	allPoints,
	answer,
}: {
	index: number
	numQuestions: number
	points: number
	allPoints: number
	answer: number
}) {
	return (
		<header className="progress">
			<progress max={numQuestions} value={index + Number(answer !== null)} />
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				Points: <strong>{points}</strong> / {allPoints}
			</p>
		</header>
	)
}

export default Progress
