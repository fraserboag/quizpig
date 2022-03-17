import { Text, Pressable, ScrollView, View, Image, Linking } from 'react-native'
import quizData from '../data/quizData.json'
import { disableFirstLaunch, setSelectedLevel } from '../slices/progressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { generateStarRating, getQuizColor, getQuizIcon } from '../utils/utils'
import { global } from '../styles/globalStyles'
import { s } from '../styles/levelSelectStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toggleMusic } from '../slices/progressSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRef, useEffect } from 'react'
import { Analytics, PageHit } from 'expo-analytics'

// import AsyncStorage from '@react-native-async-storage/async-storage'

const LevelSelectScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const completedQuizzes = useSelector(state => state.progress.completedQuizzes)
  const musicMuted = useSelector(state => state.progress.settings.musicMuted)
  const totalStars = useSelector(state => state.progress.totalStars)
  const activeQuiz = useSelector(state => state.progress.activeQuiz)
  const isFirstLaunch = useSelector(state => state.progress.firstLaunch)
  const [pressedButton, setPressedButton] = useState(null)

  const scrollContainer = useRef()

  useEffect(() => {
    if (typeof activeQuiz.id !== 'undefined') {
      const activeBlock = Math.floor((activeQuiz.id - 1) / 9)
      const scrollHeight = activeBlock * 387
      scrollContainer.current.scrollTo({ x: 0, y: scrollHeight })
    }

    const analytics = new Analytics('UA-68238518-2')
    analytics
      .hit(new PageHit('Level Select'))
      .then(() => console.log('success'))
      .catch(e => console.log(e.message))
  }, [])

  const selectLevel = quiz => {
    dispatch(setSelectedLevel(quiz))
    navigation.navigate('Quiz Screen')
  }

  let firstLockedLevel = 999999

  return (
    <View style={global.container}>
      <LinearGradient colors={['#12c2e9', '#c471ed']} style={global.background} />

      <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
        {/* <Pressable
          onPress={() => {
            AsyncStorage.clear()
          }}
        >
          <Text>Clear storage</Text>
        </Pressable> */}
        {isFirstLaunch && (
          <View style={s.firstLaunch}>
            <Text style={s.firstLaunchText}>
              Welcome to QuizPig! Play quizzes to earn stars. Use stars to unlock more quizzes!
            </Text>
            <Pressable style={s.firstLaunchBtn} onPress={() => dispatch(disableFirstLaunch())}>
              <View style={s.firstLaunchBtnTextWrapper}>
                <Ionicons name='play-circle-outline' size={30} color='#60433a' />
                <Text style={s.firstLaunchBtnText}>Get started</Text>
              </View>
            </Pressable>
          </View>
        )}
        <View style={s.headerWrapper}>
          <View style={s.header}>
            <View style={s.metaHeader}>
              <View style={s.metaHeaderStarContainer}>
                <Image style={s.metaHeaderStar} source={require('../assets/star.png')} resizeMode='contain' />
                <Text style={s.metaHeaderText}>{totalStars}</Text>
              </View>
              <Pressable onPress={() => dispatch(toggleMusic())} hitSlop={20}>
                <View style={s.metaHeaderTextWrapper}>
                  <Text style={s.metaHeaderText}>{musicMuted ? 'Music is off ' : 'Music is on '}</Text>
                  {musicMuted ? (
                    <Ionicons name='volume-mute' size={20} color='#60433a' />
                  ) : (
                    <Ionicons name='volume-high' size={20} color='#60433a' />
                  )}
                </View>
              </Pressable>
            </View>
            <View style={s.titleContainer}>
              <View style={s.titleLeft}>
                <Text style={s.titleText}>Select{'\n'}a level</Text>
              </View>
              <View style={s.titleRight}>
                <Image style={s.pig} source={require('../assets/pig.png')} resizeMode='contain' />
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={s.levelGridScrollView} ref={scrollContainer}>
          <View style={s.levelGrid}>
            {quizData.quizzes.map(quiz => {
              let isLocked = false
              if (quiz.level_type === 'lock') {
                if (quiz.unlock_requirement > totalStars) {
                  isLocked = true
                  firstLockedLevel = quiz.lock_after_id + 1
                }
                return (
                  <View style={isLocked ? s.lockBarrier : [s.lockBarrier, s.lockBarrierOpen]} key={quiz.id}>
                    <View style={s.lockLine}></View>
                    <View style={s.lockText}>
                      <Ionicons
                        name={isLocked ? 'lock-closed' : 'checkmark-circle-outline'}
                        size={20}
                        color='#60433a'
                      />
                      <Text style={s.lockTextInner}>
                        {isLocked ? `Earn ${quiz.unlock_requirement} stars to unlock` : 'Unlocked'}
                      </Text>
                    </View>
                    <View style={s.lockLine}></View>
                  </View>
                )
              } else {
                const compQuiz = completedQuizzes.find(compQuiz => compQuiz.id === quiz.id)
                const levelStyles = [s.levelButton]
                if (quiz.id === pressedButton) {
                  levelStyles.push(s.levelButtonPressed)
                }
                if (compQuiz) {
                  levelStyles.push(s.completed)
                }
                if (quiz.id >= firstLockedLevel) {
                  levelStyles.push(s.locked)
                  isLocked = true
                }

                return (
                  <Pressable
                    onPressIn={() => {
                      setPressedButton(quiz.id)
                    }}
                    onPressOut={() => {
                      setPressedButton(null)
                    }}
                    onPress={() => {
                      selectLevel(quiz)
                    }}
                    key={quiz.id}
                    style={levelStyles}
                    disabled={isLocked}
                  >
                    {!isLocked && (
                      <View style={[s.categoryIcon, { backgroundColor: getQuizColor(quiz.category) }]}>
                        {getQuizIcon(quiz.category, 18)}
                      </View>
                    )}
                    <Text style={isLocked ? [s.levelNumber, s.levelNumberLocked] : s.levelNumber}>{quiz.id}</Text>

                    {compQuiz ? (
                      generateStarRating(compQuiz.score, quiz.questions.length)
                    ) : (
                      <Image
                        style={[global.starsSmall, s.noStars]}
                        source={require('../assets/0stars.png')}
                        resizeMode='contain'
                      />
                    )}
                  </Pressable>
                )
              }
            })}
          </View>
          <View style={s.iapContainer}>
            <Text style={s.iapTitle}>Support QuizPig</Text>
            <Text style={s.iapIntro}>
              QuizPig is designed, built and maintained by one person! It also has no ads and is completely free. If
              you're enjoying playing and are feeling generous, I'd be extremely grateful if you would consider buying
              me a coffee at the link below.
            </Text>
            <Text style={s.iapIntro}>
              If you can't afford it, or just don't want to, please continue enjoying the game on me!
            </Text>
            <Pressable
              style={[s.iapButton, { backgroundColor: '#facc15' }]}
              onPress={() => Linking.openURL('https://www.buymeacoffee.com/boag')}
            >
              <Image source={require('../assets/sunburst-transparent.png')} style={s.iapButtonBackground} />
              <View style={s.iapButtonTitle}>
                <Text style={s.iapButtonTitleText}>Buy me a coffee</Text>
                <Ionicons style={s.coffeeIcon} name='cafe-outline' size={50} color='#ffffff' />
              </View>
              <Text style={s.iapButtonText}>Opens an external link</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => Linking.openURL('https://boag.online')} style={s.boagLogoWrapper} hitSlop={20}>
            <Image source={require('../assets/boag-logo.png')} style={s.boagLogo} resizeMode='contain' />
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default LevelSelectScreen
