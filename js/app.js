//players.json dynamic.json
var showingGames = false;

$( "#gamemode" ).click(function() {
    if (showingGames == false) {
        $("#gtav").css("bottom", "260px");
        $("#rdr").css("bottom", "180px");
        $("#rust").css("bottom", "100px");
        showingGames = true;
    } else {
        $("#gtav").css("bottom", "0px");
        $("#rdr").css("bottom", "0px");
        $("#rust").css("bottom", "0px");
        showingGames = false;
    }
});

$("#gtav").click(function() {
    $("#main-gtav").show();
    $("#main-rdr").hide();
    $("#main-rust").hide();
    $("#selectedGame").attr("src","./gtav.svg");
});

$("#rdr").click(function() {
    $("#main-gtav").hide();
    $("#main-rdr").show();
    $("#main-rust").hide();
    $("#selectedGame").attr("src","./rdr.svg");
});

$("#rust").click(function() {
    $("#main-gtav").hide();
    $("#main-rdr").hide();
    $("#main-rust").show();
    $("#selectedGame").attr("src","./rust.svg");
});