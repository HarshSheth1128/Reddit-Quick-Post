var address = "https://www.reddit.com/r/";
var subreddit = "all/";
var selection = "top/";
var sort = "?sort=top";
var time = "&t=day";

var url = address + subreddit + selection + ".json" + sort + top;


$(document).ready(function(){
  $.getJSON(url, function(data){
    gotData(data);
  });
});

function getReset(){
  $.getJSON(url, function(data){
    gotData(data);
  });
}

var titleLink;
var commentsLink;

function gotData(data){
var thumbnail_url
  if (data.data.children[0].data.media != undefined){
    thumbnail_url = data.data.children[0].data.media.oembed.thumbnail_url;
  } else {
    thumbnail_url = data.data.children[0].data.thumbnail;
  }


  //let thumbnail_url = data.data.children[0].data.media.oembed.thumbnail_url;
  let fromSubreddit = "r/" + data.data.children[0].data.subreddit;
  let titleHeader =  data.data.children[0].data.title;
  titleLink = data.data.children[0].data.url;
  commentsLink = "http://reddit.com" + data.data.children[0].data.permalink;
  let numComments = data.data.children[0].data.num_comments;


  console.log(thumbnail_url);
  console.log(data.data.children[0].data)
  console.log("<img src=" + "\"" + thumbnail_url + "\"" +  "/>");
  $('h1').append("<a id = \"titleLink\" class= \"title\" href=\""+ titleLink + "\">" + titleHeader + "<a/>");
  $('#subreddit').append("From: " + "<a href=\" https://reddit.com/r/" + subreddit +"\">" + fromSubreddit + "<a/>");
  $('#thumbnail').append("    |   ");
  $('#thumbnail').append("<a id=\"comment\" href = \"" + commentsLink + "\">" + "   Comments: " + numComments + "<a/>");
  $('#thumbnail').append("    |     ");
  $('#thumbnail').append("<br />");
  $('#thumbnail').append("<img src=" + "\"" + thumbnail_url + "\"" +  "/>");
}

$("#subRedditText").keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == "13"){
    subreddit = $("#subRedditText").val() + "/";
    url = address + subreddit + selection + ".json" + "?sort=top&t=day";
    console.log(url);
    $("h1").empty();
    $("#thumbnail").empty();
    $("#subreddit").empty();
    console.log($("#sort").val());
    if ($("#sort").val() == "new") {
      selection = "new/";
      sort= "";
      time= "";
      url = address + subreddit + selection + ".json";
      $("h1").empty();
      $("#thumbnail").empty();
      $("#subreddit").empty();
      getReset();
    } else if ($("#sort").val() == "hot"){
      selection = "hot/";
      sort= "";
      time= "";
      url = address + subreddit + selection + ".json";
      $("h1").empty();
      $("#thumbnail").empty();
      $("#subreddit").empty();
      getReset();
    } else if ($("#sort").val() == "Top"){
      console.log($("#time").val())
      if ($("#time").val() == "Day"){
        console.log("day")
        selection = "top/";
        sort= "?sort=top";
        time= "&t=day";
        url = address + subreddit + selection + ".json" + sort + time;
        $("h1").empty();
        $("#thumbnail").empty();
        $("#subreddit").empty();
        getReset();
      } else if($("#time").val() == "hour"){
        selection = "top/";
        sort= "?sort=top";
        time= "&t=hour";
        url = address + subreddit + selection + ".json" + sort + time;
        $("h1").empty();
        $("#thumbnail").empty();
        $("#subreddit").empty();
        getReset();
      } else if($("#time").val() == "week"){
        selection = "top/";
        sort= "?sort=top";
        time= "&t=week";
        url = address + subreddit + selection + ".json" + sort + time;
        $("h1").empty();
        $("#thumbnail").empty();
        $("#subreddit").empty();
        getReset();
      }
    }
  }
});

$("h1").click(function(){
  chrome.tabs.create({url: titleLink});
});

$("#thumbnail").click(function(event){
  chrome.tabs.create({url: commentsLink});
});

$("#subreddit").click(function(event){
  chrome.tabs.create({url: "http://reddit.com/r/" + subreddit});
});
