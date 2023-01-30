const { Contact } = require('../models/contactsModel');

// Get all contacts
const getAll = async () => {
  return Contact.find();
};

// Get contact by id
const getById = async id => {
  return Contact.findById({ _id: id });
};

// Add new contact
const addContact = async body => {
  return Contact.create(body);
};

// Update contact by id
const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};
const updateStatusContact = async (id, body) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite: body } },
    { new: true }
  );
};

// Delete contact by id
const deleteContact = async id => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};