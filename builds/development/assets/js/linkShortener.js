function shortify(){
  var button = document.getElementById('shortify-button'); //Get button
  var link = document.getElementById('link-field');
  if (button.className.split(' ')[0]=='shortify') {
      if (link.value.length > 10) {
        //Assign changes to button className and text
        button.className = "copy btn";
        button.innerHTML = "COPIAR";
        var new_link = "http://chr.dc/"+(Math.random().toString(36)).slice(2, 5+2); //Create random link
        link.value = new_link; //Assign link into the input
        document.getElementById('clear-button').style.display = "inline-block"; //Show clear button

      }
  }
  else if (button.className.split(' ')[0]=='copy') {
     link.select();
     document.execCommand('copy'); //Copy input text into clipboard
  }
}

function clearField(id){
  var form = document.getElementById(id);
  form.value = "";
  document.getElementById('clear-button').style.display = "none"; //Take clear button
  var button = document.getElementById('shortify-button'); //Get button
  //Assign changes to button className and text
  button.className = "shortify btn";
  button.innerHTML = "ENCURTAR";
}
