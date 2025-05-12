
import React from 'react'
import { View, StyleSheet, Image, Text, Platform } from 'react-native'

import { primaryColor, primaryColorDark } from '../utils/Colors';
import { MainView } from '../component/common';
import { Styles } from '../utils/Styles';
import { Font_Bold, width } from '../utils/Constants';

const SplashScreen = ({ navigation }) => {
    return (
        <MainView light={true}>
            <View style={styles.main_container}>
                <View style={styles.container}>
                    <Image source={require('../images/logo-text.png')} style={styles.logo_image} />
                    <View style={{
                        marginTop:Platform.OS =='android'? -22 : -15,
                        }}>
                        <Text style={{ color: '#D72024',fontSize: 40, fontFamily: Font_Bold }}>טְעִינָה...</Text>
                    </View>

                </View>
            </View>
        </MainView>
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
        width:250,
        height:105,
        resizeMode: 'contain',
    //  backgroundColor:'red'
      
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})