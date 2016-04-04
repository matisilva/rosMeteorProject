# Proyecto ROS + Meteor
=======================

* Creo el nucleo
```
$ roscore
```

* Creo el nodo en modo simulacion con turtlesim
```
$ rosrun turtlesim turtlesim_node __name:=miTortuga
```

* Mando una instruccion de movimiento
```
$ rostopic pub /turtle1/cmd_vel geometry_msgs/Twist -r 1 -- '[0.0,0,0]' '[0.0,0,2.5]'
```
