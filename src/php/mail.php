<?php

$project_name = "cхема-погрузки.рф";
$admin_email = "aivictorov@yandex.ru";
$email_from = "cхема-погрузки.рф";
$form_subject = 'Заявка с сайта';
$message = "";

foreach ($_POST as $key => $value) {
	if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "email_from") {
		$message .= $key . " " . $value . "<br>";
	};
}

function adopt($text)
{
	return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

$headers =
	"MIME-Version: 1.0" . PHP_EOL .
	// "Content-Type: text/html; charset=utf-8" . PHP_EOL .
	"Content-Type: multipart/form-data; charset=utf-8" . PHP_EOL .
	'From: ' . adopt($project_name) . ' <' . $email_from . '>' . PHP_EOL .
	'Reply-To: ' . $admin_email . '' . PHP_EOL;

$result = mail($admin_email, $form_subject, $message, $headers);

if ($result = true) {
	echo 'Спасибо! Мы свяжемся с вами в ближайшее время.';
} else {
	echo 'Извините, письмо не отправлено. Попробуйте еще раз.';
};

// $name        = "Название здесь идет";
// $email       = "someone@gmail.com";
// $to          = "$name <$email>";
// $from        = "John Doe ";
// $subject     = "тема ";
// $mainMessage = "Привет,я сообщение с pdf файлом";
// $fileatt     = "files/test.pdf"; // Расположение файла
// $fileatttype = "application/pdf";
// $fileattname = "newName.pdf"; //Имя, которое вы хотите использовать для отправки, или вы можете использовать то же имя
// $headers     = "From: $from";

// // Открываем и читаем файл в переменную.
// $file = fopen($fileatt, 'rb');
// $data = fread($file, filesize($fileatt));
// fclose($file);

// // Это прикрепляет файл
// $semi_rand     = md5(time());
// $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
// $headers      .= "\nMIME-Version: 1.0\n" .
//   "Content-Type: multipart/mixed;\n" .
//   " boundary=\"{$mime_boundary}\"";
//   $message = "Это multi-part сообщение в формате MIME․\n\n" .
//   "-{$mime_boundary}\n" .
//   "Content-Type: text/plain; charset=\"iso-8859-1\n" .
//   "Content-Transfer-Encoding: 7bit\n\n" .
//   $mainMessage  . "\n\n";

// $data = chunk_split(base64_encode($data));
// $message .= "--{$mime_boundary}\n" .
//   "Content-Type: {$fileatttype};\n" .
//   " name=\"{$fileattname}\"\n" .
//   "Content-Disposition: attachment;\n" .
//   " filename=\"{$fileattname}\"\n" .
//   "Content-Transfer-Encoding: base64\n\n" .
// $data . "\n\n" .
//  "-{$mime_boundary}-\n";

// // Отправить письмо
// if(mail($to, $subject, $message, $headers))
// {
//     echo "Письмо отправлено.";
// } else {
//     echo "При отправке почты произошла ошибка.";
// }