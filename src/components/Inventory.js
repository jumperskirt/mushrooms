import React from 'react';
import AddMushroomForm from './AddMushroomForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate= this.authenticate.bind(this);
    this.authHandler= this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      uid: null,
      ownder: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const mushroom = this.props.mushrooms[key];
    const updatedMushroom = {
      ...mushroom,
      [e.target.name]: e.target.value
    }
    this.props.updateMushroom(key, updatedMushroom);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    const storeRef = base.database().ref(this.props.storeId);
    
    storeRef.once('value',(snapshot) => {
      const data = snapshot.val() || {};
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    });
  }

 renderLogin() {
   return (
     <nav className="login">
       <h2>Inventory</h2>
       <p>Sign in to manage your store's inventory</p>
       <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
       <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>

    </nav>
   )
 }
 
  renderInventory(key) {
    const mushroom = this.props.mushrooms[key];

    return (
      <div className="mushroom-edit" key={key}>
        <input type='text' name='name' value={mushroom.name} placeholder="Mushroom Name" onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='price' value={mushroom.price} placeholder='Mushroom Price' onChange={(e) => this.handleChange(e, key)}/>
        <select type='text' name='status' value={mushroom.status} placeholder='Mushroom Status'  onChange={(e) => this.handleChange(e, key)}>
          <option value="available">veeery fresh</option> 
          <option value="unavailable">sorry, no more</option>
        </select>
        <textarea type='text' name='desc' value={mushroom.desc} placeholder='Mushroom Desc' onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type='text' name='image' value={mushroom.image} placeholder='Mushroom Image' onChange={(e) => this.handleChange(e, key)}/>  
        <button onClick={() => this.props.removeMushroom(key)}>remove mushroom</button>
      </div>
      )
  }
  
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>  
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>You aren't the owner of this store</p>
          {logout}
         </div>
      )
    }

    return (
      <div>
      <h2>Inventory</h2>
      {logout}
        {
          Object
          .keys(this.props.mushrooms)
          .map(this.renderInventory)
        }
        <AddMushroomForm addMushroom={this.props.addMushroom} />
        <button onClick={this.props.loadSamples}>load sample mushrooms</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  addMushroom: React.PropTypes.object.isRequired,
  updateMushroom: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  removeMushroom: React.PropTypes.func.isRequired,
  mushrooms: React.PropTypes.object.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;