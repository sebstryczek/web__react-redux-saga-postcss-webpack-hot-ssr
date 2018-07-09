import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import routes from '../routes';
import Page3 from './Page3';
import Example from '../components/Example';
import ExampleStyledComponent from '../components/ExampleStyledComponent';

//import { fetchData } from '../actions/fetchDataActions';
import { getDataRequested } from '../actions/fetchDataActions';

import './App.css';

class App extends React.Component {
  //static fetchData(store) {
  //  return store.dispatch(fetchData());
  //}

  componentDidMount() {
    this.props.fetchData();
    //this.props.dispatch(getDataRequested());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const data = this.props.data || [];
    return (
      <div>
        <h1>App</h1>
        <Example />
        <ExampleStyledComponent />
        {
          this.props.data && this.props.data.map(
            (item, i) => <p key={i}>{item}</p>
          )
        }
        { renderRoutes(routes[0].routes) }
        <Route path="/page3/" component={Page3} />
        <Route path="/page4/" render={() => <h2>Page 4</h2>} />
        <Route exact path="/page4/sub" render={() => <h2>Page 4 Sub</h2>} />
      </div>
    );
  }
};

const mapStateToProps = state => ({ data: state.data });
const mapDispatchToProps = dispatch => ({ fetchData: () => dispatch(getDataRequested()) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
