import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor() {
    super();

    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const mushroom = this.props.mushrooms[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!mushroom || mushroom.status === 'unavailable') {
      return <li key={key}>Sorry, {mushroom ? mushroom.name : 'mushroom'} is no longer available{removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >

            <span key={count}>{count}</span>
          </CSSTransitionGroup>
      
          lbs {mushroom.name}  {removeButton}
        </span>
        <span className="price">{formatPrice(count * mushroom.price)}</span>
      
        </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
    const mushroom = this.props.mushrooms[key];
    const count = this.props.order[key];
    const isAvailable = mushroom && mushroom.status === 'available';

      if (isAvailable) {
        return prevTotal + (count * mushroom.price) || 0
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <CSSTransitionGroup 
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
          {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
          
      </div>
    )
  }
}
Order.propTypes = {
  removeFromOrder: React.PropTypes.func.isRequired,
  mushrooms: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
}
export default Order;