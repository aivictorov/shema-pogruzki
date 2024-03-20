Плагины для VSCode: 

Auto Close Tag
Auto Complete Tag
Auto Rename Tag
Material Icon Theme
eCSStractor for VSCode
eCSStractor tsx for VSCode
Live Server

----------------------------------------------------------------------

Плагины для Nunjucks:

Nunjucks – добавляет подсветку синтаксиса Nunjucks и сниппеты.
Nunjucks Template Formatter – форматирует шаблоны Nunjucks.

----------------------------------------------------------------------

GIT:
git config --global user.email "aivictorov@yandex.ru"
git config --global user.name "aivictorov"

----------------------------------------------------------------------

Глобальная установка Gulp-cli:
npm install --global gulp-cli

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

----------------------------------------------------------------------

https://www.youtube.com/watch?v=D_HW-tvyKKE
https://www.youtube.com/watch?v=d2ngzLOM01U

Команда для установки всех пакетов:
npm i gulp gulp-sass sass gulp-file-include gulp-clean gulp-server-livereload gulp-sourcemaps gulp-plumber gulp-notify gulp-group-css-media-queries --save-dev

Описание пакетов:
gulp - собственно Gulp
gulp-sass - Сборка SASS / SCSS
sass - Необходим для сборки SASS / SCSS
gulp-file-include - Подключение файлов друг в друга. HTML include
gulp-clean - Удаление файлов
gulp-server-livereload - Сервер с автообновлением страницы
gulp-sourcemaps - Исходные карты для CSS
gulp-plumber - Фикс ошибок при сборке
gulp-notify - Нотификации
gulp-group-css-media-queries - Группировка CSS медиа запросов

----------------------------------------------------------------------

Установка webpack:
npm i webpack-stream style-loader css-loader --save-dev

- JS таск
- webpack конфиг
- пример файлов с модулями

Пример с datepicker:
npm i air-datepicker -S

JS:
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

document.addEventListener('DOMContentLoaded', () => {
	new AirDatepicker('#my-element');
});

HTML:
<input type="text" id="my-element">

----------------------------------------------------------------------

Сборка скриптов. webpack, babel

Установка babel:
npm i gulp-babel @babel/core @babel/preset-env

- JS таск
- Настройки package-json

----------------------------------------------------------------------

Картинки:
npm i gulp-imagemin@7 --save-dev

.pipe(imagemin({ verbose: true }))

----------------------------------------------------------------------

Ускорение сборки

npm install --save-dev gulp-changed

- использование в картинках, HTML, JS, CSS

----------------------------------------------------------------------

web-p

npm i gulp-webp gulp-webp-html gulp-webp-css --save-dev

----------------------------------------------------------------------

