<?php

include_once('phpClassEmail.php');

$mail = new Mail;
$mail->from('mail@site.com', 'Site.com');
$mail->to('ivan@site.com', 'Иван Иванов');
$mail->subject = 'Подтверждение заказа с сайта Site.com';
$mail->body = '
	<h1>Здравствуйте Иван Иванов!</h1>
	<p>
		Уважаемый покупатель, заказ принят и ему присвоен номер <strong>1953</strong>.
		<br />Используйте этот номер для уточнения заказа.
		<br />Пожалуйста проверьте информацию ниже и в случае ошибки свяжитесь с нами.
	</p>
	<ul>
		<li><strong>Имя:</strong> Иван Иванов</li>
		<li><strong>E-mail:</strong> ivan@site.com</li>
		<li><strong>Способ доставки:</strong> самовывоз</li>
	</ul>
	<h2>Данные о товарах:</h2>
	<table>
		<thead>
			<tr>
				<th>№</th>
				<th>Наименование товара</th>
				<th>Кол-во</th>
				<th>Цена</th>
				<th>Сумма</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td style="text-align: center;">1</td>
				<td>
					Настенный газовый котел Buderus Logamax U072-12K 7736900359RU
					<br>Артикул: 7736900359RU
				</td>
				<td style="text-align: center;">2 шт.</td>
				<td style="text-align: center;">30 0000 руб.</td>
				<td style="text-align: center;">60 0000 руб.</td>
			</tr>
		</tbody>
	</table>
	<h4>ИТОГО: 60 0000 руб.</h4>
	<hr>
	<p>
		С уважением, Site.com
		<br><a href="http://site.com">http://site.com</a>
	</p>
';


// $mail->addFile(__DIR__ . '/prods.docx');

$mail->addFile($_FILES['file']['full_path']);
$mail->send();