import { Template } from 'meteor/templating';
 
import './body.html';
import './eventemitter2.min.js';
import './roslib.min.js';
 
// This function connects to the rosbridge server running on the local computer on port 9090
var rbServer = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
 });

 // This function is called upon the rosbridge connection event
 rbServer.on('connection', function() {
     // Write appropriate message to #feedback div when successfully connected to rosbridge
     var fbDiv = document.getElementById('feedback');
     fbDiv.innerHTML += "<p>Connected to websocket server.</p>";
 });

// This function is called when there is an error attempting to connect to rosbridge
rbServer.on('error', function(error) {
    // Write appropriate message to #feedback div upon error when attempting to connect to rosbridge
    var fbDiv = document.getElementById('feedback');
    fbDiv.innerHTML += "<p>Error connecting to websocket server.</p>";
});

// This function is called when the connection to rosbridge is closed
rbServer.on('close', function() {
    // Write appropriate message to #feedback div upon closing connection to rosbridge
    var fbDiv = document.getElementById('feedback');
    fbDiv.innerHTML += "<p>Connection to websocket server closed.</p>";
 });

// These lines create a topic object as defined by roslibjs
var cmdVelTopic = new ROSLIB.Topic({
    ros : rbServer,
    name : '/turtle1/cmd_vel',
    messageType : 'geometry_msgs/Twist'
});

// These lines create a message that conforms to the structure of the Twist defined in our ROS installation
// It initalizes all properties to zero. They will be set to appropriate values before we publish this message.
var twist = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    }
});

function drawLine(lx, az) {
        //This is how to post an order to make a line
        var linearX = lx;
        var angularZ = az;
        twist.linear.x = linearX;
        twist.angular.z = angularZ;
        cmdVelTopic.publish(twist);
}

function makeStar(){
    //This is an example of drawing
    //The timeout is for waiting the server make movement(s)
    for(var i = 0; i<6; i++){
        setTimeout(function(){
          drawLine(2.5,0.0);
        }, 2*i*1000); 
        setTimeout(function(){
          drawLine(0.0,-2.525252);
        }, 2*i*1000 + 1000);
  }
}
