
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
});
// - - - - - - - - -end of animation for search form - - - - - - - - - - - -
function serch (){
  //clear result means to make results area and button equal to empty for each time we search something new clear last search result
  $('#results').html('');
  $('#buttons').html('');

  //get form input
  var q = $('#query').val();

  //run Get Request on API
  $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=coco&type=video%2Cchannel%2Cplaylist&key=AIzaSyAk59PuGj3pkTEeyyktVe25uX0VqjvlDCQ",
  
  );
}
