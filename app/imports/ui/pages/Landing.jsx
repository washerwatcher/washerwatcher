import React from 'react';
import { Grid, Icon, Header, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

        <div className='washerwatcher-landing-background'>
          <Grid>
            <Grid.Row centered>
              <Grid.Column textAlign='center'>
                <Header as='h1' inverted className='title'> Welcome to Washer Watcher!</Header>
                <Header as='h3' inverted className='subheader'>Know When a Washer is Available in Your Dorm</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='blankspace'>
            </Grid.Row>
          </Grid>

          <Grid stackable centered columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='group' inverted/>
              <Header as='h1' inverted>Individual Accounts</Header>
              <Header as='h3' inverted>When a user creates an account, it will be personalized towards them</Header>
              <Image src='/images/Register.PNG'/>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='file text' inverted/>
              <Header as='h1' inverted>View Washing Machine Availability</Header>
              <Header as='h3' inverted>See the availability of every washing machine in your dorm</Header>
              <Image src='/images/Availability.PNG'/>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='checked calendar' inverted/>
              <Header as='h1' inverted>Timestamped Notes</Header>
              <Header as='h3' inverted>View and add timestamped notes about your washer</Header>
              <Image src='/images/Notes.PNG'/>
            </Grid.Column>
            <Grid.Row className='blankspace'>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row centered>
              <Grid.Column textAlign='center'>
                <Header as='h1' inverted className='instruct'> To get started, login or register now</Header>
                <Button className='buttoning' as={NavLink} activeClassName="active" exact to="/signin" key='signin'>Log In</Button>
                <Button as={NavLink} activeClassName="active" exact to="/signup" key='signup'>Register Now</Button>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='blankspace'>
            </Grid.Row>
          </Grid>


        </div>
    );
  }
}

export default Landing;
