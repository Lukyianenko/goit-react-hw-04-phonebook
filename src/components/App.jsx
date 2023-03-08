import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {AddContscts} from './BookContacts/AddContact';
import { ListContacts } from './BookContacts/ListContacts';
import { Filter } from './BookContacts/FilterContacts';
import { Title } from './BookContacts/BookContacts.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filtr, setFiltr] = useState('');

  const onSubmitAddNewContact = (contact) => {
    const includesName = contacts.map(item => {return (item.name.toLowerCase())});
    if(includesName.includes(contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts`)
    }  
    else {
      const id = nanoid();
      setContacts([...contacts, {id, ...contact}])
    }
  }
  const onChangeFiltr = (e) => {
    setFiltr(e.target.value);
  }
  const onDeleteContact = (contactId) => {
    setContacts(contacts => contacts.filter(contact => contact.id !== contactId));
  }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');

    if(savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
      return
    }
    setContacts([]);
  }, [])

    const normalizeFiltr = filtr.toLowerCase();

    const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFiltr));

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Title>Phonebook</Title>
      <AddContscts onSubmit={onSubmitAddNewContact} />
      <Filter value={filtr} onChange={onChangeFiltr}/>
      <ListContacts contacts={visibleContacts} onDelete={onDeleteContact}/>
      

      </div>
    );  
};


App.propTypes = {
  state: PropTypes.arrayOf(PropTypes.exact({
    contacts: PropTypes.arrayOf(PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })),
    filtr: PropTypes.string,
  })),
}