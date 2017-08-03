
const movienight ={};

// Fetch movies from Netflix Roulette
movienight.getMovieData= (query)=>{
  console.log(query, 'the query')
  $.ajax({
   url:'https://netflixroulette.net/api/api.php',
   type:'GET',
   dataType:'json',
   data: {
     'actor': query,
   }
  }).then(function(res){
    console.log(res);
    movienight.displayMovie(res);
  })
}


// Display movie recommendations
movienight.displayMovie = (data)=>{
  $('#movieSelection').empty();
  data.forEach(function(movie){
    // Group movie title, image and year in a single div
    const movieTitle = $('<h2>').text(movie.show_title);
    const movieImage = $('<img>').attr('src', movie.poster).addClass('img');
    const movieYear = $('<h2>').text(movie.release_year);
    const movieSelection= $('<div>').append(movieTitle, movieYear, movieImage).addClass('parentDetails');

    // Add a new div for movie description and cast info. this will appear in modal on click
    const movieDesc = $('<p>').text(movie.summary);
    const movieCast = $('<p>').text(movie.show_cast);
    const movieDetails = $('<div  >').append(movieTitle, movieDesc, movieCast).addClass('movieDetails hidden').append('<button>'+ 'Close'+'</button>'+'</div>');
    $('#movieSelection').append(movieSelection).append(movieDetails);
    movienight.displayDesc();
  })
}

//******** Modal **********************
movienight.displayDesc = function(desc){
  $('.parentDetails').on('click', function(e){
    e.preventDefault();
    // Modal open
    $(this).next().show();
    // console.log("Im clicking");
    //  console.log(this);
// Modal close
  $('button').on('click',function(e){
    $('.movieDetails').hide();
    })
  });
};

// ************************************
// Get Food data
movienight.getEdamamData= (query2)=>{
  console.log(query2, 'the food query')
  $.ajax({
    url:'https://api.edamam.com/search',
    type:'GET',
    dataType:'json',
    data:{
      q: query2,
      app_id:'ae2fe5b5',
      app_key:'46c15e68979503caf05822045ce90cff	',
      from: 0,
      to: 4
    }
  }).then(function(res1){
    console.log(res1);
    var recipeList = res1.hits.map(function(value){
      return value.recipe;
    });
    // console.log(hits.recipe);
    console.log(recipeList, "hi");
    movienight.displayFood(recipeList);
  })
}

movienight.displayFood = (recipeList)=>{
  // clear any previous selections
  $('.dinnerSelection').empty();
  recipeList.forEach(function(recipe){
    console.log(recipe);
    console.log(recipe.label);
    console.log(recipe.url);
    // const recipeTitle = $('<a>').text(recipe.label).attr('href', recipe.url).addClass('show');;
    const recipeTitle = $('<a>').attr('href', recipe.url).addClass('show');;
    const recipeImage = $('<img>').attr('src', recipe.image).addClass('img');
    recipeTitle.append(recipeImage)
    // const recipeLink = $('<a>').attr('href', recipe.url).addClass('show');
    // const recipeSelection= $('<div>').append(recipeTitle, recipeImage).addClass('recipeDetails');
    const recipeSelection= $('<div>').append(recipeTitle).addClass('recipeDetails');
    $('#dinnerSelection').append(recipeSelection);
    console.log(recipeImage, recipeTitle, recipeSelection);
    // Link to recipe
    $('a[href$=shoes]').on('click', function(e){
      // $(this).recipe.url
    e.preventDefault();
    window.open(recipe.url, '_blank');
    $(this).show(recipe.url);
      // window.location.href= recipe.url;
    })
  });
}

movienight.init = function(){
  movienight.getEdamamData('');
  $('.foodButton').on('click', function(){
    const searchfoodQuery =$('input#foodSelect').val();
    movienight.getEdamamData(searchfoodQuery);
    $('#dinnerResults').append(`Selections for: ${searchfoodQuery}`);
  });
  movienight.getMovieData(' ');//set default actor to Meryl Streep
  $('select#movieActor').on('change', function(){
    const searchQuery = $(this).val();
    movienight.getMovieData(searchQuery);
    $('#genreSelection').text(`Selections for: ${searchQuery}`);
    // console.log(searchQuery);
  });

  movienight.getMovieData();
  movienight.getEdamamData();
};


$(function(){
  movienight.init();
});
