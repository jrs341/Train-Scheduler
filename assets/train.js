$(document).ready(function(){

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC-T4CF5Tpz3hK9pm9uNOAcfLj1aZc5cgA",
    authDomain: "train-schedule-7e43c.firebaseapp.com",
    databaseURL: "https://train-schedule-7e43c.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "389401805604"
  };
  firebase.initializeApp(config);

var database = firebase.database();

function update() {
  $('#clock').html(moment().format('D. MMMM YYYY H:mm:ss'));
}

setInterval(update, 1000);

// 2. Button for adding Employees
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#destination").val().trim();
	var trainTime = moment($("#trainTime").val().trim(), "HH:mm").format();
	var trainFrequency = $("#frequency").val().trim();

	// Creates local "temporary" object for holding employee data
	var newTrain = {
		name: trainName,
		destination: trainDestination,
		firstTrain: trainTime,
		frequency: trainFrequency
	}

	// Uploads employee data to the database
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


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var firstTrain = moment(childSnapshot.val().firstTrain);
	var trainFrequency = childSnapshot.val().frequency;
	var nextArrival = firstTrain.clone().add(trainFrequency, 'minutes').format('HH:mm');

	// var eventTime= 1366549200; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
	// var currentTime = 1366547400; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
	// var diffTime = eventTime - currentTime;
	// var duration = moment.duration(diffTime*1000, 'milliseconds');
	// var interval = 1000;

	// setInterval(function(){
 //  	duration = moment.duration(duration - interval, 'milliseconds');
 //    $('.countdown').text(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
	// }, interval);
	// var minutesAway = countdown every frequency;
	// Employee Info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(trainFrequency);
	console.log(nextArrival);

	// Prettify the employee start
	// var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
	// // Calculate the months worked using hardconre math
	// // To calculate the months worked
	// var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
	// console.log(empMonths);

	// // Calculate the total billed rate
	// var empBilled = empMonths * empRate;
	// console.log(empBilled);

	// Add each train's data into the table
	// <td>" + minutesAway + "<td>"
	$("#trainSchedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td>");
// database.ref closing bracket
});

// document.ready closing bracket
});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case


// $(document).ready(function(){


// });