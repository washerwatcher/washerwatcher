import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Machines, MachineSchema } from '/imports/api/machine/machine';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class UpdateWasherStatus extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, dorm, inUse, update, lastUpdated, _id } = data;
    Machines.update(_id, { $set: { name, dorm, inUse, update, lastUpdated } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Update Washer</Header>
            <Header as='h4' textAlign='center'>{this.props.doc.name} at {this.props.doc.dorm}</Header>
            <AutoForm schema={MachineSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <SelectField name='inUse'/>
                <TextField name='update'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='name'/>
                <HiddenField name='dorm'/>
                <HiddenField name='lastUpdated' value={new Date()}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
UpdateWasherStatus.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Machine');
  return {
    doc: Machines.findOne(documentId),
    ready: subscription.ready(),
  };
})(UpdateWasherStatus);
