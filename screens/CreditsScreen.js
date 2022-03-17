import { Text, View, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s } from '../styles/creditsStyles'
import { global } from '../styles/globalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { Analytics, PageHit } from 'expo-analytics'
import { useEffect } from 'react'

const CreditsScreen = ({ navigation }) => {
  useEffect(() => {
    const analytics = new Analytics('UA-68238518-2')
    analytics
      .hit(new PageHit('Credits'))
      .then(() => console.log('success'))
      .catch(e => console.log(e.message))
  }, [])

  return (
    <SafeAreaView style={s.container} edges={['top', 'right', 'left']}>
      <LinearGradient colors={['#12c2e9', '#c471ed']} style={global.background} />
      <View style={s.inner}>
        <Pressable onPress={() => navigation.navigate('Home')} style={s.backButton}>
          <Ionicons name='arrow-back-outline' size={35} color='#60433a' />
        </Pressable>
        <ScrollView style={s.content}>
          <Text style={s.title}>Credits</Text>
          <View style={s.item}>
            <Text style={s.heading}>App Design & Development</Text>
            <Text style={s.credit}>Fraser Boag</Text>
          </View>
          <View style={s.item}>
            <Text style={s.heading}>Questions</Text>
            <Text style={s.credit}>opentdb.com</Text>
            <Text style={s.credit}>trivia.willfry.co.uk</Text>
            <Text style={s.credit}>Fraser Boag</Text>
          </View>
          <View style={s.item}>
            <Text style={s.heading}>Music (via Pond5)</Text>
            <Text style={s.credit}>ionics</Text>
          </View>
          <View style={s.item}>
            <Text style={s.heading}>Additional Graphics (via Iconfinder)</Text>
            <Text style={s.credit}>Chanut is Industries</Text>
            <Text style={s.credit}>NeueDeutsche</Text>
            <Text style={s.credit}>Smashicons</Text>
          </View>
          <View style={[s.item, s.lastItem]}>
            <Text style={s.heading}>Development Framework</Text>
            <Text style={s.credit}>React Native</Text>
            <Text style={s.credit}>Expo</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CreditsScreen
