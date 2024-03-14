<?php

// Работает!!! Отпарвляет файл!

$project_name = "shema";
$admin_email = "aivictorov@yandex.ru";
$email_from = "info@shema-pogruzki.ru";
$form_subject = 'Заявка с сайта';
$message = "";

// print_r($_FILES);
// print_r($_FILES["file"]["name"]);

function adopt($text)
{
	return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

function sendMailAttachment($mailTo, $From, $subject_text, $message)
{
	$to = $mailTo;

	$EOL = "\r\n"; // ограничитель строк, некоторые почтовые сервера требуют \n - подобрать опытным путём
	$boundary     = "--" . md5(uniqid(time()));  // любая строка, которой не будет ниже в потоке данных. 

	$subject = '=?utf-8?B?' . base64_encode($subject_text) . '?=';

	$headers    = "MIME-Version: 1.0;$EOL";
	$headers   .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL";
	$headers   .= "From: $From\nReply-To: $From\n";

	$multipart  = "--$boundary$EOL";
	$multipart .= "Content-Type: text/html; charset=utf-8$EOL";
	$multipart .= "Content-Transfer-Encoding: base64$EOL";
	$multipart .= $EOL; // раздел между заголовками и телом html-части 
	$multipart .= chunk_split(base64_encode($message));

	#начало вставки файлов
	$filename = $_FILES["file"]["tmp_name"];
	$file = fopen($filename, "rb");
	$data = fread($file,  filesize($filename));
	fclose($file);
	$NameFile = $_FILES["file"]["name"]; // в этой переменной надо сформировать имя файла (без всякого пути);
	$File = $data;
	$multipart .=  "$EOL--$boundary$EOL";
	$multipart .= "Content-Type: application/octet-stream; name=\"$NameFile\"$EOL";
	$multipart .= "Content-Transfer-Encoding: base64$EOL";
	$multipart .= "Content-Disposition: attachment; filename=\"$NameFile\"$EOL";
	$multipart .= $EOL; // раздел между заголовками и телом прикрепленного файла 
	$multipart .= chunk_split(base64_encode($File));
	#>>конец вставки файлов

	$multipart .= "$EOL--$boundary--$EOL";

	if (!mail($to, $subject, $multipart, $headers)) {
		return false;
	} else {
		return true;
	};
};

foreach ($_POST as $key => $value) {
	if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "email_from" && $key != 'g-recaptcha-response' && $key != "file") {
		$message .= $key . " " . $value . "<br>";
	};
}



// $headers =
// 	"MIME-Version: 1.0" . PHP_EOL .
// 	"Content-Type: text/html; charset=utf-8" . PHP_EOL .
// 	// "Content-Type: multipart/form-data; charset=utf-8" . PHP_EOL .
// 	'From: ' . adopt($project_name) . ' <' . $email_from . '>' . PHP_EOL .
// 	'Reply-To: ' . $admin_email . '' . PHP_EOL;


$secret = '6LcXOZkpAAAAAEOdaE7jlHtaKWIvoavt_0IekIwR';

if (!empty($_POST['g-recaptcha-response'])) {
	$out = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
	$out = json_decode($out);
	if ($out->success == true) {
		$result = sendMailAttachment($admin_email, $email_from, $form_subject, $message);
		// $result = mail($admin_email, $form_subject, $message, $headers);
	} else {
		echo 'Ошибка заполнения капчи.';
	}
};

if ($result == true) {
	echo 'Спасибо! Мы свяжемся с вами в ближайшее время.';
} else {
	echo 'Извините, письмо не отправлено. Попробуйте еще раз.';
};
