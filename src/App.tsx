import Header from './components/Header'
import Section from './components/Section'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'
import FinishButton from './components/FinishButton'
import Footer from './components/Footer'
import Timer from './components/Timer'
import { useQuiz } from './context/QuizContext'

const App = () => {
	const { status, answer, index, numQuestions } = useQuiz()
	return (
		<div className="app">
			<Header />
			<Section>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen />}
				{status === 'active' && (
					<>
						<Progress />
						<Question />
						<Footer>
							<Timer />
							{answer !== null && index < numQuestions - 1 && <NextButton />}
							{answer !== null && index === numQuestions - 1 && <FinishButton />}
						</Footer>
					</>
				)}
				{status === 'finished' && <FinishScreen />}
			</Section>
		</div>
	)
}

export default App
