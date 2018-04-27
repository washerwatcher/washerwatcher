import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return this.state.width <= 720 ? this.renderMobile() : this.renderDesktop();
  }

  renderMobile() {
    return (
        <Menu attached="top" borderless inverted color='grey'>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>Washer Watcher</Header>
          </Menu.Item>
          <Menu.Item position='right'>
            <Dropdown icon='content' text='Menu' direction='left' pointing='top right'>
              <Dropdown.Menu>
                {this.props.currentUser ? (
                    [<Dropdown.Item as={NavLink} activeClassName="active" exact to="/machines" key='machines'>Check
                      Availability</Dropdown.Item>,
                      <Dropdown.Item as={NavLink} activeClassName="active" exact to="/faq"
                                     key='faq'>FAQ</Dropdown.Item>]
                ) : ''}
                {Roles.userIsInRole(Meteor.userId(), 'super-admin') ? (
                    <Dropdown.Item as={NavLink} activeClassName="active" exact to="/admin"
                                   key='admin'>Admin</Dropdown.Item>
                ) : ''}
                <Dropdown.Item>
                  {this.props.currentUser === '' ? (
                      <Dropdown text="Login" pointing="top right" icon={'user'}>
                        <Dropdown.Menu>
                          <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                          <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                        </Dropdown.Menu>
                      </Dropdown>
                  ) : (
                      <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                        <Dropdown.Menu>
                          <Dropdown.Item icon="remove user" text="Sign Out" as={NavLink} exact to="/signout"/>
                          <Dropdown.Item icon='settings' text='Preferences' as={NavLink} exact to={'/preferences'}/>
                        </Dropdown.Menu>
                      </Dropdown>
                  )}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
    );
  }

  renderDesktop() {
    return (
        <Menu attached="top" borderless inverted color='grey'>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>Washer Watcher</Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/machines" key='machines'>Check
                Availability</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/faq" key='faq'>FAQ</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'super-admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="remove user" text="Sign Out" as={NavLink} exact to="/signout"/>
                    <Dropdown.Item icon='settings' text='Preferences' as={NavLink} exact to={'/preferences'}/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
