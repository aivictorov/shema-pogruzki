<?php

$project_name = "shema-pogruzki.ru";
$admin_email = "aivictorov@yandex.ru";
$email_from = "info@shema-pogruzki.ru";
$form_subject = 'Заявка с сайта';
$message = "";

print_r($_FILES);

foreach ($_POST as $key => $value) {
	if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "email_from" && $key != 'g-recaptcha-response') {
		$message .= $key . " " . $value . "<br>";
	};
}

function adopt($text)
{
	return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

$headers =
	"MIME-Version: 1.0" . PHP_EOL .
	"Content-Type: text/html; charset=utf-8" . PHP_EOL .
	// "Content-Type: multipart/form-data; charset=utf-8" . PHP_EOL .
	'From: ' . adopt($project_name) . ' <' . $email_from . '>' . PHP_EOL .
	'Reply-To: ' . $admin_email . '' . PHP_EOL;


$secret = '6LcXOZkpAAAAAEOdaE7jlHtaKWIvoavt_0IekIwR';

if (!empty($_POST['g-recaptcha-response'])) {
	$out = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
	$out = json_decode($out);
	if ($out->success == true) {
		$result = mail($admin_email, $form_subject, $message, $headers);
	} else {
		echo 'Ошибка заполнения капчи.';
	}
}

if ($result == true) {
	echo 'Спасибо! Мы свяжемся с вами в ближайшее время.';
} else {
	echo 'Извините, письмо не отправлено. Попробуйте еще раз.';
};




