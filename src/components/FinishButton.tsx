function FinishButton({ dispatch }: { dispatch: () => void }) {
	return (
		<button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
			Finish
		</button>
	)
}

export default FinishButton
