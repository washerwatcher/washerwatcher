import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Modal, Grid, Header, Segment, Container } from 'semantic-ui-react';
import { MachineSchema } from '/imports/api/machine/machine';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NoteFeed from '../components/NoteFeed';
import AddNote from '../components/AddNote';

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MachineActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, dorm, inUse, update, lastUpdated } = data;
    const _id = this.props.machine._id;
    const machine = { _id, name, dorm, inUse, update, lastUpdated };
    Meteor.call('updateMachine', machine, this.updateCallback);
  }

  updateCallback = (error) => {
    if (error) {
      Bert.alert({ type: 'danger', message: `Update failed: ${error.message}`, style: 'growl-bottom-right' });
    }

    Bert.alert({ type: 'success', message: 'Update succeeded', style: 'growl-bottom-right' });
  }

  render() {
    return (
        <Modal trigger={<Button floated='right' onClick={this.handleOpen}>Show Modal</Button>}
               open={this.state.modalOpen} onClose={this.handleClose} style={inlineStyle.modal}>
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
                    <AutoForm schema={MachineSchema} onSubmit={this.submit}>
                      <Segment>
                        <SelectField name='inUse'/>
                        <TextField name='update' placeholder="What's changed?"/>
                        <div className='right-button'>
                          <SubmitField value='Submit'/>
                        </div>
                        <ErrorsField/>
                        <HiddenField name='name' value={this.props.machine.name}/>
                        <HiddenField name='dorm' value={this.props.machine.dorm}/>
                        <HiddenField name='lastUpdated' value={new Date()}/>
                      </Segment>
                    </AutoForm>
                  </Grid.Row>
                </Container>
                <Container>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as='h4' textAlign='center'
                              style={{ paddingTop: '12px' }}>Notes</Header>
                      <NoteFeed
                          notes={this.props.notes.filter(machine => machine.machineId === this.props.machine._id)}/>
                      <Header as='h4' textAlign='center'>Add Note</Header>
                      <AddNote machineId={this.props.machine._id}/>
                    </Grid.Column>
                  </Grid.Row>
                </Container>
              </Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button negative icon='close' labelPosition='right' content='Close' onClick={this.handleClose}/>
          </Modal.Actions>
        </Modal>
    );
  }
}

/** Require a document to be passed to this component. */
MachineActions.propTypes = {
  machine: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MachineActions);
