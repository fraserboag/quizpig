import { Text, View, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import quizData from '../data/quizData.json'
import { setSelectedLevel } from '../slices/progressSlice'
import { generateStarRating } from '../utils/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { SpinningBg } from '../components/SpinningBg'
import { global } from '../styles/globalStyles'
import { s } from '../styles/endStyles'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Analytics, PageHit } from 'expo-analytics'
import { useEffect } from 'react'

const EndScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const activeQuiz = useSelector(state => state.progress.activeQuiz)
  const currentScore = useSelector(state => state.progress.currentScore)
  const totalStars = useSelector(state => state.progress.totalStars)
  const previousStars = useSelector(state => state.progress.previousStars)

  const [pressedButton, setPressedButton] = useState(null)

  useEffect(() => {
    const analytics = new Analytics('UA-68238518-2')
    analytics
      .hit(new PageHit('End Quiz ' + activeQuiz.id))
      .then(() => console.log('success'))
      .catch(e => console.log(e.message))
  }, [])

  const tryAgain = () => {
    dispatch(setSelectedLevel(activeQuiz))
    navigation.navigate('Quiz Screen')
  }

  const newUnlockBlock = () => {
    const unlockRequirements = []
    let unlockMade = false

    quizData.quizzes.forEach(quiz => {
      if (quiz.level_type === 'lock') {
        unlockRequirements.push(quiz.unlock_requirement)
      }
    })

    unlockRequirements.forEach(unlockReq => {
      if (previousStars < unlockReq && totalStars >= unlockReq) {
        unlockMade = true
      }
    })

    if (unlockMade) {
      return (
        <View style={s.unlockBlock}>
          <Text style={s.unlockBlockText}>You've earned enough stars to unlock a new batch of levels!</Text>
        </View>
      )
    } else if (generateStarRating(currentScore, activeQuiz.questions.length, true) < 3) {
      return <Text style={s.tryAgainText}>Try again to beat your score and earn 3 stars!</Text>
    }
  }

  let completeWord = 'Passed'
  if (generateStarRating(currentScore, activeQuiz.questions.length, true) === 2) {
    completeWord = 'Complete!'
  }
  if (generateStarRating(currentScore, activeQuiz.questions.length, true) === 3) {
    completeWord = 'Perfected!'
  }

  return (
    <SafeAreaView style={s.container}>
      <LinearGradient colors={['#12c2e9', '#c471ed']} style={global.background} />
      <SpinningBg endScreen={true} />

      <View style={s.stars}>{generateStarRating(currentScore, activeQuiz.questions.length, false, true)}</View>

      <Text style={s.levelText}>
        Level {activeQuiz.id} {completeWord}
      </Text>

      <Text style={s.scoreText}>
        You scored {currentScore}/{activeQuiz.questions.length}
        {currentScore / activeQuiz.questions.length === 1 ? ', well done!' : ''}
      </Text>

      {newUnlockBlock()}

      <View style={s.buttons}>
        <Pressable
          onPressIn={() => {
            setPressedButton(1)
          }}
          onPressOut={() => {
            setPressedButton(null)
          }}
          onPress={() => {
            tryAgain()
          }}
          style={pressedButton === 1 ? [s.startButton, s.startButtonPressed] : s.startButton}
        >
          <Ionicons name='refresh-outline' size={30} color='#60433a' />
          <Text style={s.startButtonText}>Play again</Text>
        </Pressable>
        <Pressable
          onPressIn={() => {
            setPressedButton(2)
          }}
          onPressOut={() => {
            setPressedButton(null)
          }}
          onPress={() => {
            navigation.navigate('Level Select')
          }}
          style={pressedButton === 2 ? [s.startButton, s.startButtonPressed] : s.startButton}
        >
          <Ionicons name='grid-outline' size={30} color='#60433a' />
          <Text style={s.startButtonText}>Level select</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default EndScreen
