$(function() {
    window.tagArray = [];
});

function runScript(e) {
    if (e.keyCode === 13) {
        var tb = document.getElementById("tbNotes");
        //process
        var pnl = document.getElementById("pnlNotes");
        //pnl.value += tb.value;
        var text = tb.value;
        var doNotDisplay = false;
        if (text === '//') {
            //pop last tag from array
            window.tagArray.remove(window.tagArray.length - 1);
            doNotDisplay = true;
            displayTagArray();
        } else if (text === '/p/') {
            player.pauseVideo();
            doNotDisplay = true;
        }
            else if (text === '/r/') {
                player.playVideo();
                doNotDisplay = true;
        }
        else {
            if (text.charAt(0) === '/' && text.charAt(text.length - 1) === '/') {
                //rewind if - number
                //forward if + number
                var inside = text.substring(1, text.length - 1);
                var rewind = TryParseInt(inside, null);
                if (rewind) {
                    //var ytplayer = document.getElementById('player');
                    //ytplayer.seekTo(ytplayer.getCurrentTime() + rewind);
                    player.seekTo(player.getCurrentTime() + rewind);
                    doNotDisplay = true;
                } else {
                    window.tagArray.push(inside);
                    displayTagArray();
                }
            }
        }
        if (!doNotDisplay) {
            $("#pnlNotes").append('<br/>' + tb.value);
        }
        tb.value = '';
        return false;
    }
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function displayTagArray() {
    $("#tagArray").html('');
    $.each(window.tagArray, function(index, value) {
        $("#tagArray").append(value+'<br/>');
    });
}

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}