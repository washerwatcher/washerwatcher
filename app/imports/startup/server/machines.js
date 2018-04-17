import { Meteor } from 'meteor/meteor';
import { Machines } from '../../api/machine/machine.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Machines.insert(data);
}

/** Initialize the collection if empty.
* Created here because we cannot use new Date() in JSON */
if (Machines.find().count() === 0) {
  console.log('Creating default machines');
  addData({ name: 'Machine 1', dorm: 'Frear Hall', inUse: 'Available',
    update: 'just finished using it', lastUpdated: new Date() });
  addData({ name: 'Machine 2', dorm: 'Hale Anuenu', inUse: 'Available',
    update: 'just finished using it', lastUpdated: new Date() });
  addData({ name: 'Machine 3', dorm: 'Gateway House', inUse: 'Available',
    update: 'just finished using it', lastUpdated: new Date() });
  addData({ name: 'Machine 4', dorm: 'Johnson Hall', inUse: 'Available',
    update: 'just finished using it', lastUpdated: new Date() });
}

 /** This subscription publishes only the documents associated with the logged in user and is within the same dorm */
Meteor.publish('Machine', function publish() {
  if (this.userId && Meteor.user().dorm) {
    return Machines.find({ dorm: Meteor.user().dorm });
  }
  return this.ready();
});
