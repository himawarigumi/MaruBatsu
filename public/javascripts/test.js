$(document).ready(function() {

    //○×の画像
    var $img_maru = $("#img-maru").clone().removeAttr("id");
    var $img_batsu = $("#img-batsu").clone().removeAttr("id");
    //$("#box5").append($img_maru.clone());

    var cnt = 0;

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
                    //勝ち負け判定
                    checkWinner();
                }
            }
        );
    }

    // var a = function() {

    // };

    // function test() {

    // }

    $("#clear").on("click", function() {
        location.reload();
    });
    setBoxEvent();

    //全部のマスのイベントを解除する
    function removeBoxEvent() {
        for (var k=1; k<=9; ++k) {
            $("#box" + k).off();
        }
    }

    function setBoxEvent() {
        for (var i=1; i<=9; ++i) {
            (function(i) {
                $("#box" + i).on("click", function() {
                    removeBoxEvent(); //クリックされたらイベントを解除
                    if ($(this).attr("checkmark") != undefined) {
                        alert("すでに選択済みだ馬鹿野郎");
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
                    }
                });
            })(i);
        }
    }
    //勝ち負け判定
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
});


