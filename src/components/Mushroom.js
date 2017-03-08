import React from 'react';
import { formatPrice } from '../helpers';

class Mushroom extends React.Component {
  render() {
    // const details = this.props.details;
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'add to order' : 'sold out';

    return (
       <li className="menu-mushroom">
         <img src={this.props.details.image} alt={this.props.details.name}/>
         <h3 className="mushroom-name">
           {details.name}
           <span className="price">{formatPrice(details.price)}</span>
         </h3>
           <p>{details.desc}</p>
           <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
       </li>
       
    );
  }
}

Mushroom.propTypes = {
  addToOrder: React.PropTypes.func.isRequired,
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired
}
export default Mushroom;