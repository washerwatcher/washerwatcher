import React from 'react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { Feed, Image, Icon, Card, Grid, Segment, Header, Form, Button } from 'semantic-ui-react';
// import AutoForm from 'uniforms-semantic/AutoForm';
// import TextField from 'uniforms-semantic/TextField';
// import NumField from 'uniforms-semantic/NumField';
// import SelectField from 'uniforms-semantic/SelectField';
// import SubmitField from 'uniforms-semantic/SubmitField';
// import HiddenField from 'uniforms-semantic/HiddenField';
// import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import Note from '../components/Note';

/** Renders the Page for adding a document. */
class WashingMachineNotes extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  notes = [{
    createdAt: '4/12/18',
    note: 'breaks down all the time',
  },
    {
      createdAt: '4/18/18',
      note: "don't put too much detergent",
    },
  ];

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, quantity, condition, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered columns={2}>
          <Grid.Row>
            <Header as="h2" textAlign="center">Washing Machine Notes</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Image
                    src='https://assets.ajmadison.com/image/upload/c_limit,f_auto,fl_lossy.progressive,h_1000,q_auto,w_1000/v1/ajmadison/images/large_no_watermark/wm3270cw_lg_washer_1.jpg'/>
                <Card.Content>
                  <Card.Header>
                    Washer #1
                  </Card.Header>
                  <Card.Meta>
        <span className='date'>
          at Example dorm
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
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center'>Notes</Header>
              <Segment>
                <Feed>
                  {this.notes.map((note, index) => <Note key={index} note={note}/>)}
                </Feed>
              </Segment>
              <Header as='h3' textAlign='center'>Add Note</Header>
              <Segment>
                <Form>
                  <Form.Field>
                    <label>Add Note</label>
                    <input/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default WashingMachineNotes;
