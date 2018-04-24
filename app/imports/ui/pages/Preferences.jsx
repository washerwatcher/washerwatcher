import React from 'react';
import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
import { Container, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
// import PropTypes from 'prop-types';
import { dormOptions } from '../../common/dorms';

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
            const data = {
                id: Meteor.userId(),
                dorm: this.state.dorm,
            };

            Meteor.call('updateUserDorm', data, this.insertCallback);
        }
    }

    /** Display the preferences form. */
    render() {
        return (
            <Container>
                <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
                    <Grid.Column>
                        <Header as="h2" textAlign="center" className='top-header'>
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
                                <div className='right-button'>
                                  <Form.Button content="Save"/>
                                </div>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

// /** Require user data to be supplied in props */
// Preferences.propTypes = {
//     userData: PropTypes.object.isRequired,
//     ready: PropTypes.bool.isRequired,
// };
//
// /** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
// export default withTracker(() => {
//     // Get access to UserData.
//     const subscription = Meteor.subscribe('UserData');
//     return {
//         userData: Meteor.user(),
//         ready: subscription.ready(),
//     };
// })(Preferences);

export default Preferences;
