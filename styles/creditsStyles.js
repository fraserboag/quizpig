import { StyleSheet } from 'react-native'

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    fontFamily: 'Chewy_400Regular',
    color: 'white',
    lineHeight: 55,
    paddingTop: 30,
    marginBottom: 15,
  },
  item: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 10,
  },
  heading: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 15,
    color: '#60433a',
    letterSpacing: -0.5,
  },
  credit: {
    marginTop: 10,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#60433a',
    letterSpacing: -0.5,
  },
  lastItem: {
    marginBottom: 40,
  },
})

export { s }
