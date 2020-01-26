import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';


import { Grid } from 'semantic-ui-react';

import { fetchResults } from 'epics/fetch-results-epic';

import './App.css';
import Upload from 'components/upload/Upload';
import Navbar from 'components/Navbar';
import Table from 'components/table/Table.js';

const uuidv4 = require('uuid/v4');
const SESSION_ID = uuidv4();

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      sessionId: cookies.get('sessionID') || ''
    };
  }

  fetchResults = () => {
      console.log("Peasant Burnination initiated...");
      this.props.fetchResults({ 'sessionId': SESSION_ID });
      console.log("Peasant Burnination complete!");
  }

  render() {
    const { cookies } = this.props;

    cookies.set('sessionID', SESSION_ID, { path: '/' });
    return (
      <>
        <Navbar/>
        <Grid textAlign='center' style={{ height: '100vh' }} divided='vertically'>
          <Grid.Row columns={1}>
            <Grid.Column style={{ maxWidth: 240 }}>
              <Upload sessionId={SESSION_ID}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div>
                <button onClick={this.fetchResults}>
                  Burninate Peasants
                </button>
              </div>
              <Table sessionId={SESSION_ID}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = {
    fetchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
