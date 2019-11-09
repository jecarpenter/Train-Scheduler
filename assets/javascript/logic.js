var Config = {
    apiKey: "AIzaSyCoNHG6elnGSS2fMikEKKmBSCHfMMIikzE",
    authDomain: "trainscheduler-a6bcb.firebaseapp.com",
    databaseURL: "https://trainscheduler-a6bcb.firebaseio.com",
    projectId: "trainscheduler-a6bcb",
    storageBucket: "trainscheduler-a6bcb.appspot.com",
    messagingSenderId: "472216683570",
    appId: "1:472216683570:web:387e1402b6bc579be6a82b",
    measurementId: "G-QBMK56WKGL"
  };

  firebase.initializeApp(Config);


	var dB = firebase.database();
		var trains = [];

		$("button").on("click",function(){

			if(!trains.includes($("#train-name-input").val())){
				var newTrain = {
					"trainName" : $("#train-name-input").val().trim(),
					"destination" : $("#destination-input").val().trim(),
					"frequency" : $("#frequency-input").val().trim(),
					"firstTrainTime" : $("#first-train-time-input").val().trim()
				};
				dB.ref().push(newTrain);
				trains.push($("#train-name-input").val()); 
				console.log(newTrain)
			}
		})

		dB.ref().on("child_added",function(ChildSnapshot,prevChildKey){
			var firstTime = moment(ChildSnapshot.val().firstTrainTime, "HH:mm");
			var currentTime = moment().format("HH:mm");
			var timeDifference = Math.abs(moment().diff(moment(firstTime), "minutes"));
			var timeRemainder = timeDifference % ChildSnapshot.val().frequency;
			var minLeft = ChildSnapshot.val().frequency - timeRemainder;
			var nextTrain = moment().add(minLeft, "minutes").format("HH:mm");

			$("table").append("<tr><td>"+ChildSnapshot.val().trainName+"</td><td>"+ChildSnapshot.val().destination+"</td><td>"+ChildSnapshot.val().frequency+"</td><td>"+ChildSnapshot.val().firstTrainTime+"</td><td>"+timeDifference+"</td>");
		});