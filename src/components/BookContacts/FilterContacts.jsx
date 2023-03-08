import PropTypes from 'prop-types';
import { LabelFilt } from './BookContacts.styled';

export const Filter = ({ value, onChange }) => (
        <LabelFilt>
            Find contacts by name
            <input type="text" name='filtr' value={value} onChange={onChange} />
        </LabelFilt>
    )

    Filter.propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    }