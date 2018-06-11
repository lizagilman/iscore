import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

const styles = {
  bread: {
    marginLeft: '10px',
  },
  paper: {
    height: '100%',
    width: '100%',
    display: 'block',
  },
  link: {
    display: 'inline-block',
    fontSize: '1em',
    color: 'black',
    height: '20px',
    width: '40px',
  },
  appBar: {
    height: '100%,',
    width: '1000%',
  },
  tabs: {
    width: '100%',
  },
};

class UmpireHeader extends React.Component {
  constructor(props) {
    super(props);

    this.modifyLinks = this.modifyLinks.bind(this);

    this.state = {
      links: [],
    };
  }

  modifyLinks = (title, url, act) => {
    const links = [...this.state.links];
    console.log('modifyLinks links: ', links);
    if (act === 'add') {
      links.push({ url, title });
    } else if (act === 'pop') {
      links.pop();
    }
    this.setState({ links });
  };

  componentWillMount() {
    this.modifyLinks(this.props.title, this.props.url, this.props.act);
  }

  render() {
    const showLink = link => (
       <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">

            <FlatButton style={styles.bread} />
              <Link to={link.url}>
                  {link.title}
              </Link>
            <ToolbarSeparator />

       </div>
    );
    return (
      <div>

          <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <AppBar
                  title={`iSCORE    Welcome ${this.props.first_name} ${
                    this.props.last_name
                  }`}
                />
              </div>
          </div>
         <Toolbar>
              <div className="row">
                <ToolbarGroup>
                    {
                        this.state.links[0] ?
                                showLink(this.state.links[0]) : ''
                    }
                    {
                        this.state.links[1] ?
                                showLink(this.state.links[1]) : ''
                    }
                    {
                        this.state.links[2] ?
                                showLink(this.state.links[2]) : ''
                    }
                </ToolbarGroup>
              </div>
         </Toolbar>

      </div>
    );
  }
}

export default (UmpireHeader);
