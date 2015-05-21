function runScript(e) {
    if (e.keyCode === 13) {
        var tb = document.getElementById("tbNotes");
        //process
        var pnl = document.getElementById("pnlNotes");
        //pnl.value += tb.value;
        var text = tb.value;
        var posChange = false;
        if (text.charAt(0) === '/' && text.charAt(text.length - 1) === '/') {
            //rewind if - number
            //forward if + number
            var inside = text.substring(1, text.length - 1);
            var rewind = TryParseInt(inside, null);
            if (rewind) {
                //var ytplayer = document.getElementById('player');
                //ytplayer.seekTo(ytplayer.getCurrentTime() + rewind);
                player.seekTo(player.getCurrentTime() + rewind);
                posChange = true;
            }
        }
        if (!posChange) {
            $("#pnlNotes").append('<br/>' + tb.value);
        }
        tb.value = '';
        return false;
    }
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