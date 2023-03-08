import { Component } from "react"; 
import PropTypes from 'prop-types';
import { Label, Form, Input, Button } from './BookContacts.styled';

class AddContscts extends Component {
    state = {
        name: '',
        number: '',
    }

    onInputChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({
          [name]: value,
        }) 
      }
    
      onSubmitContact = (e) => {
        e.preventDefault();
        
        this.props.onSubmit(this.state);
        this.reset();
      }

      reset = () => {
        this.setState({
            name: '',
            number: '',
        })
      }

render() {
    return (
    <Form onSubmit={this.onSubmitContact}>
          <Label>
            Name
        <Input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.onInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore        d'Artagnan"
          required
        />
        </Label>
        <Label>
            Number
        <Input
         type="tel"
         name="number"
         value={this.state.number}
         onChange={this.onInputChange}
         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
         required
        />
        </Label>
        <Button type="submit">Add contact</Button>
        </Form>
        )}
}

export default AddContscts;

AddContscts.propTypes = {
  state: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })),
  onInputChange: PropTypes.func,
  onSubmitContact: PropTypes.func,
  reset: PropTypes.func,
  render: PropTypes.func,
}