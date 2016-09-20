
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
});
// - - - - - - - - -end of animation for search form - - - - - - - - - - - -
function search (){
  //clear result means to make results area and button equal to empty for each time we search something new clear last search result
  $('#results').html('');
  $('#buttons').html('');

  //get form input
  var q = $('#query').val();

  //run Get Request on API
  $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&q=q&type=video%2Cchannel%2Cplaylist&key=AIzaSyAk59PuGj3pkTEeyyktVe25uX0VqjvlDCQ",
    //now pass data from upper request to data function
    //getJSON always comes in a way wich cary anonymos function to manepulate data
    function(data){
      //Make variable "nextPageToken", and "previousPageToken" to make them equal to next and last data and excute them by next and prev buttons
       var nextPageToken = data.nextPageToken;
       var prexPageToken = data.prevPageToken;
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
  var output = "<li>" +
  '<div class = list-left> ' +
  '<img src="'+ thumb +'">' +
  '</div>'+
  '<div class = "list-right">' +
  '<h3>'+title+'</h3>'+
  '<small>by<span class="cTitle"'+channelTitle+'</span> on '+videoDate+'</small>'+
  '<p>'+description+'</p>'+
  '</div>' +
  '</li>' +
  '<div class= "clearfix"</div>'+
  '';
  return output;
}
