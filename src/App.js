import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import SearchContacts from './components/SearchContacts';
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [stateContacts, setStateContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? '',
  );
  const [stateFilter, setStateFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(stateContacts));
  }, [stateContacts]);

  const formSubmitHandler = data => {
    data.id = uuidv4();
    setStateContacts(prevState => [...prevState, data]);
  };

  const changeFilter = e => {
    setStateFilter(() => e.target.value);
  };

  const getFilteredContacts = () => {
    if (stateContacts) {
      const normalizedFilter = stateFilter.toLowerCase();
      return stateContacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter),
      );
    }
  };

  const deleteContact = contactId => {
    const filteredContacts = stateContacts.filter(
      contact => contact.id !== contactId,
    );
    setStateContacts(filteredContacts);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} contacts={stateContacts} />
      <h2>Contacts</h2>
      <SearchContacts value={stateFilter} onChange={changeFilter} />
      {stateContacts && (
        <ContactsList
          contacts={getFilteredContacts()}
          onDelete={deleteContact}
        ></ContactsList>
      )}
    </>
  );
};

export default App;