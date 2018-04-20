import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Container, Card, Header, Loader, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MachineCard from '/imports/ui/components/MachineCard';
import { Machines } from '../../api/machine/machine';

/** Renders a page with all the washing machines as a MachineCard */
class ListMachines extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" style={{ marginTop: '12px' }}>Washing Machines</Header>
            {this.props.machines.length === 0 ?
                <Message>
                    <Message.Header>
                        No washing machines found!
                    </Message.Header>
                    <p>
                        It looks like either your dorm does not have any washing machines or you have not set your dorm. <br/>
                        <NavLink to='/preferences'>Click here</NavLink> to go to your preferences to set your dorm if you have not done so already.
                    </p>
                </Message>
                :
                <Card.Group>{this.props.machines.map((machine) => <MachineCard key={machine._id} machine={machine} />)}</Card.Group>}
        </Container>
    );
  }
}

/** Require an array of Machine documents in the props. */
ListMachines.propTypes = {
  machines: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Machine documents.
  const subscription = Meteor.subscribe('Machine');
  return {
    machines: Machines.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListMachines);
