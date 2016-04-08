import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.yourLayout.created = function() {
  $('head').append('<script type="text/javascript" src="lib/eventemitter2.min.js">');
  $('head').append('<script type="text/javascript" src="lib/roslib.min.js">');
  $('head').append('<script type="text/javascript" src="turtleChallenge.js">');
}
