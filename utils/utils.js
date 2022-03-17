import { global } from '../styles/globalStyles'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const generateStarRating = (score, numQuestions, returnInt, largeSize) => {
  const scorePercentage = score / numQuestions

  if (scorePercentage >= 0.9) {
    if (returnInt) {
      return 3
    } else {
      return (
        <Image
          style={largeSize ? global.starsLarge : global.starsSmall}
          source={require('../assets/3stars.png')}
          resizeMode='contain'
        />
      )
    }
  }
  if (scorePercentage >= 0.6) {
    if (returnInt) {
      return 2
    } else {
      return (
        <Image
          style={largeSize ? global.starsLarge : global.starsSmall}
          source={require('../assets/2stars.png')}
          resizeMode='contain'
        />
      )
    }
  }

  if (returnInt) {
    return 1
  } else {
    return (
      <Image
        style={largeSize ? global.starsLarge : global.starsSmall}
        source={require('../assets/1star.png')}
        resizeMode='contain'
      />
    )
  }
}

const getQuizIcon = (category, size) => {
  if (category === 'General Knowledge') return <Ionicons name='help-circle' size={size} color='white' />
  if (category === 'Entertainment & Sport') return <Ionicons name='musical-notes' size={size} color='white' />
  if (category === 'Geography & Cultures') return <Ionicons name='earth' size={size} color='white' />
  if (category === 'History & Politics') return <Ionicons name='book' size={size} color='white' />
  if (category === 'Science & Nature') return <Ionicons name='flask' size={size} color='white' />
}

const getQuizColor = category => {
  if (category === 'General Knowledge') return '#4ade80'
  if (category === 'Entertainment & Sport') return '#facc15'
  if (category === 'Geography & Cultures') return '#38bdf8'
  if (category === 'History & Politics') return '#c084fc'
  if (category === 'Science & Nature') return '#fda4af'
}

export { generateStarRating, getQuizIcon, getQuizColor }
