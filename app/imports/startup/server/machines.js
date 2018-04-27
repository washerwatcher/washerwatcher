import { Meteor } from 'meteor/meteor';
import { Machines } from '../../api/machine/machine.js';
import { dormOptions } from '../../common/dorms';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Machines.insert(data);
}

/** Initialize the collection if empty.
 * Created here because we cannot use new Date() in JSON */
if (Machines.find().count() === 0) {
  console.log('Creating default machines');

  for (let i = 0; i < 3; i++) {
    for (let j = 1; j < dormOptions.length; j++) {
      addData({
        name: `Machine ${i}${j}`, dorm: dormOptions[j].value, inUse: 'Available',
        update: 'just finished using it', lastUpdated: new Date()
      });
    }
  }
}

/** This subscription publishes only the documents associated with the logged in user and is within the same dorm */
Meteor.publish('Machine', function publish() {
  if (this.userId) {
    const dorm = Meteor.user().dorm;
    if (dorm && dorm !== 'All') {
      return Machines.find({ dorm });
    }
    return Machines.find({});
  }
  return this.ready();
});
