<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';


$user = new User();
$link = strval($_POST['loginCode']) . '.json';
$linka ='./log_session/' . $link;
$linkb ='../book/log_session/' . $link;
$linkd ='../buy_log/log_session/' . $link;
$linke ='../receive/log_session/' . $link;
$account = $_POST['email'];
unlink($linka);
unlink($linkb);
unlink($linkd);
unlink($linke);
if ($user->logout($account)){
    header('Location: ' . CLIENT_URL, true, 301);
}


