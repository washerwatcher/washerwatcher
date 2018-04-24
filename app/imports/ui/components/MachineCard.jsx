import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Card } from 'semantic-ui-react';
import { Machines } from '/imports/api/machine/machine';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Notes } from '../../api/note/note';
import WasherStatus from '../components/WasherStatus';
import MachineActions from '../components/MachineActions';

function formatDate(data) {
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  return data.toLocaleTimeString('en-us', options);
}

class MachineCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      canModify: Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'super-admin'),
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
  }

  getCardColor(status) {
    if (status === 'Available') {
      return 'available';
    } else if (status === 'In Use') {
      return 'in-use';
    }
    return 'out-of-order';
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, dorm, inUse, update, lastUpdated, _id } = data;
    Machines.update(_id, { $set: { name, dorm, inUse, update, lastUpdated } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Machine could not be deleted: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Machine deleted' });
    }
  }

  handleDelete() {
    const machine = this.props.machine;
    Meteor.call('removeMachine', { _id: machine._id, name: machine.name, dorm: machine.dorm }, this.deleteCallback);
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.machine.name}
              {this.state.canModify &&
              <Button basic floated='right' size='tiny' icon='close' onClick={this.handleDelete}/>}
            </Card.Header>
            <Card.Meta>
              <p>Location: {this.props.machine.dorm}</p>
              <p>Last updated: {formatDate(this.props.machine.lastUpdated)}</p>
            </Card.Meta>
            <Card.Description>
              <span>{this.props.machine.update}</span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign='left' className={this.getCardColor(this.props.machine.inUse)}>
              <Card.Description>
                <WasherStatus inUse={this.props.machine.inUse} />
                <MachineActions machine={this.props.machine} notes={this.props.notes} />
              </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
MachineCard.propTypes = {
  machine: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withRouter(withTracker(() => {
  const subscription = Meteor.subscribe('Notes');
  return {
    notes: Notes.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MachineCard));
