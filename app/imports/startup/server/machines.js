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
  addData({ name: 'Machine 1', dorm: 'Dorm 1', inUse: false, lastUpdated: new Date() });
  addData({ name: 'Machine 2', dorm: 'Dorm 2', inUse: false, lastUpdated: new Date() });
  addData({ name: 'Machine 3', dorm: 'Dorm 3', inUse: false, lastUpdated: new Date() });
  addData({ name: 'Machine 4', dorm: 'Dorm 4', inUse: false, lastUpdated: new Date() });
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Machine', function publish() {
  if (this.userId) {
    return Machines.find();
  }
  return this.ready();
});
