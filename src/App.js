import React, { Component } from 'react';
import RoutePaths from './routes/RoutePaths';
import AppBar from 'material-ui/AppBar' ;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ListRow from './ShoppingCart/ListRow';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './Styles/App.css'


class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    open:false,
    open2:false,
    cart:[],
    subtotal:0,
    recipe: this.props.recipe
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(item,price){
    var cart = this.state.cart;
    var subtotal = this.state.subtotal;
    cart.push(item);
    this.setState({cart: cart});
    this.setState({subtotal: this.state.subtotal + price});
  }

  addTotal(price){

    this.setState(price => {this.state.
      return
    });

  }



  handleToggle = () => this.setState({open: !this.state.open});
  handleToggle2 = () => this.setState({open2: !this.state.open2});
  handleSignOut = () =>
  {
    this.setState({open:!this.state.open});
    if(localStorage.getItem("token")!=null)
    {
      localStorage.removeItem("token");
      alert("Success!");
      window.location.reload();
    }
    else
      return alert("You have not logged in yet!");

  }

  render() {
    const style = {
      backgroundColor:'black',
    }

    return (
      <MuiThemeProvider>
      <AppBar title='Slice of NY'
      style={style}
      iconElementRight={<FlatButton label="My Cart" onClick={this.handleToggle2}/>}
      onLeftIconButtonClick={this.handleToggle}/>

      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        <MenuItem onClick={this.handleToggle} href="/Homepage">Home</MenuItem>
        <MenuItem onClick={this.handleToggle} href="/Login">Log In</MenuItem>
        <MenuItem onClick={this.handleToggle} href="/Registration">Sign Up</MenuItem>
        <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
      </Drawer>


      <Drawer width={300}
      docked={false}
      openSecondary={true}
      open={this.state.open2}
      onRequestChange={(open2) => this.setState({open2})}>
      <h3>Items</h3>

      <Table>
      <TableBody>
      {this.state.cart.map(function(recipe){
     return <ListRow recipe={recipe}/>
      })}
      </TableBody>
      </Table><br />

      <div className="subtotal">
      Total: $
      {this.state.subtotal}
      </div>

      <div className="checkout">
      <RaisedButton label="Checkout" primary={true} fullWidth={true}/>
      </div>
      </Drawer>

      <RoutePaths addItem={this.addItem}/>
      </MuiThemeProvider>
    );
  }
}

export default App;
