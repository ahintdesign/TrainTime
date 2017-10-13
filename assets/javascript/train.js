  //Moment JS info
var time = moment();
console.log(time);
var now = moment().format('HH:mm'); 
console.log(now);


  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyAY9J4wU-1oppJfGD3D2VSK0kweRWRNQ3c",
    authDomain: "train-data2.firebaseapp.com",
    databaseURL: "https://train-data2.firebaseio.com",
    projectId: "train-data2",
    storageBucket: "",
    messagingSenderId: "653654887879"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var name = "";
  var dest= "";
  var time = 0;
  var freq = "";

  // Capture Button Click
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    alert("Train was added.");

    // Grab values from text boxes
    name = $("#name-input").val();
    dest= $("#dest-input").val();
    time = $("#time-input").val();
   freq= $("#freq-input").val();

    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(freq);

   // Code for handling the push
    database.ref().push({
      name: name,
      dest: dest,
      time: time,
      freq: freq
     
    });

  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // storing the snapshot.val() in a variable for convenience
    
    var sv = childSnapshot.val();
   

      // Store everything into a variable.
  var name = sv.name;
  var dest = sv.dest;
  var time = sv.time;
  var freq = sv.freq;

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.dest);
    console.log(sv.time);
    console.log(sv.freq);

    //calculation for next arrival
    nextArrival = now;
    

 //calculation for min away
    minAway = time/freq;

 var tableRow = "<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>";
console.log(tableRow);


    // Change the HTML to reflect
    $(".table").append(tableRow);
   

      $("#name").text(childSnapshot.val().name);
      $("#destination").text(childSnapshot.val().dest);
      $("#time").text(childSnapshot.val().time);
      $("#freq").text(childSnapshot.val().freq);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



