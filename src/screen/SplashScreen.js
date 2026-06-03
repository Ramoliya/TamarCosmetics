
import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text, Platform } from 'react-native'

import { primaryColor, primaryColorDark } from '../utils/Colors';
import { MainView } from '../component/common';
import { Styles } from '../utils/Styles';
import { Font_Bold, width } from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }) => {

   useEffect(() => {
  const checkNotificationAndNavigate = async () => {
    const url = await AsyncStorage.getItem('pending_push_url');
    if (url) {
      await AsyncStorage.removeItem('pending_push_url');
      navigation.replace('Home', { url }); // early jump
    } else {
      // fallback wait before going to Home
      setTimeout(() => {
        navigation.replace('Home');
      }, 3000); // ⏱️ control time here, not in StackNavigator
    }
  };

  checkNotificationAndNavigate();
}, []);

    return (
        <MainView light={true}>
            <View style={styles.main_container}>
                <View style={styles.container}>
                     <Image source={require('../images/logo-text.png')} style={styles.logo_image} /> 
                    <View style={{
                        marginTop: Platform.OS == 'android' ? 15 : 5,
                    }}>
                        {/* <Text style={{ color: '#D72024', fontSize: 40, fontFamily: Font_Bold }}>טְעִינָה...</Text> */}
                        <Text style={{ color: '#D72024', fontSize: 30, fontFamily: Font_Bold }}>מכינים לכם את הדברים...</Text>
                    </View>

                </View>
            </View>
        </MainView>

        // <MainView light={true}>
        //     <SafeAreaView style={styles.safeArea}>
        //         <View style={styles.main_container}>
        //             <View style={styles.container}>
        //                 <Image
        //                     source={require('../images/logo-text.png')}
        //                     style={styles.logo_image}
        //                  />
        //                 <View style={styles.textWrapper}>
        //                     <Text style={styles.loadingText}>טְעִינָה...</Text>
        //                 </View>
        //             </View>
        //         </View>
        //     </SafeAreaView>
        // </MainView>
    )
}

export default SplashScreen;
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: primaryColor
    },
    logo_image: {
        // width: width * 0.80,
        // height: width * 0.25,
        width: 250,
        height: 105,
        resizeMode: 'contain',
        //  backgroundColor:'red'

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    // safeArea: {
    //     flex: 1,
    //     backgroundColor: primaryColor,
    // },
    // main_container: {
    //     flex: 1,
    //     backgroundColor: primaryColor,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // container: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // logo_image: {
    //     width: width * 0.6,
    //     height: width * 0.25,
    //     resizeMode: 'contain',
    // },
    // textWrapper: {
    //     marginTop: Platform.OS === 'android' ? -20 : -10,   
    // },
    // loadingText: {
    //     color: '#D72024',
    //     fontSize: 35,
    //     fontFamily: Font_Bold,
    // },

})