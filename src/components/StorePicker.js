import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  //what is the constructor? it's the code that runs when that component is created
  // constructor() {
  //   //what's super? it first creates the base react component (and then we extend it on line 4)
  //   super();
      //then the this is bound to the method
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
    console.log('you changed you changed');
    const storeId = this.storeInput.value;
    console.log(`going to ${storeId}`);
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default StorePicker;