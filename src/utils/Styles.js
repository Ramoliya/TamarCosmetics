import { StyleSheet } from "react-native";
import { width } from "./Constants";


export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    logo_image: {
        width: width - 100,
        height: width - 100,
        resizeMode: 'contain'
    },
});