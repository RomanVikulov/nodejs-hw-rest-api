const createError = require('http-errors');
const operations = require('../models/contacts');

// Get all contacts
const getAll = async (req, res) => {
  const result = await operations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

// Get contact by id
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await operations.getContactById(contactId);
  if (!result) {
    return next(createError(404, 'Not found'));
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

// Add new contact
const addContact = async (req, res) => {
  const result = await operations.addContact(req.body);
  res.json({
    status: 'success',
    code: 201,
    message: 'contact added',
    data: {
      result,
    },
  });
};

// Delete contact by id
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await operations.removeContact(contactId);
  if (!result) {
    return next(createError(404, 'Not found'));
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

// Update contact by id
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  if (!req.body) {
    return next(createError(400, 'Missing fields'));
  }
  const result = await operations.updateContact(contactId, req.body);
  if (!result) {
    return next(createError(404, 'Not found'));
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact updated',
    data: {
      result,
    },
  });
};

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  deleteContact,
};