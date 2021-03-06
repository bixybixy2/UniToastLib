//
// Toast Notifications
//


function showToastNotification(headerID, headerTitle, headerArguments, title, body, iconImagePath, badgeImagePath, heroImagePath, inlineImagePath, buttonName, buttonType, buttonArguments) {
// Original Code
     if (!window.Windows) return Promise.resolve(false);

    var imageUrl = /*window.location.protocol + '//' + window.location.host +*/ heroImagePath;

    // Create ToastNotification as XML Doc
    var toastXml = new Windows.Data.Xml.Dom.XmlDocument();
    toastXml.loadXml(toastNotificationXmlTemplate);

    // 'Hero' Image
    //HeroImage = new ToastGenericHeroImage() 
    //{ Source = imageUrl }

    // Update the background image
    var images = toastXml.getElementsByTagName('image');
        // 'Hero' image on top of notification
    images[0].setAttribute('placement', "hero");
    images[0].setAttribute('src' , imageUrl);
        // Inline image below notification
    images[1].setAttribute('src' , inlineImagePath);
        // Icon image to the left.
    images[2].setAttribute('placement', "appLogoOverride");
    images[2].setAttribute('hint-crop', "circle");
    images[2].setAttribute('src', iconImagePath);
        // Badge image 

    var header = toastXml.getElementsByTagName('header');
    header[0].setAttribute('id', headerID);
    header[0].setAttribute('title', headerTitle); 
    header[0].setAttribute('arguments', headerArguments);
    
    // Set notification texts
    var textNodes = toastXml.getElementsByTagName('text');
    textNodes[0].innerText = title;
    textNodes[1].innerText = body;

    // Set actions
    var actions = toastXml.getElementsByTagName('action');
    actions[0].setAttribute('content', buttonName)
    actions[0].setAttribute('activationType', buttonType)
    actions[0].setAttribute('arguments', buttonArguments)



    // Create a toast notification from the XML, then create a ToastNotifier object to send the toast.
    var toast = new Windows.UI.Notifications.ToastNotification(toastXml);
    Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().show(toast); 
}
 
var toastNotificationXmlTemplate =
`<toast>
    <header id="" title="" arguments=""/>
        <visual>
        <binding template="ToastGeneric">
            <text hint-maxLines="1"></text>
            <text></text>
            <image placement="" src=""/>
            <image src=""/>
            <image placement="" hint-crop="" src=""/>
        </binding>
        </visual>
        <actions>
        <action/>
        
        </actions>
</toast>`;
 
// Toast Function to switch between web & app

function uniToast(headerID, headerTitle, headerArguments, title, body, iconImagePath, badgeImagePath, heroImagePath, inlineImagePath, buttonName, buttonType, buttonArguments) {
    if (window.Windows) {
showToastNotification(headerID, headerTitle, headerArguments, title, body, iconImagePath, badgeImagePath, heroImagePath, inlineImagePath, buttonName, buttonType, buttonArguments)
    } else {
        var options = {body: body, image: heroImagePath}
        var notification = new Notification (title, options)
    }
}

//
// Tile Creation
//

function createTile(text, durationSeconds) {
    var notifications = Windows.UI.Notifications;
    var template = notifications.TileTemplateType.tileWideImageAndText01;
    var tileXml = notifications.TileUpdateManager.getTemplateContent(template);

    var tileTextAttributes = tileXml.getElementsByTagName("text");
    tileTextAttributes[0].appendChild(tileXml.createTextNode(text));

    var tileImage = tileXml.getElementsByTagName("image");
 
    tileImage[0].attributes['src'] = tileImage;

    var tileNotification = new notifications.TileNotification(tileXml);
    var currentTime = new Date();
    tileNotification.expirationTime = new Date(currentTime.getTime() + durationSeconds * 1000);
    notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
}

document.addEventListener("DOMContentLoaded", createTile, false);