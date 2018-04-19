import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Modal, Grid, Header, Segment, Container } from 'semantic-ui-react';
import { Machines, MachineSchema } from '/imports/api/machine/machine';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Notes } from '../../api/note/note';
import AddNote from '../components/AddNote';
import NoteFeed from '../components/NoteFeed';

function formatDate(data) {
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  return data.toLocaleTimeString('en-us', options);
}

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};

class MachineCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.machine.name}
            </Card.Header>
            <Card.Meta>
              <p>
                  Location: {this.props.machine.dorm}
              </p>
              <p>
                Last updated: {formatDate(this.props.machine.lastUpdated)}
              </p>
            </Card.Meta>
            <Card.Description>
              <span>{this.props.machine.inUse}</span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} to={`/notes/${this.props.machine._id}`}>Notes</Button>
            <Button floated='right' as={Link} to={`/update/${this.props.machine._id}`}>Update</Button>
          </Card.Content>
            <Card.Content extra>
                <Modal trigger={<Button onClick={this.handleOpen}>Show Modal</Button>} open={this.state.modalOpen} onClose={this.handleClose} style={inlineStyle.modal}>
                    <Modal.Header>
                        Update Washer
                        <br/>
                        {this.props.machine.name} at {this.props.machine.dorm}
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <Grid container centered>
                            <Grid.Column>
                                <Container>
                                    <Grid.Row>
                                        <Header as='h4' textAlign='center'>Update Status</Header>
                                        <AutoForm schema={MachineSchema} onSubmit={this.submit} model={this.props.machine}>
                                            <Segment>
                                                <SelectField name='inUse'/>
                                                <TextField name='update'/>
                                                <SubmitField value='Submit'/>
                                                <ErrorsField/>
                                                <HiddenField name='name'/>
                                                <HiddenField name='dorm'/>
                                                <HiddenField name='lastUpdated' value={new Date()} />
                                            </Segment>
                                        </AutoForm>
                                    </Grid.Row>
                                </Container>
                                <Container>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header as='h4' textAlign='center'>Notes</Header>
                                            <NoteFeed notes={this.props.notes} />
                                            <Header as='h4' textAlign='center'>Add Note</Header>
                                            <AddNote machineId={this.props.machine._id} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative icon='close' labelPosition='right' content='Close' onClick={this.handleClose} />
                    </Modal.Actions>
                </Modal>
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
