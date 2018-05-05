import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class WasherStatus extends React.Component {

  getIconName(status) {
    if (status === 'Available') {
      return 'checkmark';
    } else if (status === 'In Use') {
      return 'remove';
    }
    return 'frown';
  }

  render() {
    return (
        <div className='status'>
          <Icon name={this.getIconName(this.props.inUse)}/>{this.props.inUse}
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
WasherStatus.propTypes = {
  inUse: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(WasherStatus);
