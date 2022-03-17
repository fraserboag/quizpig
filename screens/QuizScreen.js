import { Animated, Easing, Text, View, Pressable, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { nextQuestion, setCurrentQuestionAnswered, increaseScore, addCompletedQuiz } from '../slices/progressSlice'
import { decode } from 'html-entities'
import { SafeAreaView } from 'react-native-safe-area-context'
import { global } from '../styles/globalStyles'
import { s } from '../styles/quizStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { getQuizColor } from '../utils/utils'
import { Analytics, PageHit } from 'expo-analytics'
import { useEffect, useRef } from 'react'

const QuizScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const selectedLevel = useSelector(state => state.progress.activeQuiz.id)
  const currentQuestionIndex = useSelector(state => state.progress.currentQuestion)
  const currentQuestionAnswered = useSelector(state => state.progress.currentQuestionAnswered)
  const activeQuiz = useSelector(state => state.progress.activeQuiz)
  const currentScore = useSelector(state => state.progress.currentScore)

  const [pressedButton, setPressedButton] = useState(null)

  const submitAnswer = answer => {
    if (answer === activeQuiz.questions[currentQuestionIndex].correct_answer) {
      dispatch(setCurrentQuestionAnswered('correct'))
      dispatch(increaseScore())
    } else {
      dispatch(setCurrentQuestionAnswered('wrong'))
    }
    openModal()
  }

  const nextQuestionButton = () => {
    closeModal()
    setTimeout(() => {
      if (currentQuestionIndex === activeQuiz.questions.length - 1) {
        dispatch(
          addCompletedQuiz({ id: selectedLevel, score: currentScore, numQuestions: activeQuiz.questions.length }),
        )
        navigation.navigate('End Screen')
      } else {
        dispatch(nextQuestion())
      }
    }, 100)
  }

  useEffect(() => {
    const analytics = new Analytics('UA-68238518-2')
    analytics
      .hit(new PageHit('Quiz ' + selectedLevel))
      .then(() => console.log('success'))
      .catch(e => console.log(e.message))
  }, [])

  /* Questions Animation */
  const yAnims = [
    useRef(new Animated.Value(150)).current,
    useRef(new Animated.Value(150)).current,
    useRef(new Animated.Value(150)).current,
    useRef(new Animated.Value(150)).current,
  ]
  const oAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ]

  useEffect(() => {
    Animated.timing(yAnims[0], {
      toValue: 0,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
    Animated.timing(oAnims[0], {
      toValue: 1,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()

    Animated.timing(yAnims[1], {
      toValue: 0,
      delay: 100,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
    Animated.timing(oAnims[1], {
      toValue: 1,
      delay: 100,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()

    Animated.timing(yAnims[2], {
      toValue: 0,
      delay: 200,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
    Animated.timing(oAnims[2], {
      toValue: 1,
      delay: 200,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()

    Animated.timing(yAnims[3], {
      toValue: 0,
      delay: 300,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
    Animated.timing(oAnims[3], {
      toValue: 1,
      delay: 300,
      duration: 400,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
  }, [])
  /* End Questions Animation */

  /* Modal Animations */
  const modalOpacity = useRef(new Animated.Value(0)).current
  const modalScale = useRef(new Animated.Value(0.6)).current
  const openModal = () => {
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 400,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    }).start()
    Animated.timing(modalScale, {
      toValue: 1,
      duration: 400,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    }).start()
  }
  const closeModal = () => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 400,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    }).start()
    Animated.timing(modalScale, {
      toValue: 0.6,
      duration: 400,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    }).start()
  }
  /* End Modal Animations */

  return (
    <View style={global.container}>
      <LinearGradient colors={['#12c2e9', '#c471ed']} style={global.background} />
      <SafeAreaView style={{ flexGrow: 1 }}>
        <View style={s.header}>
          <View style={s.headerInner}>
            <Pressable onPress={() => navigation.navigate('Level Select')} style={s.headerBackButton}>
              <Ionicons name='arrow-back-outline' size={35} color='#60433a' />
            </Pressable>
          </View>
          <View style={[s.categoryLabel, { backgroundColor: getQuizColor(activeQuiz.category) }]}>
            <Text style={s.headerText}>
              {selectedLevel}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{activeQuiz.category}
            </Text>
          </View>
        </View>

        <View style={s.mainWrapper}>
          <View style={s.question}>
            <Text style={s.questionNumberText}>
              Question {currentQuestionIndex + 1}/{activeQuiz.questions.length}
            </Text>
            <Text style={s.questionText}>{decode(activeQuiz.questions[currentQuestionIndex].question)}</Text>
          </View>

          <View style={s.answers}>
            {activeQuiz.questions[currentQuestionIndex].shuffled_answers.map((answer, i) => {
              let answerLetter = 'A'
              if (i === 1) answerLetter = 'B'
              if (i === 2) answerLetter = 'C'
              if (i === 3) answerLetter = 'D'
              return (
                <Animated.View style={{ transform: [{ translateY: yAnims[i] }], opacity: oAnims[i] }} key={i}>
                  <Pressable
                    onPressIn={() => {
                      setPressedButton(i)
                    }}
                    onPressOut={() => {
                      setPressedButton(null)
                    }}
                    onPress={() => {
                      submitAnswer(answer)
                    }}
                    disabled={currentQuestionAnswered ? true : false}
                    style={pressedButton === i ? [s.answerButton, s.answerButtonPressed] : [s.answerButton]}
                  >
                    <Text style={[s.answerButtonLetter, { backgroundColor: getQuizColor(activeQuiz.category) }]}>
                      {answerLetter}
                    </Text>
                    <Text style={s.answerButtonText}>{decode(answer)}</Text>
                  </Pressable>
                </Animated.View>
              )
            })}
          </View>
        </View>

        {currentQuestionAnswered && (
          <Animated.View style={[s.questionResult, { opacity: modalOpacity, transform: [{ scale: modalScale }] }]}>
            <Image
              source={require('../assets/pig.png')}
              resizeMode='contain'
              style={currentQuestionAnswered === 'correct' ? s.normalPig : s.deadPig}
            />
            <Text style={s.questionResultText}>
              {currentQuestionAnswered === 'correct' ? "That's correct!" : 'Wrong answer'}
            </Text>
            <Pressable
              onPress={() => {
                nextQuestionButton()
              }}
              style={[s.answerButton, s.nextButton, { backgroundColor: getQuizColor(activeQuiz.category) }]}
            >
              <Text style={[s.answerButtonText, s.nextButtonText]}>
                {currentQuestionIndex === activeQuiz.questions.length - 1 ? 'Finish' : 'Next Question'}
              </Text>
              <Ionicons name='arrow-forward-outline' size={30} color='#60433a' />
            </Pressable>
          </Animated.View>
        )}
      </SafeAreaView>
    </View>
  )
}

export default QuizScreen
