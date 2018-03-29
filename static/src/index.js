import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Helle Django + React = Awesomeness! </h1>
           <button type="button" class="btn btn-elegant">Elegant</button>

<button class="btn btn-primary"><i class="fa fa-magic mr-1"></i> Left</button>

            </div>

            );
    }
}


ReactDOM.render(<App />, document.getElementById('react-app'));