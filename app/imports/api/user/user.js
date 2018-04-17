import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    updateUserDorm(userData) {
        check(userData, {
            id: String,
            dorm: String,
        });
        try {
            if (Meteor.userId() !== userData.id) {
                throw new Meteor.Error('Invalid user ID', 'Cannot update the data of a different user!');
            }

            Meteor.users.update(userData.id, {
                $set: {
                    dorm: userData.dorm,
                },
            });
        } catch (exception) {
            throw new Meteor.Error('500', exception.message);
        }
    },
});
