import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px'};
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container" color='grey'>
            <hr />
              Washer Watcher <br />
              ICS 314
          </div>
        </footer>
    );
  }
}

export default Footer;
