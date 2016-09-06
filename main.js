
var API_URL = "https://dagfro.de/projects/bok-salg/ibok.php?isbn=";
var ELEMENTS = {
    'books' : document.getElementById("books")
};


function getBook(){
    var isbn = document.getElementById("input-isbn").value;
    console.log(isbn);
    fetch(API_URL + isbn).then(function(response){
       return response.json();
    }).then(function (json){
        console.log(json);
        ELEMENTS.books.innerHTML += toTableRow(json);
    }

    );
    return false;
}

function getLowestPriceFromAds(json) {
    return 5;
}
function getHighetsPriceFromAds(json) {
    return 5;

}
function getTypicalPriceFromAds(json) {
    return 5;

}
function toTableRow(json){
    var price = {
        "lowest" : getLowestPriceFromAds(json['ads']),
        "highest" : getHighetsPriceFromAds(json['ads']),
        "typical" : getTypicalPriceFromAds(json['ads'])
    };
    return "<tr>" +
        "<td>"+json['title']+"</td>"+
        "<td>"+json['isbn']+"</td>"+
        "<td>"+json['author']+"</td>"+
        "<td>"+json['publisher']+"</td>"+
        "<td>"+json['year']+"</td>"+
        "<td>Lavest pris</td>"+
        "<td>Typisk pris</td>"+
        "<td>Høyest pris</td>"+
        "<td><a href='https://ibok.no/bok/'" + json['bookId'] + ">Ibok-link</a></td>"+
        "</tr>";
}