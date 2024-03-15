<?php
$to = "aivictorov@yandex.ru";
$from_name = "Схемы погрузки (ИП Викторов)";
$from_email = "no-reply@shema-pogruzki.ru";
$subject_text = "Заявка с сайта";
$message_text = "";
$secret = '6LcXOZkpAAAAAEOdaE7jlHtaKWIvoavt_0IekIwR';

$from = '=?UTF-8?B?' . base64_encode($from_name) . '?=' . ' <' . $from_email . '>';

$_POST = array_map('trim', $_POST);

if (empty(trim($_POST['name']))) echo "Не заполнено имя.";
if (empty(trim($_POST['phone']))) echo "Не заполнен телефон.";
if (empty(trim($_POST['email']))) echo "Не заполнен email.";

foreach ($_POST as $key => $value) {
	if (
		$key != 'g-recaptcha-response' &&
		$key != "file" &&
		$value != ""
	) {
		$message_text .= $key . " " . $value . "<br>";
	};
};

if (!empty($_POST['g-recaptcha-response'])) {
	$out = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
	$out = json_decode($out);

	if ($out->success == true) {
		$result = sendMailWithAttachment($to, $from, $subject_text, $message_text);

		if ($result == true) {
			echo "Спасибо! Мы свяжемся с вами в ближайшее время.";
		} else {
			echo "Извините, письмо не отправлено. Попробуйте еще раз.";
		};
	};
} else {
	echo "Ошибка заполнения капчи.";
};

function sendMailWithAttachment($to, $from, $subject_text, $message_text)
{
	$EOL = "\r\n";
	$boundary     = "--" . md5(uniqid(time()));
	$subject = '=?utf-8?B?' . base64_encode($subject_text) . '?=';
	$headers    = "MIME-Version: 1.0;$EOL";
	$headers   .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL";
	$headers   .= "From: $from\nReply-To: $from\n";
	$multipart  = "--$boundary$EOL";
	$multipart .= "Content-Type: text/html; charset=utf-8$EOL";
	$multipart .= "Content-Transfer-Encoding: base64$EOL";
	$multipart .= $EOL;
	$multipart .= chunk_split(base64_encode($message_text));

	if (!empty($_FILES["file"]['name'][0])) {

		foreach ($_FILES["file"]["name"] as $key => $value) {
			$filename = $_FILES["file"]["tmp_name"][$key];
			$fileSize = $_FILES["file"]["size"][$key];

			if ($fileSize > (5 * 1024 * 1024)) {
				echo 'Слишком большой файл.';
				return false;
			};

			if (
				preg_match("/\.(jpg|jpeg|png|pdf)$/i", $_FILES["file"]["name"][$key]) &&
				mime_content_type($filename) == "image/jpeg" ||
				mime_content_type($filename) == "image/png" ||
				mime_content_type($filename) == "application/pdf"
			) {
				$file = fopen($filename, "rb");
				$data = fread($file,  filesize($filename));
				fclose($file);
				$NameFile = $_FILES["file"]["name"][$key];
				$File = $data;
				$multipart .=  "$EOL--$boundary$EOL";
				$multipart .= "Content-Type: application/octet-stream; name=\"$NameFile\"$EOL";
				$multipart .= "Content-Transfer-Encoding: base64$EOL";
				$multipart .= "Content-Disposition: attachment; filename=\"$NameFile\"$EOL";
				$multipart .= $EOL;
				$multipart .= chunk_split(base64_encode($File));
			} else {
				echo 'Неверный формат файла.';
				return false;
			};
		};
	};

	$multipart .= "$EOL--$boundary--$EOL";

	if (!mail($to, $subject, $multipart, $headers)) {
		return false;
	} else {
		return true;
	};
};
