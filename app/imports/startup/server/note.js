import { Meteor } from 'meteor/meteor';
import { Notes } from '../../api/note/note.js';

/** This subscription publishes all notes */
Meteor.publish('Notes', function publish() {
  if (true) {
    return Notes.find();
  }
  return this.ready();
});
