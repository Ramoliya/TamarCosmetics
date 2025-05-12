
import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Image, BackHandler, Text, ImageBackground } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { headerColor, primaryColor, primaryColorDark, whiteShade } from '../utils/Colors';
import { MainView } from '../component/common';
import { WebView } from "react-native-webview";
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Font_Bold, Font_Regular, width } from '../utils/Constants';
import { Styles } from '../utils/Styles';

const HomeScreen = ({ navigation }) => {

    const [netInfo, setNetInfo] = useState(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const webViewRef = useRef(null);
    const dashboardURL = 'https://tamarcosmetics-co-il-backup.s808.upress.link/app-registration/' // 'https://tamarcosmetics-co-il-backup.s808.upress.link/'

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Dashboard Is connected?", state.isConnected);
            setNetInfo(state.isConnected)
            if (state.isConnected == false) {
                dispatch({
                    type: "MESSAGES_ERR",
                    payload: { code: '', message: "Network not found please try again later." }
                })
                setIsLoading(false)
            }
            else {
                dispatch({
                    type: "MESSAGES_ERR",
                    payload: {}
                })
            }

        });
        return (() => {
            unsubscribe();
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (webViewRef.current) {
                    if (canGoBack) {
                        webViewRef.current.goBack();
                        return true; // Prevent default behavior (exiting the app)
                    }
                }
                return false; // Allow default behavior (exiting the app)
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [canGoBack])
    );
    const onNavigationStateChange = webViewState => {
        console.log('STATE : ', webViewState)
        setCanGoBack(webViewState.canGoBack)
    };

    return (
        <MainView light={true} backgroundColor={headerColor}>
            <View style={{ flex: 1 }}>
                {isLoading &&
                    <ImageBackground source={require('../images/background.png')} style={styles.main_container_transparent}>
                        <View style={styles.container}>
                            <Image source={require('../images/tamarcosmetics.png')} style={Styles.logo_image} />
                            <Image source={require('../images/description.png')} style={{width:width,resizeMode:'contain',}} />
                            <Image source={require('../images/bottomText.png')} style={{width:width,resizeMode:'contain',marginTop:-20}} />
                        </View>
                    </ImageBackground>}
                    <WebView
                        ref={webViewRef}
                        originWhitelist={['*']}
                        source={{ uri: dashboardURL }}
                        style={{ flex: 1 }}
                        onLoad={() => setIsLoading(false)}
                        onNavigationStateChange={onNavigationStateChange}
                        setBuiltInZoomControls={false}

                    // injectedJavaScript={INJECTEDJAVASCRIPT2}
                    // injectedJavaScriptBeforeContentLoaded={INJECTEDJAVASCRIPT} 

                    // javaScriptEnabled={true}
                    // scalesPageToFit={false} // Disable scaling

                    />
            </View>
        </MainView>
    )
}

export default HomeScreen;
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: primaryColor
    },
    main_container_transparent: {
        position:'absolute',
        top:0,
        bottom:0,
        start:0,
        end:0,
        backgroundColor: primaryColor,
        
        zIndex:999,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})