const { Contact } = require('../models/contactsModel');

// Get all contacts
const getAll = async () => {
  return Contact.find();
};

// Get contacts by id
const getById = async id => {
  return Contact.findById({ _id: id });
};

// POST new contacts
const addContact = async body => {
  return Contact.create(body);
};

// PUT contacts by id
const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

// PATCH favorite
const updateStatusContact = async (id, body) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite: body } },
    { new: true }
  );
};

// Delete contacts by id
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