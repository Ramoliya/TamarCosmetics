
import React from 'react'
import { View, StyleSheet, Image, Text, Platform } from 'react-native'

import { headerColor, primaryColor, primaryColorDark, whiteShade } from '../utils/Colors';
import { MainView } from '../component/common';
import { Styles } from '../utils/Styles';
import { Font_Bold, Font_Bold_Rounded, Font_Regular, width } from '../utils/Constants';

const IntroductionScreen = ({ navigation }) => {
    const defaultWidth = width * 0.07
    const defaultWidthBottom = width * 0.09
    console.log("sdcse : ",defaultWidth,width,Platform.OS)
    return (
        <MainView light={true} backgroundColor={headerColor}>
            <View style={styles.main_container}>
                <View style={styles.container}>
                    <Image source={require('../images/tamarcosmetics.png')} style={Styles.logo_image} />
                    <View style={{ backgroundColor: primaryColorDark,width:'100%', alignItems: 'center',marginVertical:10,padding:10 }}>
                        <Text style={{ color: whiteShade, fontSize: 30,fontFamily:Font_Regular, textAlign: 'right'}}>המרכז הארצי לייבוא ושיווק מוצרים לקוסמטיקאיות אונליין</Text>
                    </View>
                    <Text style={{ color: 'black', fontSize: 35,fontFamily:Font_Bold }}>אפילציה למקצועיות</Text>
                    

                </View>
            </View>
        </MainView>
    )
}

export default IntroductionScreen;
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: primaryColor
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})