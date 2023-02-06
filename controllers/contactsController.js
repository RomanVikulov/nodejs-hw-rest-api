const { NotFound } = require('http-errors');
const service = require("../service/contactsService");

// Get all contacts
const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await service.getAll(_id, req.query);
  res.json(result);
};

// Get contact by id
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await service.getById(contactId, _id);
  if (!result) {
    return next(new NotFound(`Not found contact with id: ${contactId}`));
  }
  res.json(result);
};

// Add new contact
const addContact = async (req, res) => {
  const { _id } = req.user;
  const result = await service.addContact({ ...req.body, owner: _id });
  res.status(201).json(result);
};

// Update contact by id
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await service.updateContact({
    contactId,
    _id,
    ...req.body,
  });
  if (!result) {
    return next(new NotFound(`Not found contact with id: ${contactId}`));
  }
  res.json(result);
};

// Update status of the contact by id
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;
  const result = await service.updateStatusContact(contactId, _id, favorite);
  if (!result) {
    return next(new NotFound(`Not found contact with id: ${contactId}`));
  }
  res.json(result);
};

// Delete contact by id
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await service.deleteContact(contactId, _id);
  if (!result) {
    return next(new NotFound(`Not found contact with id: ${contactId}`));
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
