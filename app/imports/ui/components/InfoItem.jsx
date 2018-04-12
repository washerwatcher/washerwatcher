import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class InfoItem extends React.Component {
  render() {
    return (
        <List.Item>
          <List.Content>
            <List.Header>
              {this.props.item.question}
            </List.Header>
            {this.props.item.answer ? (
                <List.Description>
                  {this.props.item.answer}
                </List.Description>
            ) : ''}
          </List.Content>
        </List.Item>
    );
  }
}

/** Require a document to be passed to this component. */
InfoItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(InfoItem);
