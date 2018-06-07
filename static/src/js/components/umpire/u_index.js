import React from 'react';
import MainCard from '../main_card/main_card_index';
import UmpireHeader from './umpire_header';
import UmpireTournaments from "./umpire_tournaments";
import Match from './umpire_index';
import UmpireMatches from "./umpire_matches";

class UmpireIndex extends React.Component {

    constructor(props) {

        super(props);

        this.setUrlContent = this.setUrlContent.bind(this);
        this.createContent=this.createContent.bind(this);

        this.state={
            id:this.props.location.state.first_name,
            first_name:this.props.location.state.first_name,
            last_name:this.props.location.state.last_name,
            content:'UmpireTournaments',
            act:'add',
            url:`/umpire`,
            title:'/tournaments',
        }

    }

  setUrlContent(e,title, url,content){
     e.preventDefault();
    this.setState({title:title, url:url,act:'add',content:content});
  }
  createContent(){
         if (this.state.content === 'UmpireTournaments') {
             debugger
             return (
               <UmpireTournaments setUrlContent={this.setUrlContent}/>
             )
         } else if (this.state.content === 'UmpireMatches') {
             return (

                    <UmpireMatches setUrlContent={this.setUrlContent}/>
             )
         }else if (this.state.content === 'Match') {
             return (
                 <MainCard
                     content={<Match setUrlContent={this.setUrlContent}/>}
                     style={{flex: 1, margin: '1vw 2vw 0 2vw'}}
                 />
             )
         }
     };
  render() {
debugger;
    return (
      <div>
          {this.state.first_name && this.state.last_name && this.state.act && this.state.url && this.state.title ?
               <UmpireHeader
                      first_name={this.state.first_name ? this.state.first_name :''}
                      last_name={this.state.last_name ? this.state.last_name :''}
                      act={this.state.act? this.state.act : ''}
                      url={this.state.url? this.state.url:''}
                     title={this.state.title ?this.state.title:'' }

                    />:''}
          {this.state.content? this.createContent():''}

      </div>
    );
  }
}

export default UmpireIndex;


