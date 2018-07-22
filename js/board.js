function initBoard() {
    let board = $("#board");
    let h1 = $("<h1>").text("JS Sea Chess");
    board.append(h1);
    let label1 = $("<label>").attr("for", "firstPlayer").text("Играч 1: ");
    board.append(label1);
    let input1 = $("<input>").attr("type", "text").attr("id", "firstPlayer");
    board.append(input1);
    board.append($("<br>"));
    let label2 = $("<label>").attr("for", "secondPlayer").text("Играч 2: ");
    board.append(label2);
    let input2 = $("<input>").attr("type", "text").attr("id", "secondPlayer");
    board.append(input2);
    board.append($("<br>"));
    let radio1 = $("<input>").attr("type", "radio").attr("id", "game1").attr("name", "ganeType").attr("checked", "true");
    board.append(radio1);
    let labelRadio1 = $("<label>").attr("for", "game1").html("Играч срещу играч<br>Играч 1 ще играе с \"X\", а играч 2 с \"O\".");
    board.append(labelRadio1);
    board.append($("<span>").text(""));
    board.append(("<br>"));
    let radio2 = $("<input>").attr("type", "radio").attr("id", "game2").attr("name", "ganeType").attr("disabled", "true");
    board.append(radio2);
    let labelRadio2 = $("<label>").attr("for", "game2").attr("disabled", "true").text("Играч срещу компютър (Coming soon)");
    board.append(labelRadio2);
    board.append($("<br><br>"));
    let button = $("<button>").attr("id", "playButton").text("Играй!");
    board.append(button);
    board.append($("<br><br>"));
    board.append($("<div>").addClass("error").attr("id", "error"));

    button.on("click", function () {
        if (input1.val() === "" || input2.val() === "") {
            $("#error").attr("style", "display: block").text("Трябва да въведете имената и на двамата играчи!");
        }
        else {
            emptyDiv();
            play(input1.val(), input2.val());
        }
    })
}

function emptyDiv() {
    $("#board *").remove();
}