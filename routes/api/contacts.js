const express = require('express');
const router = express.Router();

const {
  validation,
  validateID,
  ctrlWrapper: ctrl,
} = require('../../middlewares');
const { schemas } = require('../../models/contactsModel');
const { ctrlContacts } = require('../../controllers');

// Get all contacts
router.get('/', ctrl(ctrlContacts.getAll));

// Get contact by id
router.get('/:contactId', validateID, ctrl(ctrlContacts.getById));

// Add new contact
router.post(
  '/',
  validation(schemas.schemaAddContact),
  ctrl(ctrlContacts.addContact)
);

// Update contact by id
router.put(
  '/:contactId',
  validateID,
  validation(schemas.schemaUpdateContact),
  ctrl(ctrlContacts.updateContact)
);

// Update status of the contact by id
router.patch(
  '/:contactId/favorite',
  validateID,
  validation(schemas.schemaUpdateStatusContact),
  ctrl(ctrlContacts.updateStatusContact)
);

// Delete contact by id
router.delete('/:contactId', validateID, ctrl(ctrlContacts.deleteContact));

module.exports = router;