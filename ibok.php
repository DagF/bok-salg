<?php
$isbn = $_GET['isbn'];
$book_page = file_get_contents('https://ibok.no/bok/' . $isbn);
$book_id = explode("'", explode("{book_id:'", $book_page)[1])[0];
$add_json = file_get_contents('https://ibok.no/api/classified/?book_id=' . $book_id );
$add_json = json_decode($add_json, true);


$details_regexp = "/<p>(?:\s)*<b>Av:<\/b>(.*)<br>(?:\s)*<b>Forlag:<\/b>(.*)<br>(?:\s*)<b>ISBN:<\/b>(.*)<br>(?:\s*)<b>Utgitt:<\/b>(.*)<br>$/m";
preg_match($details_regexp, $book_page, $matches);

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
    'author' => $matches[1],
    'publisher' => $matches[2],
    'year' => $matches[4],
    'prices' => $prices_ass
];
header('Content-Type: application/json');
echo json_encode($json);
