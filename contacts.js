const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath  = path.join(__dirname, "db/contacts.json");

const listContacts = async() => {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    console.log(parseContacts);
    return parseContacts;
}

const getContactById = async(contactId) => {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    const contact = parseContacts.find(item => item.id === contactId);
    console.log(contact || null);
    return contact || null;
}

const removeContact = async(contactId) => {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    const index = parseContacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    }
    const [result] = parseContacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(parseContacts, null, 2));
    console.log(result);
    return result;
  }

const addContact = async(name, email, phone) => {
    const contacts = await fs.readFile(contactsPath);
    const parseContacts = JSON.parse(contacts);
    const newContact = { 
        id: nanoid(),
        name, 
        email, 
        phone, };
    parseContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parseContacts, null, 2));
    console.log(newContact);
    return newContact;
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}

