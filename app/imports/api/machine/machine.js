import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Machines = new Mongo.Collection('Machines');

/** Create a schema to constrain the structure of documents associated with this collection. */
const MachineSchema = new SimpleSchema({
  name: String,
  dorm: String,
  inUse: {
    type: String,
    allowedValues: ['Available', 'In Use', 'Out of Order'],
    defaultValue: 'Available',
  },
  update: String,
  lastUpdated: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Machines.attachSchema(MachineSchema);

/** Make the collection and schema available to other code. */
export { Machines, MachineSchema };
