$(function(){
const child_process = require('child_process');
const fs = require('fs');
const regedit = require('regedit');
const axios = require('axios');
regedit.setExternalVBSLocation('resources/regedit/vbs')
var DIR_FiveM = "";
var IPServer = "localhost"

axios.get('http://165.227.163.21:30120/dynamic.json')
.then(function (response) {
  //console.log(response);
  //console.log(response.data.clients);
  document.getElementById("apiPlayers").innerHTML = response.data.clients;
  document.getElementById("apiMaxClients").innerHTML = response.data.sv_maxclients;
})
.catch(function (error) {
  console.log(error);
  document.getElementById("apiStatus").innerHTML = "Offline";
  document.getElementById("apiStatus").style = "color: red;";
})
.then(function () {
  // always executed
});

axios.get('http://165.227.163.21:30120/players.json')
.then(function (response) {
  console.log(response);
  var i;
    for (i = 0; i < response.data.length; i++) {
        $( "table" ).append( '<tr><th>'+response.data[i].id+'</th><th>'+response.data[i].name+'</th><th>'+response.data[i].ping+'</th></tr>' );
    }
})
.catch(function (error) {
  console.log(error);
  document.getElementById("apiStatus").innerHTML = "Offline";
  document.getElementById("apiStatus").style = "color: red;";
})
.then(function () {
  // always executed
});

//Get Directory FiveM
regedit.list("HKCU\\SOFTWARE\\CitizenFX\\FiveM\\", function(err, result) {
    $.each(result, function(index, data) {
        if (data.values["Last Run Location"].value) {
            DIR_FiveM = data.values["Last Run Location"].value;
            if (fs.existsSync(DIR_FiveM)) {
                console.log("FiveM is Installed.")
            } else {
                console.log("You haven't installed FiveM.")
            }
            return;
        }
    });
});

function cmd(cmd, args, cb) {
    var child = child_process.spawn(cmd, args, {
        encoding: 'utf8',
        shell: true
    });
    child.on('error', (error) => {
        console.log(error);
    });
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        data = data.toString();
        console.log(data);
    });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        data = data.toString();
        console.log(data);
    });
    child.on('close', (code) => {
        switch (code) {
            case 0:
                console.log('End.')
                break;
        }
    });
    if (typeof cb === 'function')
        cb();
}

$( "#btnPlay" ).click(function() {
    $('.progress-bar').animate(
        {width:'100%'},
        {
            duration:3000,
            start: function() {
                $("#btnPlay").text("Loading...");
            },
            done: function() {
                $("#btnPlay").text("Play");
                if (fs.existsSync(DIR_FiveM)) {
                    var dir_replace = DIR_FiveM.replace("FiveM.app\\", "");
                    cmd(`${dir_replace}FiveM.exe`, [`fivem://connect/${IPServer}`], null);
                }
            }
        }
    );
});

const remote = require('electron').remote;

const shell = require('electron').shell;

// assuming $ is jQuery
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

$( "#minimizeBtn" ).click(function() {
    var window = remote.getCurrentWindow();
    window.minimize();
    child_process.execSync('start http://example.com')
});

$( "#closeBtn" ).click(function() {
    var window = remote.getCurrentWindow();
    window.close();
});

});