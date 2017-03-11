import React from 'react';

class AddMushroomForm extends React.Component {
  createMushroom(event) {
    event.preventDefault();
    console.log('mushroom!');
    const mushroom = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    this.props.addMushroom(mushroom);
    this.mushroomForm.reset();
  }
  render() {
    return (
        <form ref={(input) => this.mushroomForm = input} className="mushroom-edit" onSubmit={(e) => this.createMushroom(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="mushroom Name"/>
        <input ref={(input) => this.price = input} type="text" placeholder="mushroom Price"/>
        <select ref={(input) => this.status = input} >
          <option value="available">veeery fresh</option>
          <option value="unavailable">sold out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} placeholder="mushroom Desc"></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="mushroom Image"/>
        <button  type="submit">Add Item</button>
      </form>
    )
  }
}

AddMushroomForm.propTypes = {
  addMushroom: React.PropTypes.func.isRequired
}
export default AddMushroomForm;