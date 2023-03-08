import { useState } from "react"; 
import PropTypes from 'prop-types';
import { Label, Form, Input, Button } from './BookContacts.styled';

export const AddContscts = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onInputChangeName = (e) => {
        setName(e.target.value);
      }
    const onInputChangeNumber = (e) => {
      setNumber(e.target.value);
      }
    const onSubmitContact = (e) => {
        e.preventDefault();
        
        onSubmit({name, number});
        reset();
      }
    const reset = () => {
        setName('');
        setNumber('');
      }

    return (
    <Form onSubmit={onSubmitContact}>
          <Label>
            Name
        <Input
          type="text"
          name="name"
          value={name}
          onChange={onInputChangeName}
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
         value={number}
         onChange={onInputChangeNumber}
         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
         required
        />
        </Label>
        <Button type="submit">Add contact</Button>
        </Form>
        )
}

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