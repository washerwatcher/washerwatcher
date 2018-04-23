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
                throw new Meteor.Error('403', 'Access denied');
            }

            Machines.remove(machine);
        } catch (exception) {
            throw new Meteor.Error('500', exception.message);
        }
    },
});
