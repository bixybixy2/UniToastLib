function showToastNotification(title, body, imagePath) {
    
// Test Code    
    /*
    var notifications = Windows.UI.Notifications;

    // Get the toast notification manager for the current app.
    var notificationManager = notifications.ToastNotificationManager;
    
    // The getTemplateContent method returns a Windows.Data.Xml.Dom.XmlDocument object
    // that contains the toast notification XML content.
    var template = notifications.toastTemplateType.toastImageAndText01;
    var toastXml = notificationManager.getTemplateContent(notifications.ToastTemplateType[template]);
    
    // You can use the methods from the XML document to specify the required elements for the toast.
    var images = toastXml.getElementsByTagName("image");
    images[0].setAttribute("src", imageURL, "placement", imageURl);
    
    var textNodes = toastXml.getElementsByTagName("text");
    textNodes.forEach(function (value, index) {
        var textNumber = index + 1;
        var text = "";
        for (var j = 0; j < 10; j++) {
            text += "Text input " + textNumber + " ";
            //@static_cast(String)
        }
        value.appendChild(toastXml.createTextNode(text)); 
    });
    
    // Create a toast notification from the XML, then create a ToastNotifier object
    // to send the toast.
    var toast = new notifications.ToastNotification(toastXml);
    
    notificationManager.createToastNotifier().show(toast); */


// Original Code
     if (!window.Windows) return Promise.resolve(false);

    var imageUrl = window.location.protocol + '//' + window.location.host + imagePath;

    // Create ToastNotification as XML Doc
    var toastXml = new Windows.Data.Xml.Dom.XmlDocument();
    toastXml.loadXml(toastNotificationXmlTemplate);

    // 'Hero' Image
    //HeroImage = new ToastGenericHeroImage() 
    //{ Source = imageUrl }

    // Update the background image
    var images = toastXml.getElementsByTagName('image');
    //images[0].setAttribute('placement', "Hero");
    images[0].setAttribute('src' = imageUrl, 'placement' = "Hero");

    // Set notification texts
    var textNodes = toastXml.getElementsByTagName('text');
    textNodes[0].innerText = title;
    textNodes[1].innerText = body;

    // Create a toast notification from the XML, then create a ToastNotifier object to send the toast.
    var toast = new Windows.UI.Notifications.ToastNotification(toastXml);
    Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().show(toast); 
}
 
var toastNotificationXmlTemplate =
`<toast>
    <visual>
        <binding template="ToastGeneric">
            <text hint-maxLines="1"></text>
            <text></text>
            <image placement="" src=""/>
            <script type="text/javascript">appToastButton();</script>
        </binding>
    </visual>
</toast>`;

//var toastNotificationXmlTemplate =
//`<toast>
//    <visual>
//        <binding template="ToastGeneric">
//            <text hint-maxLines="1"></text>
//            <text></text>
//            <image placement="" src=""/>
//            <script type="text/javascript">appToastButton();</script>
//        </binding>
//    </visual>
//</toast>`;

//
//
//

function uniToast(title, body, imagePath) {
    if (window.Windows) {
showToastNotification(title, body, imagePath)
    } else {
        var options = {body: body, image: imagePath}
        var notification = new Notification (title, options)
    }
}