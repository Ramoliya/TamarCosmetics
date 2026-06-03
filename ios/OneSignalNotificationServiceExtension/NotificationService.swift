//
//  NotificationService.swift
//  OneSignalNotificationServiceExtension
//
//  Created by ios on 26/06/25.
//

import UserNotifications
import OneSignalExtension

class NotificationService: UNNotificationServiceExtension{

    var contentHandler: ((UNNotificationContent) -> Void)?
    var receivedRequest: UNNotificationRequest!
    var bestAttemptContent: UNMutableNotificationContent?

//    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
//        self.contentHandler = contentHandler
//        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
//        
//        if let bestAttemptContent = bestAttemptContent {
//            // Modify the notification content here...
//            bestAttemptContent.title = "\(bestAttemptContent.title) [modified]"
//            
//            contentHandler(bestAttemptContent)
//        }
//    }
//  
  
  override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.receivedRequest = request
        self.contentHandler = contentHandler
        self.bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

        if let bestAttemptContent = bestAttemptContent {
            // Optional: Add debug log here if needed
            // print("Running OneSignal Notification Extension")

            // Forward to OneSignal
            OneSignalExtension.didReceiveNotificationExtensionRequest(
                self.receivedRequest,
                with: bestAttemptContent,
                withContentHandler: self.contentHandler
            )
        }
    }
    
//    override func serviceExtensionTimeWillExpire() {
//        // Called just before the extension will be terminated by the system.
//        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
//        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
//            contentHandler(bestAttemptContent)
//        }
//    }
  
  override func serviceExtensionTimeWillExpire() {
          // If extension is about to expire, call OneSignal's timeout handler
          if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
              OneSignalExtension.serviceExtensionTimeWillExpireRequest(
                  self.receivedRequest,
                  with: self.bestAttemptContent
              )
              contentHandler(bestAttemptContent)
          }
      }

}
