import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SAdminUserTable extends React.Component {
    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    constructor(props) {
        super(props);
        this.state = { isAdmin: '' };
        this.handleClick = this.handleClick.bind(this);
        this.setRoleCallback = this.setRoleCallback.bind(this);
    }

    handleClick() {
        const isAdmin = this.props.user.roles.includes('admin');
        const role = isAdmin ? 'user' : 'admin';
        const data = { id: this.props.user._id, role: role };
        this.setState({ isAdmin: isAdmin });
        Meteor.call('setRole', data, this.setRoleCallback);
    }

    setRoleCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Could not set role: ${error.message}`, style: 'growl-bottom-right' });
        } else {
            Bert.alert({ type: 'success', message: 'Successfully changed user role', style: 'growl-bottom-right' });
        }
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.user.username}</Table.Cell>
                <Table.Cell>{this.props.user.roles}</Table.Cell>
                <Table.Cell>
                    {this.props.user.roles.includes('admin') ? <Button color='red' onClick={this.handleClick}>Revoke Admin</Button> : <Button color='green' onClick={this.handleClick}>Give Admin</Button>}
                </Table.Cell>
            </Table.Row>
        );
    }
}

/** Require a document to be passed to this component. */
SAdminUserTable.propTypes = {
    user: PropTypes.object.isRequired,
};

export default SAdminUserTable;
