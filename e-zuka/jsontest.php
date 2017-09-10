<?php
    // get URL hikisu
    if (isset($_GET['msg'])) {
        $postmsg = ''.$_GET['msg'];
    } else {
        $postmsg = '<p class="txt">no message</p>';
    }

    // タグ・クラス忘れずに
    if (preg_match('/うんち/',$postmsg) or preg_match('/💩/',$postmsg)) {
        $postmsg = '<p class="txt">ぶりゅぶりゅ</p>';
    }
    if (preg_match('/梨汁/',$postmsg)) {
        $postmsg = '<p class="txt">ぶシャー！</p>';
    }
    if (preg_match('/画像/',$postmsg)) {
        $postmsg = '<img class="photo" src="../images/42.jpg"></img>';
    }
    //$user = array();
    $user = array(
	'status' => 'success',
    'type' => 'none',
	'result' => $postmsg
	);
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=UTF-8');
    echo json_encode($user);

    //var_dump($user);
?>
