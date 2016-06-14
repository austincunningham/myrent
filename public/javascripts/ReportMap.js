function initialize() 
{
    const mapOptions = 
    {
        center : new google.maps.LatLng(52.254427, -7.185281),
        zoom : 12,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    
    const map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);