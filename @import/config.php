<?php
	# display error
	if($_SERVER['REMOTE_ADDR'] === '::1'){
		ini_set('display_errors','On');
		error_reporting(E_ALL);
	}else{
		error_reporting(0);
	}

	# basic functions
	function redirect($page){
		header('Location: '.$page);
		die;
	}
	function error($code){
		$_SERVER['REDIRECT_STATUS'] = $code;
		require __DIR__.'/../error.php';
		die;
	}
	function is_valid_path($path){
		return preg_match('/^[a-z0-9_-]+$/s', $path);
	}
	function secure_escape($value){
		return htmlentities($value, ENT_QUOTES, 'UTF-8');
	}