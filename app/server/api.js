import { Meteor } from 'meteor/meteor';
import { Machines } from '/imports/api/machine/machine';
import { Restivus } from 'meteor/nimble:restivus';

if (Meteor.isServer) {
    // Global API configuration
    const Api = new Restivus({
        useDefaultAuth: false,
        prettyJson: true,
    });

    // Generates: POST on /api/users and GET, DELETE /api/users/:id for
    // Meteor.users collection
    // Api.addCollection(Meteor.users, {
    //     excludedEndpoints: ['getAll', 'put', 'patch'],
    //     routeOptions: {
    //         authRequired: true,
    //     },
    //     endpoints: {
    //         post: {
    //             authRequired: false,
    //         },
    //         delete: {
    //             roleRequired: 'admin',
    //         },
    //     },
    // });

    // Maps to: /api/machines/:name
    Api.addRoute('machines/:name', { authRequired: false }, {
        get: function () {
            const machine = Machines.findOne({ name: this.urlParams.name });
            if (machine) {
                return machine;
            }
            return {
                statusCode: 404,
                body: { status: 'fail', message: 'Machine not found' },
            };
        },
        put: function () {
            if (this.request.body) {
                const machine = Machines.findOne({ name: this.urlParams.name });
                if (machine) {
                    if (Machines.update(machine, { $set: { inUse: this.request.body.inUse, lastUpdated: new Date() } })) {
                        return {
                            message: `Successfully updated machine ${this.urlParams.name}`,
                            machine: Machines.findOne({ name: this.urlParams.name }),
                        };
                    }
                } else {
                    return {
                        statusCode: 400,
                        body: { status: 'fail', message: 'Bad request' },
                    };
                }
            }
            return {
                statusCode: 404,
                body: { status: 'fail', message: 'Query failed' },
            };
        },
        delete: {
            roleRequired: ['author', 'admin'],
            action: function () {
                if (Machines.remove(this.urlParams.name)) {
                    return { status: 'success', data: { message: 'Machine removed' } };
                }
                return {
                    statusCode: 404,
                    body: { status: 'fail', message: 'Machine not found' },
                };
            },
        },
    });
}
