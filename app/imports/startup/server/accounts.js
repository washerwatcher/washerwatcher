import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (role === 'super-admin') {
      Roles.addUsersToRoles(userID, 'super-admin');
  }
  if (role === 'user' || !role) {
      Roles.addUsersToRoles(userID, 'user');
  }
}

/** When a new account is created, ensure dorm field is added to the account */
/* eslint-disable */
Accounts.onCreateUser((options, user) => {
    user.dorm = Object.is(options.dorm, undefined) ? '' : options.dorm;
    if (options.profile) {
        user.profile = options.profile;
    }
    return user;
});
/* eslint-enable */

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

Meteor.publish(null, function publish() {
  if (this.userId) {
      return Meteor.users.find({ _id: Meteor.userId() }, { fields: { dorm: 1 } });
  }
  return this.ready();
});

Meteor.publish('userData', function publish() {
    if (this.userId) {
        if (Roles.userIsInRole(Meteor.userId(), 'super-admin')) {
            return Meteor.users.find({}, { fields: { username: 1, roles: 1 } });
        }
    }
    return this.ready();
});

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
    setRole(userData) {
        check(userData, {
            id: String,
            role: String,
        });
        try {
            if (Roles.userIsInRole(Meteor.userId(), 'super-admin')) {
                Roles.setUserRoles(userData.id, userData.role);
            }
        } catch (exception) {
            throw new Meteor.Error('500', exception.message);
        }
    }
});
