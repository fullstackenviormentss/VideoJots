$(function() {
    window.tagArray = [];
    window.textSource = '';
});

function loadVideo(e) {
    if (e.keyCode === 13) {
        loadVideoURL();
        return false;
    }
}

function loadVideoURL() {
    var tb = document.getElementById("tbURL");
    var videoid = tb.value.split('v=')[1].split('&')[0];
    player.loadVideoById(videoid);
    clearPage();
}

function clearPage() {
    $("#pnlNotes").html('');
    $("#txtSource").text('');
    $("#tbNotes").html('');
}

function convertSourceToOutput(sourceText)
{
    
}

function keyUpEvent(e) {
    var tb = document.getElementById("tbNotes");
    var text = tb.value;
    if (text === '/p/') {
        $("#spnAlert").text('Pause');
    }
    else if (text === '/r/') {
        $("#spnAlert").text('Resume');
    } else if (text.charAt(0) === '/' && text.charAt(text.length - 1) === '/') {
            //rewind if - number
            //forward if + number
            var inside = text.substring(1, text.length - 1);
            var rewind = TryParseInt(inside, null);
            if (rewind) {
                if (rewind > 0) {
                    $("#spnAlert").text('Forward ' + rewind + ' seconds');
                } else {
                    $("#spnAlert").text('Back ' + Math.abs(rewind) + ' seconds');
                }
            } 
        }
    else {
        $("#spnAlert").text('');
    }
    return false;
}

function addToSource(text) {
    window.textSource += '{|' + text + '|}';
    $("#txtSource").text(window.textSource);
}

function keyPressEvent(e) {
    var tb = document.getElementById("tbNotes");
    var text = tb.value;
    
    if (e.keyCode === 13) {
        
        //process
        var pnl = document.getElementById("pnlNotes");
        //pnl.value += tb.value;
        
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

$(function () {
    function Menu(cutLabel, copyLabel, pasteLabel) {
        var gui = require('nw.gui')
          , menu = new gui.Menu()

          , cut = new gui.MenuItem({
              label: cutLabel || "Cut"
            , click: function () {
                document.execCommand("cut");
                console.log('Menu:', 'cutted to clipboard');
            }
          })

          , copy = new gui.MenuItem({
              label: copyLabel || "Copy"
            , click: function () {
                document.execCommand("copy");
                console.log('Menu:', 'copied to clipboard');
            }
          })

          , paste = new gui.MenuItem({
              label: pasteLabel || "Paste"
            , click: function () {
                document.execCommand("paste");
                console.log('Menu:', 'pasted to textarea');
            }
          })
        ;

        menu.append(cut);
        menu.append(copy);
        menu.append(paste);

        return menu;
    }

    var menu = new Menu(/* pass cut, copy, paste labels if you need i18n*/);
    $(document).on("contextmenu", function (e) {
        e.preventDefault();
        menu.popup(e.originalEvent.x, e.originalEvent.y);
    });
});