import React from 'react';
import { Container, List, Header } from 'semantic-ui-react';
import InfoItem from '/imports/ui/components/InfoItem';

const info = [
  { key: 1, question: 'This is a placeholder for a question (1)', answer: 'Answer to some question #1' },
  { key: 2, question: 'This is a placeholder for some question (2)', answer: 'This is an answer to some question #2' },
  { key: 3, question: 'Cost per use of a washer is (some value)' },
  { key: 4, question: 'You can contact xxx-xxx-xxxx for more information'},
];

/** Renders a page that contains FAQ / Info */
class Info extends React.Component {
  /** Render the page. */
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">FAQ / Info</Header>
          <List>
            {info.map((item) => <InfoItem key={item.key} item={item} />)}
          </List>
        </Container>
    );
  }
}

export default Info;
