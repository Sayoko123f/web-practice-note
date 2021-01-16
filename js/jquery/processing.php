<?php
	echo json_encode(
		array(
			"fullname" => $_POST['fullname'],
			"password" => $_POST['password'],
			"gender" => $_POST['gender'],
			"grade" => $_POST['grade'])
		,JSON_UNESCAPED_UNICODE);
?>
