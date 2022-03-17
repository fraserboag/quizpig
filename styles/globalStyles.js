import { StyleSheet } from 'react-native'

const global = StyleSheet.create({
  container: {
    height: '100%',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  starsSmall: {
    width: 75,
    height: 25,
    marginBottom: 5,
  },
  starsLarge: {
    width: 200,
    height: 80,
  },
})

export { global }
