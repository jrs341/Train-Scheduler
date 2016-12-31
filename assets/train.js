$(document).ready(function(){

 // Initialize Firebase
 // var config = {
 //    apiKey: "AIzaSyC-T4CF5Tpz3hK9pm9uNOAcfLj1aZc5cgA",
 //    authDomain: "train-schedule-7e43c.firebaseapp.com",
 //    databaseURL: "https://train-schedule-7e43c.firebaseio.com",
 //    storageBucket: "",
 //    messagingSenderId: "389401805604"
 //  };
 //  firebase.initializeApp(config);
 var config = {
    apiKey: "AIzaSyDP-GyfomT1ON6JxYrFCDAL2uSmCN3uFBI",
    authDomain: "trainscheduler-a257c.firebaseapp.com",
    databaseURL: "https://trainscheduler-a257c.firebaseio.com",
    storageBucket: "trainscheduler-a257c.appspot.com",
    messagingSenderId: "150982490935"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();

// Displays a clock on the page
function update() {
  $('#clock').html(moment().format('D. MMMM YYYY H:mm:ss'));
}

setInterval(update, 1000);

// 2. Button for adding Trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#destination").val().trim();
	var trainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var trainFrequency = $("#frequency").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name: trainName,
		destination: trainDestination,
		firstTrain: trainTime,
		frequency: trainFrequency
	}

	// Uploads train data to the database
	database.ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainName").val("");
	$("#destination").val("");
	$("#trainTime").val("");
	$("#frequency").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var trainFrequency = childSnapshot.val().frequency;
	
	var differenceTimes = moment().diff(moment.unix(firstTrain), "minutes");
	var remainingTime = moment().diff(moment.unix(firstTrain), "minutes") % trainFrequency;
	var minutes = trainFrequency - remainingTime;
	var nextArrival = moment().add(minutes, "m").format("HH:mm");

	// Add each train's data into the table

	$("#trainSchedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutes + "<td>");
// database.ref closing bracket
});

// document.ready closing bracket
});
