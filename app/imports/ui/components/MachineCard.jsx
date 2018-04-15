import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

function formatDate(data) {
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  return data.toLocaleTimeString('en-us', options);
}

class MachineCard extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.machine.name}
            </Card.Header>
            <Card.Meta>
              <span>
                Last updated: {formatDate(this.props.machine.lastUpdated)}
              </span>
            </Card.Meta>
            <Card.Description>
              {this.props.machine.inUse ? (
                  <span>In Use</span>
              ) : <span>Available</span>}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/notes/${this.props.machine._id}`}>Notes</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
MachineCard.propTypes = {
  machine: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MachineCard);
