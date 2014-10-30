$(document).ready(function() {

    //○×の画像
    var $img_maru = $("#img-maru").clone().removeAttr("id");
    var $img_batsu = $("#img-batsu").clone().removeAttr("id");
    //$("#box5").append($img_maru.clone());

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
                    $(this).css("rotationCounter", 0);
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

    var cnt = 0;

    for (var i=1; i<=9; ++i) {
        (function(i) {
            $("#box" + i).on("click", function() {
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
                //揃っているかどうかの判定処理
                //勝ち負け・・・入力のたびにチェック
                
                var isWinnerExist = false;

                for (var j=1; j<=7; j+=3) {
                    if ($("#box" + j).attr("checkmark") != undefined) {
                        if ($("#box" + j).attr("checkmark") == $("#box" + (j+1)).attr("checkmark") && $("#box" + j).attr("checkmark")==$("#box" + (j+2)).attr("checkmark") ) 
                        {
                            alert($("#box" + j).attr("checkmark") + "の勝ち");
                            isWinnerExist = true;
                            for (var k=1; k<=9; ++k) {
                                $("#box" + k).off();
                            }
                        }
                    }
                }
                for (var j=1; j<=3; ++j) {
                    if ($("#box" + j).attr("checkmark") != undefined) {
                        if ($("#box" + j).attr("checkmark") == $("#box" + (j+3)).attr("checkmark") && $("#box" + j).attr("checkmark") == $("#box" + (j+6)).attr("checkmark"))
                        {
                            alert($("#box" + j).attr("checkmark") + "の勝ち！");
                            isWinnerExist = true;
                            for (var k=1; k<=9; ++k) {
                                $("#box" + k).off();
                            }
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
                        for (var k=1; k<=9; ++k) {
                            $("#box" + k).off();
                        }
                    }
                }
                if ($("#box3").attr("checkmark") != undefined) 
                {
                    if ($("#box3").attr("checkmark") == $("#box5").attr("checkmark") && 
                        $("#box3").attr("checkmark") == $("#box7").attr("checkmark")) 
                    {
                        alert($("#box" + 3).attr("checkmark") + "の勝ち");
                        isWinnerExist = true;
                        for (var k=1; k<=9; ++k) {
                            $("#box" + k).off();
                        }
                    }
                }
                //引き分け・・・cnt = 9のとき
                if (cnt == 9 && isWinnerExist == false)
                {
                    alert("引き分け");
                    for (var k=1; k<=9; ++k) {
                        $("#box" + k).off();
                    }
                }

            });
        })(i);
    }
});


