const { Contact } = require('../models/contactsModel');

// Get all contacts
const getAll = async (userId, query) => {
  const { page = 1, limit = 20, favorite } = query;
  const skip = (page - 1) * limit;
  if (favorite)
    return Contact.find({ owner: userId, favorite: favorite }, '', {
      skip,
      limit: +limit,
    }).populate('owner', '_id username email subscription');

  return Contact.find({ owner: userId }, '', {
    skip,
    limit: +limit,
  }).populate('owner', '_id username email subscription');
};

// Get contacts by id
const getById = async (contactId, userId) => {
  return Contact.findById({ _id: contactId, owner: userId });
};

// POST new contacts
const addContact = async body => {
  return Contact.create(body);
};

// PUT contacts by id
const updateContact = async ({ contactId, _id, ...body }) => {
  return Contact.findOneAndUpdate({ _id: contactId, owner: _id }, body, {
    new: true,
  });
};

// PATCH favorite
const updateStatusContact = async (contactId, userId, body) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { $set: { favorite: body } },
    { new: true }
  );
};

// Delete contacts by id
const deleteContact = async (contactId, userId) => {
  return Contact.findByIdAndRemove({ _id: contactId, owner: userId });
};

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};