import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

export const MainView = (props) => {

    function FocusAwareStatusBar(props) {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar {...props} /> : null;
    }

    const statusbar = <FocusAwareStatusBar backgroundColor={props.backgroundColor ? props.backgroundColor : 'transparent'} barStyle={props.light == true ? "light-content" : "dark-content"} translucent={props.backgroundColor ? false : true} />
    return (
        <View style={{ flex: 1 }}>
            {props.backgroundColor ? <SafeAreaView {...props} >{statusbar}</SafeAreaView> : statusbar}
            <View style={{ flex: 1, backgroundColor: props.screenColor ? props.screenColor : 'white' }}>
                {props.children}
            </View>
        </View>
    )
}