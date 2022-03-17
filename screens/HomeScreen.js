import { useState, useEffect } from 'react'
import { Text, Pressable, Image, Linking, View } from 'react-native'
import { s } from '../styles/homeStyles'
import { global } from '../styles/globalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SpinningBg } from '../components/SpinningBg'
import { Audio } from 'expo-av'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Analytics, PageHit } from 'expo-analytics'

const HomeScreen = ({ navigation }) => {
  const [btnPressed, setBtnPressed] = useState(false)

  /* Background music */
  const musicMuted = useSelector(state => state.progress.settings.musicMuted)
  const [sound, setSound] = useState()
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/audio/bgm.mp3'))
    await sound.setVolumeAsync(0.05)
    await sound.setIsLoopingAsync(true)
    setSound(sound)
    await sound.playAsync()
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])
  useEffect(() => {
    if (!musicMuted) {
      playSound()
    } else if (typeof sound !== 'undefined') {
      sound.stopAsync()
    }
  }, [musicMuted])
  /* End background music */

  useEffect(() => {
    const analytics = new Analytics('UA-68238518-2')
    analytics
      .hit(new PageHit('Home'))
      .then(() => console.log('success'))
      .catch(e => console.log(e.message))
  }, [])

  return (
    <SafeAreaView style={s.container}>
      <LinearGradient colors={['#12c2e9', '#c471ed']} style={global.background} />
      <SpinningBg />
      <Image style={s.logo} source={require('../assets/pig.png')} resizeMode='contain' />
      <Text style={s.logoText}>QuizPig</Text>
      <Pressable
        onPressIn={() => {
          setBtnPressed(true)
        }}
        onPressOut={() => {
          setBtnPressed(false)
        }}
        onPress={() => navigation.navigate('Level Select')}
        style={btnPressed ? [s.startButton, s.startButtonPressed] : s.startButton}
      >
        <Text style={s.startButtonText}>Play Now!</Text>
      </Pressable>

      <View style={s.fixedFooter}>
        <Pressable onPress={() => Linking.openURL('https://boag.online')} style={s.boagLogoWrapper} hitSlop={20}>
          <Image source={require('../assets/boag-logo.png')} style={s.boagLogo} resizeMode='contain' />
        </Pressable>
        <Pressable style={s.creditsBtn} onPress={() => navigation.navigate('Credits')} hitSlop={20}>
          <Text style={s.creditsLinkText}>Credits</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
