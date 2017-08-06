
var API_URL = "https://dagfro.de/projects/bok-salg/ibok.php?isbn=";
var ELEMENTS = {
    'books' : document.getElementById("books")
};


function getBook(){
    var isbn = document.getElementById("input-isbn").value;
    document.getElementById("input-isbn").value = "";
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
    var lowest = json[0].price;
    var number;
    for(var i = 1; i < json.length; i++){
        number = parseInt(json[i].price);
        if( number < lowest){
            lowest = number;
        }
    }
    return lowest;
}
function getHighetsPriceFromAds(json) {
    var lowest = json[0].price;
    var number;
    for(var i = 1; i < json.length; i++){
        number = parseInt(json[i].price);
        if( number > lowest){
            lowest = number;
        }
    }
    return lowest;
}
function getTypicalPriceFromAds(json) {
    var numbers = {};
    var number = parseInt(json[0].price);
    for(var i = 1; i < json.length; i++){
        number = parseInt(json[i].price);
        if(!numbers[number]){
            numbers[number] = 0;
        }
        numbers[number] ++;
    }
    var most_common_number;
    var most_common_number_count;
    for(var number in numbers){
        if(!most_common_number){
            most_common_number = number;
            most_common_number_count = numbers[most_common_number];
        }
        if(most_common_number_count < numbers[number]){
            most_common_number = number;
            most_common_number_count = numbers[most_common_number];
        }
    }
    return most_common_number;
}

function getPriceList(prices){
    var html = "";
    html += "<ul>";
    for(var i = 0; i < prices.length; i++){
        html += "<li>";
        html += prices[i].store + " - " + prices[i].price;
        html += "</li>";
    }
    html += "</ul>";
    return html;
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
        "<td>"+price.lowest+"</td>"+
        "<td>"+price.typical+"</td>"+
        "<td>"+price.highest+"</td>"+
        "<td>"+getPriceList(json.prices)+"</td>"+
        "<td><a href='https://ibok.no/bok/" + json['isbn'] + "'>Ibok-link</a></td>"+
        "<td> <table><tr><td><img src='"+json['img']+ "'/></td><td>" +json['title']+ " - isbn:" +json['isbn']+" - utgitt: "+json['year']+ " - " +price.typical +"kr</td></tr></table></td>"+
        "</tr>";
}
