import React from 'react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { Button, Grid, Segment, Header, Form, Input } from 'semantic-ui-react';
// import AutoForm from 'uniforms-semantic/AutoForm';
// import TextField from 'uniforms-semantic/TextField';
// import NumField from 'uniforms-semantic/NumField';
// import SelectField from 'uniforms-semantic/SelectField';
// import SubmitField from 'uniforms-semantic/SubmitField';
// import HiddenField from 'uniforms-semantic/HiddenField';
// import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import DropdownStatusSelection from '../components/DropdownStatusSelection';

/** Renders the Page for adding a document. */
class UpdateWasherStatus extends React.Component {

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
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, quantity, condition, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Update Washing Machine</Header>
            <Header as='h4' textAlign='center'>Washer #1</Header>
            <Segment>
              <Header as='h4'>Update Availability</Header>
              <DropdownStatusSelection />
              <Form>
                <Form.Field>
                  <Header as='h4' style={{marginTop: '14px'}}>Add Note(optional)</Header>
                  <Input />
                </Form.Field>
                <Button type='submit'>Submit</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
    );
  }
}

export default UpdateWasherStatus;
