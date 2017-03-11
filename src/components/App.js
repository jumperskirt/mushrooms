import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleMushrooms from '../sample-mushrooms';
import Mushroom from './Mushroom';
import base from '../base.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mushrooms: {}, 
      order: {}
    };
   
   this.addMushroom = this.addMushroom.bind(this);
   this.loadSamples= this.loadSamples.bind(this);
   this.addToOrder = this.addToOrder.bind(this);
   this.removeFromOrder = this.removeFromOrder.bind(this);
   this.updateMushroom = this.updateMushroom.bind(this);
   this.removeMushroom = this.removeMushroom.bind(this);
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/mushrooms`, {
      context: this,
      state: 'mushrooms'
    });

   const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

   if (localStorageRef) {
     this.setState({
       order: JSON.parse(localStorageRef)
     });
   }
 }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addMushroom(mushroom) {
    const mushrooms = {...this.state.mushrooms};
    const timestamp = Date.now();
    mushrooms[`mushroom-${timestamp}`] = mushroom;
    this.setState({ mushrooms: mushrooms }); 
  }

  removeMushroom(key) {
    const mushrooms = {...this.state.mushrooms};
    mushrooms[key] = null;
    this.setState({ mushrooms });
  }
  
  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({
      order
    });
  }

  loadSamples() {
    this.setState({
      mushrooms: sampleMushrooms
    });
  }

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order: order });
  }
  
  updateMushroom(key, updatedMushroom) {
    const mushrooms = {...this.state.mushrooms};
    mushrooms[key] = updatedMushroom;
    this.setState({ mushrooms });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="uncertainty accepted as currency"/>
          <ul>
            {
              Object
                .keys(this.state.mushrooms)
                .map(key => <Mushroom key={key} index={key} details={this.state.mushrooms[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order 
          mushrooms={this.state.mushrooms} 
          order={this.state.order} 
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
          />
        <Inventory 
          addMushroom={this.addMushroom} 
          loadSamples={this.loadSamples}
          mushrooms={this.state.mushrooms}
          updateMushroom={this.updateMushroom}
          removeMushroom={this.removeMushroom}
          storeId={this.props.params.storeId}
          />
       
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;