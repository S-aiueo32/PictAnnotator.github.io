<?php
    // get URL hikisu
    if (isset($_GET['msg'])) {
        $postmsg = $_GET['msg'];
    } else {
        $postmsg = 'no message';
    }
    
    if (preg_match('/うんち/',$postmsg)) {
        $postmsg = 'ぶりゅぶりゅ';
    }
    //$user = array();
    $user = array(
	'status' => 'success',
	'result' => $postmsg
	);
    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=UTF-8');
    echo json_encode($user);

    //var_dump($user);
?>

