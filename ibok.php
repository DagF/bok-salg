<?php

header("Access-Control-Allow-Origin: *");

$isbn = $_GET['isbn'];
$book_page = file_get_contents('https://ibok.no/bok/' . $isbn);
$book_id = explode("'", explode("{book_id:'", $book_page)[1])[0];
$add_json = file_get_contents('https://ibok.no/api/classified/?book_id=' . $book_id );
$add_json = json_decode($add_json, true);


$title_regexp = '#<h1>(.*)</h1>#ms';
preg_match($title_regexp, $book_page, $title);

$details_regexp = "/<p>(?:\s)*<b>Av:<\/b>(.*)<br>(?:\s)*<b>Forlag:<\/b>(.*)<br>(?:\s*)<b>ISBN:<\/b>(.*)<br>(?:\s*)<b>Utgitt:<\/b>(.*)<br>$/m";
preg_match($details_regexp, $book_page, $matches);

$img_regexp = '<div class="box_module_content">(?:\s)*<img src="(.*)"';
preg_match($img_regexp, $book_page, $img);

$prices_regexp = '/<span id="(.*)" class=" books_price">(?:\s*)(.*?)(?:\s*)<\/span>/';
preg_match_all($prices_regexp, $book_page, $prices);

$stores = $prices[1];
$prices = $prices[2];

$prices_ass = [];

for($i = 0; $i < count($prices); $i++){
    array_push($prices_ass, ['store' => $stores[$i], 'price' => $prices[$i]]);
}

$json = [
    'ads' => $add_json,
    'isbn' => $isbn,
    'bookId' => $book_id,
    'author' => trim($matches[1]),
    'publisher' => trim($matches[2]),
    'year' => trim($matches[4]),
    'title' => $title[1],
    'prices' => $prices_ass,
    'img' => $img
];
header('Content-Type: application/json');
echo json_encode($json);
