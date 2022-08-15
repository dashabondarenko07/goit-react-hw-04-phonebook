import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Box } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione', number: '443-89-12' },
        { id: 'id-3', name: 'Eden', number: '645-17-79' },
        { id: 'id-4', name: 'Annie', number: '227-91-26' },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.find(contact => contact.name === newContact.name)
      ? alert(`${name} is already in contacts.`)
      : setContacts(state => [newContact, ...state]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getListFilter = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const visibleList = getListFilter();
  return (
    <Box>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleList} onClick={deleteContact} />
    </Box>
  );
};
