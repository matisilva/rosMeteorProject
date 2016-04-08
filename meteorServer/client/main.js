//Global variables.They will define the turtle's position
pos = {
  x : 0, 
  y : 0,
  z : 0,
  li: 0,
  av: 0,
  t : 0
};
stateX=null;
stateY=null;
// These lines create a message that conforms to the structure of the Twist 
// defined in our ROS installation
twist = new ROSLIB.Message({
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


// This function connects to the rosbridge server running on the local computer 
//on port 9090
rbServer = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
 });

// This function is called upon the rosbridge connection event
rbServer.on('connection', function() {
     // Write appropriate message to #feedback div when successfully connected 
     // to rosbridge
     var fbDiv = document.getElementById('feedback');
     fbDiv.innerHTML += "<p>Connected to websocket server.</p>";
 });

//Is called when there is an error attempting to connect to rosbridge
rbServer.on('error', function(error) {
    // Write appropriate message to #feedback div upon error when attempting 
    //to connect to rosbridge
    var fbDiv = document.getElementById('feedback');
    fbDiv.innerHTML += "<p>Error connecting to websocket server.</p>";
});

// This function is called when the connection to rosbridge is closed
rbServer.on('close', function() {
    // Write appropriate message to #feedback when closing connection
    var fbDiv = document.getElementById('feedback');
    fbDiv.innerHTML += "<p>Connection to websocket server closed.</p>";
 });

//This creates a topic that will be used for sending movements
cmdVelTopic = new ROSLIB.Topic({
    ros : rbServer,
    name : '/turtle1/cmd_vel',
    messageType : 'geometry_msgs/Twist'
});

//This creates a topic that will be used for receiving movements
pose = new ROSLIB.Topic({
    ros : rbServer,
    name : '/turtle1/pose',
    messageType : 'turtlesim/Pose'
});

// Subscribing at turtle1/pose movements
pose.subscribe(function(message) {
    // only draw when position change
    if (message.x != pos.x || message.y != pos.y || message.z != pos.z || 
        message.theta != pos.t ||message.linear_velocity != pos.li || 
        message.angular_velocity != pos.av){
        //Upgrading position structure
        pos.x = message.x;
        pos.y = message.y;
        document.getElementById("x").value = pos.x
        document.getElementById("y").value = pos.y
        pos.z = message.z;
        pos.t = message.theta;
        pos.li = message.linear_velocity;
        pos.av = message.angular_velocity;
        //Plot the movement
        drawTo(pos.x,pos.y);
    }
});

//Send a message to the turtle to make a move
makeMove = function(lx, az) {
        //This is how to post an order to make a line
        var linearX = lx;
        var angularZ = az;
        twist.linear.x = linearX;
        twist.angular.z = angularZ;
        cmdVelTopic.publish(twist);
}

//Make a line in canvas upgrading the movement of turtle in host
drawTo = function(x,y) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var xScaled = x*500/11;
    var yScaled = 500-(y*500/11);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "white";
    if(stateX == null){
        stateX = xScaled;
    }
    if(stateY == null){
        stateY = yScaled;
    }
    ctx.moveTo(stateX,stateY);
    ctx.lineTo(xScaled,yScaled);
    ctx.stroke();
    stateX = xScaled;
    stateY = yScaled;
}

//Example of a figure, a star...
makeStar = function(){
    //This is an example of drawing
    //The timeout is for waiting the server make movement(s)
    for(var i = 0; i<6; i++){
        setTimeout(function(){
          makeMove(2.5,0.0);
        }, 2*i*1000); 
        setTimeout(function(){
          makeMove(0.0,-2.525252);
        }, 2*i*1000 + 1000);
  }
}
