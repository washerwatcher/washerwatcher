import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Table, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import SAdminUserTable from '/imports/ui/components/SAdminUserTable';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class Admin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Row>
            <Header as="h2" textAlign="center" className='top-header'>Users</Header>
          </Grid.Row>
          <Grid.Row>
            <Table celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Account</Table.HeaderCell>
                  <Table.HeaderCell>Role</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.userData.map(i => i._id !== Meteor.userId() && <SAdminUserTable key={i._id} user={i}/>)}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
Admin.propTypes = {
  userData: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// export default Admin;
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('userData');
  return {
    userData: Meteor.users.find().fetch(),
    ready: subscription.ready(),
  };
})(Admin);
