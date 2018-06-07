import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const styles = {
    link:{
        display:'inline-block',
        fontSize:'1em',
        color:'black',

    },
    appBar: {
        flexWrap: 'wrap',
    },
    tabs: {
        width: '100%',
    },
};

class UmpireHeader extends React.Component {
    constructor(props) {
        super(props);
       // this.handleCallToRouter = this.handleCallToRouter.bind(this);
        this.modifyLinks=this.modifyLinks.bind(this);
        this.showLink=this.showLink.bind(this);

        this.state={
            links:[],
        }
    }
    //
    // handleCallToRouter = (value) => {
    //     debugger
    //     this.props.history.push(value);
    // };

    modifyLinks=(title,url,act)=>{
        debugger
        let links=[...this.state.links];
        console.log('modifyLinks links: ',links);
        if(act==='add'){
            links.push({url:url,title:title});
        }
        else if(act==='pop'){
            links.pop();
        }
        this.setState({links:links});
    };

    showLink=(link)=>{
        debugger
        console.log('show link:',link);
        return(
            <Link to={link.url}>
                <div className={styles.link}>
                    {link.title}
                </div>
            </Link>
        )
    };

    componentWillMount(){
        this.modifyLinks(this.props.title, this.props.url, this.props.act);
    }

    render() {
        debugger
        return (
            <AppBar
                title={`iSCORE    Welcome ${this.props.first_name} ${this.props.last_name}`}
                style={styles.appBar}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            >

                {this.state.links? this.state.links.map((link)=>{this.showLink(link)}):''}
            </AppBar>
        );
    }
}

export default withRouter(UmpireHeader);