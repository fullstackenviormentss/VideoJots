/// <reference path="jquery.d.ts" />
var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h3>" + this.greeting + "</h3>";
    };
    return Greeter;
})();

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText();
}

//document.getElementById("body").innerHTML = httpGet("http://www.youtube.com/api/timedtext?v=V6Tsrg_EQMw&lang=en");
//var users = xml.getElementsByTagName("text");
//for(var i = 0; i < users.length; i++) {
//    var user = users[i];
//    //alert(user.childNodes[0].nodeValue);
//}
$(document).ready(function () {
    var request = new XMLHttpRequest();
    request.open("GET", "http://www.youtube.com/api/timedtext?v=-jcXpJpB_3A&lang=en", false);
    request.send();
    var xml = request.responseXML;
    var xmlDoc = $.parseXML(xml.toString());
    var $xml = $(xmlDoc);
    var $Name = $xml.find('text');
    alert($Name);
});
//# sourceMappingURL=main.js.map
