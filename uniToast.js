function showToastNotification(title, body, imagePath) {
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
    images[0].setAttribute('src', imageUrl);

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