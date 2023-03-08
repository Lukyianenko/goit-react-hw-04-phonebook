import { Component } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import AddContscts from './BookContacts/AddContact';
import { ListContacts } from './BookContacts/ListContacts';
import { Filter } from './BookContacts/FilterContacts';
import { Title } from './BookContacts/BookContacts.styled';

class App extends Component {
  state = {
    contacts: [],
    filtr: '',
  }

  onSubmitAddNewContact = (contact) => {
    const includesName = this.state.contacts.map(item => {return (item.name.toLowerCase())});
    console.log(includesName);
    if(includesName.includes(contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts`)
          }  else {
            const id = nanoid();
    this.setState({
      contacts: [...this.state.contacts, {id, ...contact}]
    })
          }
    
  }

  OnChangeFiltr = (e) => {
        this.setState({
          filtr: e.currentTarget.value,
        }) 
  }

  onDeleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if(savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({
        contacts: parsedContacts
      })
      return
    }
    this.setState({
      contacts: []
    })
  }
  
  
  
  render() {

    const normalizeFiltr = this.state.filtr.toLowerCase();

    const visibleContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFiltr));

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
      <AddContscts onSubmit={this.onSubmitAddNewContact} />
      <Filter value={this.state.filtr} onChange={this.OnChangeFiltr}/>
      <ListContacts contacts={visibleContacts} onDelete={this.onDeleteContact}/>
      

      </div>
    );
  }
  
};

export default App;

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