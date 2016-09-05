
function getBook(event){
    var isbn = document.getElementById("input-isbn").value;
    console.log(isbn);
    fetch("https://ibok.no/bok/" + isbn).then(function(response){
        console.log(response);
    });
    return false;
}