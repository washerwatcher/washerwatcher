import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Table } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import SAdminUserTable from '/imports/ui/components/SAdminUserTable';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class Admin extends React.Component {

    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.insertCallback = this.insertCallback.bind(this);
        this.formRef = null;
    }

    /** Notify the user of the results of the submit. If successful, clear the form. */
    insertCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
        } else {
            Bert.alert({ type: 'success', message: 'Add succeeded' });
            this.formRef.reset();
        }
    }

    /** On submit, insert the data. */
    submit(data) {
        const { name, dorm, inUse, lastUpdated } = data;
        const owner = Meteor.user().username;
        Machines.insert({ name, dorm, inUse, lastUpdated, owner }, this.insertCallback);
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        return (
            <Grid container centered>
                <Grid.Row>
                    <Header as="h2" textAlign="center">Users</Header>
                </Grid.Row>
                <Grid.Row>
                    <Table celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Account</Table.HeaderCell>
                                <Table.HeaderCell>Role</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.props.userData.map(i => i._id !== Meteor.userId() && <SAdminUserTable key={i._id} user={i} />)}
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>
        );
    }
}

/** Require a document to be passed to this component. */
Admin.propTypes = {
    user: PropTypes.object.isRequired,
    userData: PropTypes.array.isRequired,
};

// export default Admin;
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('userData');
    return {
        userData: Meteor.users.find().fetch(),
        ready: subscription.ready(),
    };
})(Admin);
