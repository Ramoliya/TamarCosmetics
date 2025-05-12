import { PermissionsAndroid, Platform } from 'react-native'

export default PermissionMethods = {

    requestNotificationPermission: async () => {

        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                );
                console.log('Notification Permissions granted : ', granted)
            }
            //const result = await NotificationManager.areNotificationsEnabled()
            // console.log('Notification Permissions : ',result )

            return true
        } else return true
    },
}





