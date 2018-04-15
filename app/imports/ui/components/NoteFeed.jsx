import React from 'react';
import { Segment, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Note from '../components/Note';

/** Renders the note feed for WashingMachineNotes table. See pages/WashingMachineNotes */
class NoteFeed extends React.Component {

  render() {
    return (this.props.notes.length > 0) ? this.renderFeed() : this.renderFiller();
  }

  renderFeed() {
    return (
        <Segment>
          <Feed>
            {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
          </Feed>
        </Segment>
    );
  }

  renderFiller() {
    return (
        <Segment>
          <Feed>
            <Feed.Content>
              There are no notes. Add one!
            </Feed.Content>
          </Feed>
        </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
NoteFeed.propTypes = {
  notes: PropTypes.array,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(NoteFeed);
