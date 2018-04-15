import React from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Machines } from '../../api/machine/machine';
import { Notes } from '../../api/note/note';
import AddNote from '../components/AddNote';
import NoteFeed from '../components/NoteFeed';
import MachineNotecard from '../components/MachineNotecard';

/** Renders the Page for adding a document. */
class WashingMachineNotes extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    console.log(this.props.doc.name);
    console.log(this.props.doc.dorm);
    return (
        <Grid container centered columns={2}>
          <Grid.Row>
            <Header as="h2" textAlign="center">Washing Machine Notes</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <MachineNotecard name={this.props.doc.name} dorm={this.props.doc.dorm} />
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center'>Notes</Header>
              <NoteFeed notes={this.props.notes} />
              <Header as='h3' textAlign='center'>Add Note</Header>
              <AddNote machineId={this.props.doc._id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require the presence of a Machine document in the props object
 * as well as a notes array.
 * Uniforms adds 'model' to the props, which we use. */
WashingMachineNotes.propTypes = {
  doc: PropTypes.object,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // console.log(documentId);
  // Get access to Contacts documents.
  const subscription = Meteor.subscribe('Notes');
  const subscription2 = Meteor.subscribe('Machine');
  return {
    doc: Machines.findOne(documentId),
    notes: Notes.find({ machineId: documentId }).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(WashingMachineNotes);
