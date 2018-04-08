import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='washerwatcher-landing-background'>
          <Grid container stackable centered columns={3}>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='file text' inverted/>
              <Header as='h1' inverted>Know When a Washing Machine is Available in Your Dorm</Header>
              <Header as='h3' inverted>For each washer, you can see its current status</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='group' inverted/>
              <Header as='h1' inverted>Individual Accounts</Header>
              <Header as='h3' inverted>When a user creates an account, it will be personalized towards them</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='checked calendar' inverted/>
              <Header as='h1' inverted>Timestamped Notes</Header>
              <Header as='h3' inverted>The time when a washer's status changes is shown. Also, other timestamped notes,
              such as tips or problems will also be timestamped.</Header>
            </Grid.Column>

          </Grid>
        </div>
    );
  }
}

export default Landing;
