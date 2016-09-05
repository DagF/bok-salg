<?php
$book_page = file_get_contents('https://ibok.no/bok/' . $_GET['isbn']);
$book_id = explode("'", explode("{book_id:'", $book_page)[1])[0];
$json = file_get_contents('https://ibok.no/api/classified/?book_id=' . $book_id$
$json = '"{bookId: "' . $book_id . '", json:"' . $json;

echo $json;
