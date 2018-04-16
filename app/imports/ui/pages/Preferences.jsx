import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

const dormOptions = [
    { value: 'Frear Hall', text: 'Frear Hall' },
    { value: 'Gateway House', text: 'Gateway House' },
    { value: 'Hale Anuenu', text: 'Hale Anuenue' },
    { value: 'Hale Laulima', text: 'Hale Laulima' },
    { value: 'Hale Kahawai', text: 'Hale Kahawai' },
    { value: 'Johnson Hall', text: 'Johnson Hall' },
    { value: 'Hale Aloha Ilima', text: 'Hale Aloha Ilima' },
    { value: 'Hale Aloha Lehua', text: 'Hale Aloha Lehua' },
    { value: 'Hale Aloha Lokelani', text: 'Hale Aloha Lokelani' },
    { value: 'Hale Aloha Mokihana', text: 'Hale Aloha Mokihana' },
];

/**
 * User preferences page
 */
class Preferences extends React.Component {
    /** Initialize state fields. */
    constructor(props) {
        super(props);
        this.state = { dorm: '', error: '' };
        // Ensure that 'this' is bound to this component in these two functions.
        // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.insertCallback = this.insertCallback.bind(this);
    }

    /** Notify the user of the results of the submit. If successful, clear the form. */
    insertCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Settings not saved!: ${error.message}` });
        } else {
            Bert.alert({ type: 'success', message: 'Saved settings' });
        }
    }

    /** Update the form controls each time the user interacts with them. */
    handleChange(e, data) {
        this.setState({ dorm: data.value });
    }

    /** Handle preference settings */
    handleSubmit() {
        if (this.state.dorm) {
            const userData = {
                id: Meteor.userId(),
                dorm: this.state.dorm,
            };

            Meteor.call('updateUserDorm', userData, this.insertCallback);
        }
    }

    /** Display the preferences form. */
    render() {
        return (
            <Container>
                <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
                    <Grid.Column>
                        <Header as="h2" textAlign="center">
                            Preferences
                        </Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Dropdown
                                    placeholder='Select Dorm'
                                    search selection
                                    label='Dorm'
                                    options={dormOptions}
                                    onChange={this.handleChange}
                                />
                                <Form.Button content="Save"/>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

/** Require an array of Machine documents in the props. */
Preferences.propTypes = {
    userData: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to UserData.
    const subscription = Meteor.subscribe('UserData');
    return {
        userData: Meteor.users.findOne(),
        ready: subscription.ready(),
    };
})(Preferences);
