import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders Machine card for the WashingMachineNotes. See pages/WashingMachineNotes.jsx. */
class MachineNotecard extends React.Component {

  render() {
    return (
        <Card>
          <Image
              src='/images/washer-card-image.png'/>
          <Card.Content>
            <Card.Header>
              {this.props.name}
            </Card.Header>
            <Card.Meta>
        <span className='date'>
          at {this.props.dorm}
        </span>
            </Card.Meta>
            <Card.Description>
              LG WM3270CW
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='checkmark'/>
              Available
            </a>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
MachineNotecard.propTypes = {
  name: PropTypes.string.isRequired,
  dorm: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MachineNotecard);
