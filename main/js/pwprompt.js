// THIS IS THE WRONG WAY OF AUTHING PW INPUT. AS SOON AS THE SERVER IS MOVED OUT OF GITHUB.IO IT SHOULD BE CHANGED
// PW SHOULD BE ENCRYPTED AND AUTHED THROUGH SERVER, BUT THAT ISNT POSSIBLE IN GITHUB.IO

// --------------------------- //
// --SET YOUR VARIABLES HERE-- //
// --------------------------- //
const setpw = 'radar2019innov' // set the password you want here
const expirytime = 131400 // set the timelimit for the cookie here (in minutes) 131400 min = 3 months
const helpemail = 'TCALCADA@sonaemc.com'
const sharepointpwurl = 'https://sonaesystems.sharepoint.com/sites/SHIFT/SitePages/2019%20Trend%20Radar.aspx'
// --------------------------- //
// DONT EDIT BEYOND THIS POINT //
// --------------------------- //
let helpmailstr = "mailto:"+helpemail;
function pwprompt() {
 	$("#pwprompt-container").load("pwprompt.html",function(){
 		$("#pwhelpmaillink").attr("href",helpmailstr)
 		$("#sharepointlink").attr("href",sharepointpwurl)

 		
		let submitbtn = document.getElementById("pwfield");
		submitbtn.addEventListener("keyup", function(event) {
		  if (event.keyCode === 13) {
		    // event.preventDefault();
		    document.getElementById("pwsubmit").click();
		  }
		});
 	});
}

// var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
	// var username = document.getElementById("username").value;

let font1 = new FontFaceObserver("Oswald", { weight: 300 })
let font2 = new FontFaceObserver("Oswald", { weight: 400 })
let font3 = new FontFaceObserver("IBM Plex Serif", { weight: 400 })

let promises = []
promises.push(d3.json("../data/graph_edited_" + language + ".json?v=" + version))
promises.push(font1.load())
promises.push(font2.load())
promises.push(font3.load())

let promisepass = []
promisepass.push(document.getElementById("pwfield").value)

Promise.all(promisepass).then(results => {

	let password = results[0];
	console.log(password)

	if ( password === setpw ){
		lscache.set('accessgranted', true, expirytime);
		$("#pwprompt-container").remove();
		Promise.all(promises).then(values => {
		    ////////////////////// Data preparation //////////////////////
		    graph = values[0]
		    let nodes = prepareNodes(graph)
		    let edges = prepareEdges(graph)
		    ////////////////////// Create the visual //////////////////////
		    container.call(threatVisual, nodes, edges, language, getFilteredData)
		    queryURLparams();
		    fillFilterMenu();
		    popNodeParamFN();
		})//promises
	} else {
		$('#wrongpw-alert').show()
	}

})//promises

	// var password = document.getElementById("pwfield").value;
	
	// if ( password == "lol" ){
	// 	// alert ("Successful");
	// 	// window.location = "success.html"; // Redirecting to other page.
 // 		$("#pwprompt-container").html('');

	// 	return false;
	// }
	// else{
	// 	// attempt --;// Decrementing by one.
	// 	alert("Wrong password. Please contact the Sonae Innovation team if you need help.");
	// 	// Disabling fields after 3 attempts.
	// 	// if( attempt == 0){
	// 	// 	document.getElementById("username").disabled = true;
	// 	// 	document.getElementById("password").disabled = true;
	// 	// 	document.getElementById("submit").disabled = true;
	// 	// 	return false;
	// 	// }
	// }
}