$(document).ready(function() {

    //○×の画像
    var $img_maru = $("#img-maru").clone().removeAttr("id");
    var $img_batsu = $("#img-batsu").clone().removeAttr("id");
    //$("#box5").append($img_maru.clone());

    var cnt = 0;

    var myTurn = window.turn; // 先攻or後攻
    $("#title").text($("#title").text() + " (" + ((myTurn == 0) ? "先攻" : "後攻") + ") ")
    var prevStatus = JSON.parse($.ajax({ url: "/get", async: false }).responseText);


    //○×を回転させる処理
    function rotateMaruBatsu($obj) {
        $obj
        .css("rotationCounter", 0)
        .animate(
            { rotationCounter:1 },
            {
                duration: 1000,
                step: function(now){
                    $(this).css("transform", "scale(" + (now*2-1) + "," + 1 + ")");
                    $(this).css("opacity", now);
                },
                complete: function() {
                    //勝ち負け判定(旧)
                    checkWinner();
                    //勝ち負け判定(新)
                    // var result = getWinner();
                    // if (result == true) {
                    //     //勝ち判定
                    //     //alert($(this).attr("checkmark") + "の勝ち");
                    //     alert("maru")
                    //     removeBoxEvent();
                    // } else if (cnt == 9) {
                    //     //引き分け判定
                    //     alert("引き分け");
                    //     removeBoxEvent();
                    // } else {
                    //     setBoxEvent();
                    // }
                }
            }
        );
    }

    // var a = function() {

    // };

    // function test() {

    // }

    // $("#clear").on("click", function() {
    //     location.reload();
    // });

    //全部のマスのイベントを解除する
    function removeBoxEvent() {
        for (var k=1; k<=9; ++k) {
            $("#box" + k).off();
        }
    }

    function setBoxEvent() {
        for (var i=1; i<=9; ++i) {
            (function(i) {
                $("#box" + i).on("click rivalClick", function(e) {
                    if (cnt % 2 == myTurn || e["type"] == "rivalClick") {
                        removeBoxEvent(); //クリックされたらイベントを解除
                        if ($(this).attr("checkmark") != undefined) {
                            alert("すでに選択済みだ馬鹿野郎");
                            setBoxEvent();
                        } else {
                            cnt = cnt + 1;
                            if (cnt % 2 == 0) {
                              $(this).attr("checkmark", "x");
                              var $appendImage = $img_batsu.clone();
                              rotateMaruBatsu($appendImage);
                              $(this).append($appendImage);
                            } else { 
                            $(this).attr("checkmark", "o");
                            var $appendImage = $img_maru.clone();
                              rotateMaruBatsu($appendImage);
                              $(this).append($appendImage);
                            //$(this).append($img_maru.clone());
                            }
                            if (e["type"] == "click") {
                                var x = ((i - 1) / 3) | 0;
                                var y = (i - 1) % 3;
                                $.ajax({ url: "/put/" + x + "/" + y + "/" + (myTurn + 1), async: false });
                                prevStatus[i - 1] = 1;
                            }
                        }
                    }
                });
            })(i);
        }
    }
    //勝ち負け判定(旧)
    function checkWinner() {
        var isWinnerExist = false;
        for (var j=1; j<=7; j+=3) {
            if ($("#box" + j).attr("checkmark") != undefined) {
                if ($("#box" + j).attr("checkmark") == $("#box" + (j+1)).attr("checkmark") && $("#box" + j).attr("checkmark")==$("#box" + (j+2)).attr("checkmark") )
                {
                    alert($("#box" + j).attr("checkmark") + "の勝ち");
                    isWinnerExist = true;
                    removeBoxEvent();
                }
            }
        }
        for (var j=1; j<=3; ++j) {
            if ($("#box" + j).attr("checkmark") != undefined) {
                if ($("#box" + j).attr("checkmark") == $("#box" + (j+3)).attr("checkmark") && $("#box" + j).attr("checkmark") == $("#box" + (j+6)).attr("checkmark"))
                {
                    alert($("#box" + j).attr("checkmark") + "の勝ち！");
                    isWinnerExist = true;
                    removeBoxEvent();
                }
            }
        }
        if ($("#box1").attr("checkmark") != undefined)
        {
            if ($("#box1").attr("checkmark") == $("#box5").attr("checkmark") &&
                $("#box1").attr("checkmark") == $("#box9").attr("checkmark"))
            {
                alert($("#box" + 1).attr("checkmark") + "の勝ち");
                isWinnerExist = true;
                removeBoxEvent();
            }
        }
        if ($("#box3").attr("checkmark") != undefined)
        {
            if ($("#box3").attr("checkmark") == $("#box5").attr("checkmark") &&
                $("#box3").attr("checkmark") == $("#box7").attr("checkmark"))
            {
                alert($("#box" + 3).attr("checkmark") + "の勝ち");
                isWinnerExist = true;
                removeBoxEvent();
            }
        }
        //引き分け・・・cnt = 9のとき
        if (cnt == 9 && isWinnerExist == false)
        {
            alert("引き分け");
            removeBoxEvent();
        } else if(isWinnerExist == false) {
            setBoxEvent();
        }
    }

    //勝ち負け判定(新)
    function getWinner() {
        //横に揃っているかどうかを走査
        var isWinner = true;
        for (var j=1; j<=7; j+=3) {
            if ($("#box" + j).attr("checkmark") != undefined) { //空白かどうかの判定
                if ($("#box" + j).attr("checkmark") == $("box" + (j+1)).attr("checkmark") &&
                    $("#box" + j).attr("checkmark") == $("#box" + (j+2)).attr("checkmark"))
                {
                    return isWinner;
                }
            }
        }
        //縦に揃っているかどうかを走査
        for (var j=1; j<=3; ++j) {
            if ($("#box" + j).attr("checkmark") != undefined) {
                if ($("#box" + j).attr("checkmark") == $("#box" + (j+3)).attr("checkmark") &&
                    $("#box" + j).attr("checkmark") == $("#box" + (j+7)).attr("checkmark"))
                {
                    return isWinner;
                }
            }
        }
        //斜めが揃っているかどうかを走査(右下がり)
        if ($("#box1").attr("checkmark") != undefined)
        {
            if ($("#box1").attr("checkmark") == $("#box5").attr("checkmark") &&
                $("#box1").attr("checkmark") == $("#box9").attr("checkmark"))
            {
                return isWinner;
            }
        }
        //斜めが揃っているかどうかを走査(左下がり)
        if ($("#box3").attr("checkmark") != undefined)
        {
            if ($("#box3").attr("checkmark") == $("#box5").attr("checkmark") &&
                $("#box3").attr("checkmark") == $("#box9").attr("checkmark"))
            {
                return isWinner;
            }
        }
    }

    //$.ajax({ url: "/put/" + x + "/" + y + "/" + (myTurn + 1), async: false });
    //JSON.parse($.ajax({ url: "/get", async: false }).responseText);
    //$.ajax({ url: "/reset", async: false });
    //XMLHttpRequest()
    //var jsonData = JSON.parse($.ajax({ url: "/get", async: false }).responseText);


    //クリアボタンでリロード
    $("#clear").on("click", function() {
        $.ajax({ url: "/reset", async: false });
        location.reload();
    });

    //マスにイベント割り当て
    setBoxEvent();

        // ポーリング
    setInterval(function() {
        var status = JSON.parse($.ajax({ url: "/get", async: false }).responseText);
        for (var i=0; i<9; i++) {
            if (status[i] !== prevStatus[i]) {
                if ($("#box" + (i + 1)).attr("checkmark") == undefined) {
                    $("#box" + (i + 1)).trigger("rivalClick");
                }
                break;
            }
        }
        prevStatus = status;
    }, 1000);


});


