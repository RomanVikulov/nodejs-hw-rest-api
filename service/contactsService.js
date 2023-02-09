const { Contact } = require('../models/contactsModel');

// Get all contacts
const getAllContacts = async (userId, query) => {
  const { page = 1, limit = 20, favorite, name, email } = query;
  const skip = (page - 1) * limit;
  const pagination = {
    skip,
    limit: +limit,
  };

  const filter = {};
  if (userId) filter.owner = userId;
  if (favorite) filter.favorite = favorite;
  if (name) filter.name = { $regex: name };
  if (email) filter.email = { $regex: email };

  const ownerInfo = "_id email";
  return Contact.find(filter, "", pagination)
    .populate("owner", ownerInfo)
    .sort({ name: 1 });
};

const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await getAllContacts(_id, req.query);
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
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