
// - - - - - - - - - - -animation for the search form- - - - - - - - - - - -
//search bar Handler
$(function(){
  var searchField = $('#query');
  var icon = $('#search-btn');

  //focus event Handler to make search box animate when hover on it
  $(searchField).on('focus', function(){ //run the function when searchfield is on focus
    $(this).animate({ //this refer to searchfield box which needs to be animate
        width:'100%'
    },400);//speed fpr animate
     $(icon).animate({//make search icon animate as well as searchField
       right:'10px'
      },400);
  });
    //blure event handler
    $(searchField).on('blur', function(){
      if(searchField.val() == ''){ //if searchField doesn't have any string make the animation
        $(searchField).animate({ //animation for searchField
          width:'45%'
        },400);
        $(icon).animate({ //animation for icon
          right:'360px'
        },400);

      }
    });
    //preventDefault fuction prevent default behavior of the form and it doesn't actually submit so I can test any action before finalizing
    $('#search-form').submit(function(e){
      e.preventDefault();
    });
});//})();
// - - - - - - - - -end of animation for search form - - - - - - - - - - - -
//get form input



function search (){
  //clear result means to make results area and button equal to empty for each time we search something new clear last search result
  $('#results').html('');
  $('#buttons').html('');


   q = $('#query').val();


  //run Get Request on API
  $.getJSON("https://www.googleapis.com/youtube/v3/search",{ //http request
			part: 'snippet, id',// parameter that includes which part of snippet with ID we want to have in result
			q: q, //q means query that is string. In this case we make it equal to the string that is passed in the search box (var q is defind at the begining of search function)
			type:'video', //which type of result we are looking for
			key: 'AIzaSyAk59PuGj3pkTEeyyktVe25uX0VqjvlDCQ'},//API key which is specific for each user
    //now pass data from upper request to data function
    //getJSON always comes in a way wich cary anonymos function to manepulate data
    function(data){
      //Make variable "nextPageToken", and "previousPageToken" to make them equal to next and prev data and excute them by next and prev buttons
      //nextPageToken and previousPageToken are parameter  identifies a specific page in the result set that should be returned from the youtubr API
       var nextPageToken = data.nextPageToken;
       var prevPageToken = data.prevPageToken;
      console.log(data);
    //using each loop to show each items (wich contains 5 array) from the youtube data
    //this each loop is a callBack from response data to tell what to do with data callBack
    //this form of writting each loop is to call array with name items and choose the data of that array
      $.each(data.items, function(i, item){
      //Building HTML output
      //custom fuction for data output wich created seperatly later but use it here
      var output = getOutput(item);
      //display result after getting output
      $('#results').append(output);//output is defined in below
      });
      //pasing prevPageToken & nextPageToken to the getButtons function which is defined at line 100
    var buttons = getButtons(prevPageToken, nextPageToken);

    //display buttons
    $('#buttons').append(buttons);
    }
  );
}
//_ _ _ _ _ _ _ _ _ _  _ _ _ - _ - _ _ - - -
//next page function which is basicaly exactly like search function
function nextPage(){
  var token = $('#next-button').data('token');
  //clear result means to make results area and button equal to empty for each time we search something new clear last search result
  $('#results').html('');
  $('#buttons').html('');
   q = $('#query').val();
  //run Get Request on API
  $.getJSON("https://www.googleapis.com/youtube/v3/search",{ //http request
			part: 'snippet, id',// parameter that includes which part of snippet with ID we want to have in result
			q: q, //q means query that is string. In this case we make it equal to the string that is passed in the search box (var q is defind at the begining of search function)
			type:'video', //which type of result we are looking for
			key: 'AIzaSyAk59PuGj3pkTEeyyktVe25uX0VqjvlDCQ'},//API key which is specific for each user
    //now pass data from upper request to data function
    //getJSON always comes in a way wich cary anonymos function to manepulate data
    function(data){
      //Make variable "nextPageToken", and "previousPageToken" to make them equal to next and prev data and excute them by next and prev buttons
      //nextPageToken and previousPageToken are parameter  identifies a specific page in the result set that should be returned from the youtubr API
       var nextPageToken = data.nextPageToken;
       var prevPageToken = data.prevPageToken;
      console.log(data);
    //using each loop to show each items (wich contains 5 array) from the youtube data
    //this each loop is a callBack from response data to tell what to do with data callBack
    //this form of writting each loop is to call array with name items and choose the data of that array
      $.each(data.items, function(i, item){
      //Building HTML output
      //custom fuction for data output wich created seperatly later but use it here
      var output = getOutput(item);
      //display result after getting output
      $('#results').append(output);//output is defined in below
      });
      //pasing prevPageToken & nextPageToken to the getButtons function which is defined at line 100
    var buttons = getButtons(prevPageToken, nextPageToken);
    //display buttons
    $('#buttons').append(buttons);
    }
  );
}

//building getOutput wich is going to be run in each loop
function getOutput (item){
  //Defining all variables (everything we need to parse from json file)
  //for accessing to each video we need to ask them for the specific data from the whole json file
  var videoId = item.id.videoId;// in the json file from API we have item and we have id and then videoId so thats the way we have access to it
  var title = item.snippet.title; //title is in item and then snippet and then title
  var description = item.snippet.description;//parse description from snippet
  var thumb = item.snippet.thumbnails.high.url;//parse high url from snippet
  var channelTitle = item.snippet.channelTitle;//parse channelTitle from snipet
  var videoDate = item.snippet.publishedAt;
  //build output string
  //the way you want all the info apear in #result
  var output = '<li>' + //make a list
  '<div class = "list-left">' + //inside list make a div with class of list-left
  //img tag with the address of variable thumb (defined at the first of output function), location of thumb image
  '<img src = "'+ thumb +'">' + //the way we write this line is because we wanted to concatnate thumb variable in the address of image
  '</div>' +
  '<div class = "list-right">' + //making list-right div
  '<h3>'+ title +'</h3>' + //adding title of data from data snippet
  '<small>by<span class = "cTitle">'+ channelTitle +'</span> on '+ videoDate +'</small>' + //adding channelTitle into the small tag
  '<p>'+ description +'</p>' +//add description in to a paragraph
  '</div>' +
  '</li>' +
  '<div class ="clearfix"></div>' +
  '';
    return output ;
}

//For button
function getButtons(prevPageToken, nextPageToken){
  //if there is no previousPageToken creat container that holds the button
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
   //but if there is a previousPageToken then we want to incluse button as well
  } else {
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	}

	return btnoutput;
}
