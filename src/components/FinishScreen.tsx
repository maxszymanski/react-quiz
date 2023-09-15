function FinishScreen({
	points,
	allPoints,
	highscore,
	dispatch,
}: {
	points: number
	allPoints: number
	highscore: number
	dispatch: () => void
}) {
	const precentage = (points / allPoints) * 100
	let emoji: string
	if (precentage === 100) emoji = '🥇'
	if (precentage >= 80 && precentage < 100) emoji = '🥈'
	if (precentage >= 50 && precentage < 80) emoji = '🥉'
	if (precentage >= 0 && precentage < 50) emoji = '🤦‍♂️'
	if (precentage === 0) emoji = '😑'

	return (
		<>
			<p className="result">
				<span>{emoji}</span> Your scored <strong>{points}</strong> out of {allPoints} ({Math.ceil(precentage)}%)
			</p>
			<p className="highscore">(Hightscore: {highscore} points)</p>
			<button className="btn btn-ui" onClick={() => dispatch({ type: 'reset' })}>
				Reset
			</button>
		</>
	)
}

export default FinishScreen
