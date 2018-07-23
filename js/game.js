function setGameType() {
    // TODO: ...
    // Set game type, make AI logic fo Pl vs PC
}

function play(fPlayer, sPlayer) {
    let firstPlayer = { "name": fPlayer, "score": 0 };
    let secondPlayer = { "name": sPlayer, "score": 0 };
    let move;
    initGame(firstPlayer, secondPlayer);

    function initGame(firstPlayer, secondPlayer) {
        let board = $("#board");
        let fPlayerTd = $("<td>").attr("id", "firstPlayer").text(`${firstPlayer.name} ${firstPlayer.score}т.`);
        let sPlayerTd = $("<td>").attr("id", "secondPlayer").text(`${secondPlayer.name} ${secondPlayer.score}т.`);
        let table = $("<table>").attr("id", "players").addClass("players").append($("<tr>").append(fPlayerTd).append(sPlayerTd));
        board.append(table);

        let boardTable = $("<table id='boardTable'>");
        for (let i = 0; i < 3; i++) {
            let tr = ($("<tr>"));
            for (let j = 0; j < 3; j++) {
                tr.append($("<td>").addClass("boardTd").attr("clicked", "false"));
            }
            boardTable.append(tr);
        }
        board.append(boardTable);

        move = true;
        let moves = 0;

        $("td").on("click", function () {
            let td = $(this);

            if (td.attr("clicked") === "false") {
                let sign = "";

                if (move) {
                    td.text("X").addClass("x");
                    sign = "X";
                }
                else {
                    td.text("O").addClass("o");
                    sign = "O";
                }

                move = !move;
                moves++;
                checkWin(sign, moves);

                td.attr("clicked", "true");
                td.css("cursor", "default");
            }
        });
    }

    function checkWin(sign, moves) {
        let cells = $("#boardTable td");

        for (let i = 0; i < 7; i += 3) {
            if ($(cells[i]).text() === sign &&
                    $(cells[i + 1]).text() === sign &&
                    $(cells[i + 2]).text() === sign) {
                renderWin(false, sign, [$(cells[i]), $(cells[i + 1]), $(cells[i + 2])]);
                return;
            }
        }

        for (let i = 0; i < 3; i++) {
            if ($(cells[i]).text() === sign &&
                $(cells[i + 3]).text() === sign &&
                $(cells[i + 6]).text() === sign) {
                renderWin(false, sign, [$(cells[i]), $(cells[i + 3]), $(cells[i + 6])]);
                return;
            }
        }

        for (let i = 0; i < 3; i += 2) {
            if ($(cells[i]).text() === sign &&
                $(cells[4]).text() === sign &&
                $(cells[8 - i]).text() === sign) {
                renderWin(false, sign, [$(cells[i]), $(cells[4]), $(cells[8 - i])]);
                return;
            }
        }

        if (moves === 9) {
            renderWin(true);
        }
    }

    function renderWin(remi, sign, cells) {
        if (!remi) {
            for (let cell of cells) {
                cell.addClass("winCell");
            }
        }

        let boardTr = $("#boardTable tr");
        setTimeout(function () {
            boardTr.remove();
            endGame();
        }, 1500);

        function endGame() {
            let text = "";
            if (remi) {
                text += "Равенство!";
            }
            else {
                text += "Победител е ";

                if (sign === "X") {
                    text += firstPlayer.name;
                    firstPlayer.score++;
                    $("#firstPlayer").text(`${firstPlayer.name} ${firstPlayer.score}т.`);
                }
                else {
                    text += secondPlayer.name;
                    secondPlayer.score++;
                    $("#secondPlayer").text(`${secondPlayer.name} ${secondPlayer.score}т.`);
                }

                text += "!";
            }

            let boardTable = $("#boardTable");
            boardTable.append($("<tr>").append($("<td>").append($("<div>").text(text))));
            let newGame = $("<button>").text("Нова игра");
            let cancel = $("<button>").text("Отказ");
            boardTable.append($("<tr>").append($("<td>").append(newGame).append($("<span>").text("\t")).append(cancel)));

            newGame.on("click", function () {
                $("#players").remove();
                boardTable.remove();
                initGame(firstPlayer, secondPlayer);
            });

            cancel.on("click", function () {
                $("#players").remove();
                boardTable.remove();
                initBoard();
            });
        }
    }
}