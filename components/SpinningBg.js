import { View, Animated, Easing } from 'react-native'
import { useEffect, useState } from 'react'

const SpinningBg = ({ endScreen }) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        alignItems: endScreen ? 'flex-end' : 'center',
        justifyContent: 'center',
        opacity: 0.075,
      }}
    >
      <Animated.Image
        source={require('../assets/sunburst.png')}
        resizeMode='cover'
        style={{
          transform: [{ rotate: spin }, { scale: 2 }],
          top: endScreen ? -0 : -80,
          left: 0,
        }}
      />
    </View>
  )
}

export { SpinningBg }
