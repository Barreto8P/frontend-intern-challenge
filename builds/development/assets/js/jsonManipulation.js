  loadJSON("assets/js/urls.json", function(response) {
      var actual_JSON = JSON.parse(response);
      displayTop5(actual_JSON,'classification-field');
      displayTotalHits(actual_JSON,'total-hits');
  });


function loadJSON(file,callback) {
   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}


function displayTop5(data,local) {
    var sorted_JSON = data.sort(function(a, b){return b.hits-a.hits}); //Sort JSON into descendent order
    var board = document.getElementById(local);
    for (var i = 0; i < 5; i++) {
      var newItem = "<tr><td style='text-align:left;'><a class='chaordic-text' href='"+sorted_JSON[i].url+"'>"+sorted_JSON[i].shortUrl+"</a></td><td class='support-text'>"+formatNumber(sorted_JSON[i].hits)+"</td></tr>";
      board.innerHTML+=newItem;
    }
}

function displayTotalHits(data,local) {
    var total_hits = data.reduce(function( prevVal, elem ) { return prevVal + elem.hits;}, 0 ); //Sum all hits
    var board = document.getElementById(local);
    board.innerHTML = formatNumber(total_hits);
}

// Formating separating each 3 digits with a .
function formatNumber(num){
    return ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });
}
