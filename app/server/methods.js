import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Machines } from '../imports/api/machine/machine';

Meteor.methods({
  removeMachine(machine) {
    check(machine, {
      _id: String,
      name: String,
      dorm: String,
    });
    try {
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'super-admin');
      if (!isAdmin) {
        throw new Meteor.Error('401', 'Access denied');
      } else {
        Machines.remove(machine);
      }
    } catch (exception) {
      throw new Meteor.Error('500', exception.message);
    }
  },
  addMachine(machine) {
    check(machine, {
      name: String,
      dorm: String,
      inUse: String,
      update: String,
      lastUpdated: Date,
    });
    try {
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'super-admin');
      if (!isAdmin) {
        throw new Meteor.Error('401', 'Access denied');
      } else {
        Machines.insert(machine);
      }
    } catch (exception) {
      throw new Meteor.Error('500', exception.message);
    }
  },
  updateMachine(machine) {
    check(machine, {
      _id: String,
      name: String,
      dorm: String,
      inUse: String,
      update: String,
      lastUpdated: Date,
    });
    try {
      const { _id, name, dorm, inUse, update, lastUpdated } = machine;
      Machines.update(_id, { $set: { name, dorm, inUse, update, lastUpdated } });
    } catch (exception) {
      throw new Meteor.Error('500', exception.message);
    }
  },
});
