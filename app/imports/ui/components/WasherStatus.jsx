import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class WasherStatus extends React.Component {

  getIconName(status) {
    if (status === 'Available') {
      return 'checkmark';
    }
    else if (status === 'In Use') {
      return 'remove';
    }
    else {
      return 'frown';
    }
  }

  render() {
    return (
        <Card.Description>
          <Icon name={this.getIconName(this.props.inUse)}/>{this.props.inUse}
        </Card.Description>
    );
  }
}

/** Require a document to be passed to this component. */
WasherStatus.propTypes = {
  inUse: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(WasherStatus);
