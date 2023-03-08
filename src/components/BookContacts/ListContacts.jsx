import PropTypes from 'prop-types';
import { TitleContact, List, ContList, ButtonList, ItemList } from './BookContacts.styled';

export const ListContacts = ({contacts, onDelete}) => (
    <ContList>
        <TitleContact>Contacts</TitleContact>
        <List>
        {contacts.map(({ id, name, number }) => (<ItemList key={id}>{name}: {number} 
        <ButtonList type="button" onClick={() => onDelete(id)}>Delete</ButtonList>
        </ItemList>))}
        </List>
    </ContList>
)

ListContacts.propTyoes = {
    contacts: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })).isRequired,
    onDelete: PropTypes.func,
}