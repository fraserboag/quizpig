import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LevelSelectScreen from './screens/LevelSelectScreen'
import QuizScreen from './screens/QuizScreen'
import EndScreen from './screens/EndScreen'
import CreditsScreen from './screens/CreditsScreen'
import { Provider } from 'react-redux'
import { store, persistor } from './slices/index'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppLoading from 'expo-app-loading'
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy'
import { Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'
import { StatusBar } from 'expo-status-bar'

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({ Chewy_400Regular, Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold })

  if (!fontsLoaded) return <AppLoading />

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar />
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Level Select' component={LevelSelectScreen} />
              <Stack.Screen name='Quiz Screen' component={QuizScreen} />
              <Stack.Screen name='End Screen' component={EndScreen} options={{ gestureEnabled: false }} />
              <Stack.Screen name='Credits' component={CreditsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
