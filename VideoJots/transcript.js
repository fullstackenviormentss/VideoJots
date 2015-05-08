/// <reference path="jquery.d.ts" />
/// <reference path="collections.ts" />
/// <reference path="youtube.d.ts" />
/// <reference path="node.d.ts" />
var Transcript = (function () {
    function Transcript(videoid) {
        this.videoid = videoid;
        var request = new XMLHttpRequest();
        request.open("GET", "http://www.youtube.com/api/timedtext?v=" + videoid + "&lang=en", false);
        request.send();
        var xml = request.responseXML;
        this.minuteText = [];
        var dict = {};
        var $Name = $(xml).find('text').each(function (i) {
            var strMinute = $(this).attr("start");
            var minute = Math.floor(parseFloat(strMinute) / 60);
            var text = $(this).text();
            if (!(minute in dict)) {
                dict[minute] = text;
            } else {
                dict[minute] = dict[minute] + ' ' + text;
            }
        });
        for (var key in dict) {
            this.minuteText[key] = dict[key];
        }
    }
    return Transcript;
})();

function captureForm() {
    var videoid = document.getElementById('tbVideoID').value;
    var transcript = new Transcript(videoid);
    var fullTranscript = '';
    var i;
    document.getElementById('divTranscript').innerHTML = '';
    for (i = 0; i < transcript.minuteText.length; i++) {
        var element = document.createElement('a');
        element.href = '#';
        element.onclick = function () {
            seekVideoPos(this.id);
            return false;
        };
        element.id = i.toString();
        element.innerHTML = 'Minute ' + i;
        var transcriptElement = document.createElement('div');
        transcriptElement.appendChild(element);
        var spanElement = document.createElement('span');
        spanElement.innerHTML = '<br/><br/>' + transcript.minuteText[i] + '<br/><br/>';
        transcriptElement.appendChild(spanElement);

        //fullTranscript += '<br/><br/><a id=minute' + i + ' href="#" onclick="player.seekTo('+(i * 60)+');return false;">Minute ' + i + '</a><br/><br/>' + transcript.minuteText[i];
        document.getElementById('divTranscript').appendChild(transcriptElement);
    }

    //document.getElementById('divTranscript').innerHTML = fullTranscript;
    player.loadVideoById(videoid);
}
;

function seekVideoPos(id) {
    player.seekTo(id * 60);
}
//# sourceMappingURL=transcript.js.map
