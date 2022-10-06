<?php
$data = $_POST;
$filename = 'forms.php';
$string = $data['name'] . PHP_EOL . $data['phone'] . PHP_EOL. $data['email'] . PHP_EOL . $data['message'] . PHP_EOL;

if (is_writable($filename)) {
    if (!$fp = fopen($filename, 'a')) {
        echo "Не могу открыть файл ($filename)";
        exit;
    }

    if (fwrite($fp, $string) === FALSE) {
        echo "Не могу произвести запись в файл ($filename)";
        exit;
    }

    fclose($fp);
}