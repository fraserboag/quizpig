import { StyleSheet } from 'react-native'

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    padding: 18,
    backgroundColor: 'white',
    width: '75%',
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 20,
  },
  startButtonText: {
    fontSize: 30,
    fontFamily: 'Ubuntu_700Bold',
    color: '#60433a',
    textAlign: 'center',
    letterSpacing: -1.5,
  },
  startButtonPressed: {
    transform: [{ translateY: 5 }],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    elevation: 10,
  },
  logo: {
    width: 280,
    height: 190,
  },
  logoText: {
    fontSize: 90,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -40,
    fontFamily: 'Chewy_400Regular',
    color: '#fff',
    zIndex: 10,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  boagLogoWrapper: {
    width: 80,
    height: 30,
    opacity: 0.4,
  },
  boagLogo: {
    width: '100%',
    height: '100%',
  },
  creditsBtn: {
    backgroundColor: 'rgba(96,67,58,0.5)',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  creditsLinkText: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: -1,
  },
})

export { s }
