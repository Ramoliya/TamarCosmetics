import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import SplashScreen from '../screen/SplashScreen';
import IntroductionScreen from '../screen/IntroductionScreen';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

function StackNavigator() {
    const [isSplash, setIsSplash] = useState(true)
    const [isIntroduction, setIsIntroduction] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsSplash(false)
        }, 4000)
        // setTimeout(() => {
        //     setIsIntroduction(false)
        // }, 10000)

    }, [])


    return (
        // <Stack.Navigator screenOptions={{ headerShown: false }}>
        //     {isSplash && <Stack.Screen name="Splash" component={SplashScreen} />}
        //     {/* {isIntroduction && <Stack.Screen name="Introduction" component={IntroductionScreen} />} */}
        //     <Stack.Screen name="Home" component={HomeScreen} />
        // </Stack.Navigator>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
    );
}

export default StackNavigator;