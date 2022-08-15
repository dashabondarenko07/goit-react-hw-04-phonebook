import PropTypes from 'prop-types';
import { Button, Item } from './ContactList.styled';

export const ContactList = ({ contacts, onClick }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <Item key={id}>
          {name}: {number}
          <Button
            type="button"
            onClick={() => {
              onClick(id);
            }}
          >
            Delete
          </Button>
        </Item>
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
