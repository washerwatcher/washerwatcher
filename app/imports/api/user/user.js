import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    updateUserDorm(userData) {
        check(userData, {
            id: String,
            dorm: String,
        });
        try {
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
