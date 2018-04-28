import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Modal, Button, Form } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { dormOptions } from '../../common/dorms';
import { statusOptions } from '../../common/machinestatus';

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

/** Renders the Page for adding a document. */
class AddWasher extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { name: '', dorm: '', inUse: '', update: '', lastUpdated: '', error: '', modalOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { name, dorm, inUse, update } = this.state;
    const lastUpdated = new Date();
    Meteor.call('addMachine', { name, dorm, inUse, update, lastUpdated }, this.insertCallback);
    this.handleModalClose();
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to add machine: ${error.message}`, style: 'growl-bottom-right' });
    } else {
      Bert.alert({ type: 'success', message: 'Successfully added machine', style: 'growl-bottom-right' });
    }
  }

  handleModalOpen() {
    this.setState({ modalOpen: true });
  }

  handleModalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
        <Modal trigger={<Button color='green' onClick={this.handleModalOpen}>Add Machine</Button>}
               open={this.state.modalOpen} onClose={this.handleModalClose} style={inlineStyle.modal}>
          <Modal.Header>Add a Machine</Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                  label="Name"
                  name="name"
                  placeholder="Enter a name"
                  onChange={this.handleChange}
              />
              <Form.Dropdown
                  placeholder='Select Dorm'
                  search selection
                  name='dorm'
                  label='Dorm'
                  options={dormOptions.slice(1)}
                  onChange={this.handleChange}
              />
              <Form.Dropdown
                  placeholder='Select status'
                  selection
                  name='inUse'
                  label='Status'
                  options={statusOptions}
                  onChange={this.handleChange}
              />
              <Form.Input
                  placeholder='Give an update message for this machine'
                  name='update'
                  label='Update Message'
                  onChange={this.handleChange}
              />
              <Form.Button content="Submit"/>
            </Segment>
          </Form>
        </Modal>
    );
  }
}

export default AddWasher;
