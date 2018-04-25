import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AvailabilityCount extends React.Component {

  getAvailable(machines) {
    const available = machines.filter((machine) => (machine.inUse === 'Available'));
    return available.length;
  }

  render() {
    return (
        <span>
          {this.getAvailable(this.props.machines)}/
          {this.props.machines.length} Available
        </span>
    );
  }
}

/** Require a document to be passed to this component. */
AvailabilityCount.propTypes = {
  machines: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AvailabilityCount);
