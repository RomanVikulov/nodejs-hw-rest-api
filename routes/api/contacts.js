const express = require('express');
const router = express.Router();

const { validation, ctrlWrapper: ctrl } = require('../../middlewares');
const { schemaContact: schema } = require('../../schemas');
const { contacts } = require('../../controllers');

// Get all contacts
router.get('/', ctrl(contacts.getAll));

// Get contact by id
router.get('/:contactId', ctrl(contacts.getById));

// Add new contact
router.post(
  '/',
  validation(schema.schemaAddContact),
  ctrl(contacts.addContact)
);

// Update contact by id
router.put(
  '/:contactId',
  validation(schema.schemaUpdateContact),
  ctrl(contacts.updateContact)
);

// Delete contact by id
router.delete('/:contactId', ctrl(contacts.deleteContact));

module.exports = router;