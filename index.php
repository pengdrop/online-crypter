<?php
	require __DIR__.'/@import/config.php';

	# parse url
	$link = $_SERVER['REQUEST_URI'];
	$param_index = strrpos($link, '?');
	if($param_index !== false){
		$link = substr($link, 0, $param_index);
	}
	$argv = explode('/', strtolower($link));
	$argc = count($argv);

	# show page
	switch($argv[1]){
	case '':
		if($argc !== 2) break;
		require __DIR__.'/@import/home.php';
		die;

	}

	//error(404);
	header("Location: /#!/");
	die;