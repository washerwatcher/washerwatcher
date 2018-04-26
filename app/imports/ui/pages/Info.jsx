import React from 'react';
import { Container, List, Header } from 'semantic-ui-react';
import InfoItem from '/imports/ui/components/InfoItem';

const info = [
  { key: 1, question: 'What is Washer Watcher?', answer: 'Washer watcher is an interactive app that allows students' +
    ' in the UH Manoa dorms to view washer availabilities in their dorm. This is to prevent the user from walking down' +
    ' to the washroom, only to find that every washer is being used.' },
  { key: 2, question: 'How do I use Washer Watcher?', answer: 'First, sign up or register for an account. Select your' +
    ' dorm and then click the Washer Availability tab to view washer availability in your dorm. If you plan to use ' +
    ' a washer, you can click the Show Modal button to update the status of the washer to be used. ' },
  { key: 3, question: 'Do I have to manually change the status of a washer?', answer: 'At this point in time, yes.' +
    ' The hope is eventually a Raspberry Pi can be used to detect the motion of a washer, and thus can be used to ' +
    ' automatically change its status. We already have http request setup, we just dont have the hardware at the moment.'
    + ' There is potential for automatic machine status updates.' },
  { key: 4, question: 'Can I help with this project?', answer: 'Sure! If you want to contact any of us, you can find' +
    ' our contact info on the washerwatcher.github.io page.'},
  { key: 5, question: 'Where can I find more information on the UH Manoa laundry services?', answer: 'You can find' +
    ' more information here: https://manoa.hawaii.edu/housing/guide/laundry'},
];

/** Renders a page that contains FAQ / Info */
class Info extends React.Component {
  /** Render the page. */
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center" className='top-header'>FAQ / Info</Header>
          <List>
            {info.map((item) => <InfoItem key={item.key} item={item} />)}
          </List>
        </Container>
    );
  }
}

export default Info;
