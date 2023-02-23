const express = require('express');
const router = express.Router();

const {
  validation,
  validateID,
  ctrlWrapper: ctrl,
  auth,
} = require('../../middlewares');
const { schemas } = require('../../models/contactsModel');
const { ctrlContacts } = require('../../controllers');

// Get all contacts
router.get('/', auth, ctrl(ctrlContacts.getAll));

// Get contact by id
router.get('/:contactId', validateID, auth, ctrl(ctrlContacts.getById));

// Add new contact
router.post(
  '/',
  validation(schemas.schemaAddContact),
  auth,
  ctrl(ctrlContacts.addContact)
);

// Update contact by id
router.put(
  '/:contactId',
  validateID,
  validation(schemas.schemaUpdateContact),
  auth,
  ctrl(ctrlContacts.updateContact)
);

// Update status of the contact by id
router.patch(
  '/:contactId/favorite',
  validateID,
  validation(schemas.schemaUpdateStatusContact),
  auth,
  ctrl(ctrlContacts.updateStatusContact)
);

// Delete contact by id
router.delete(
  '/:contactId',
  validateID,
  auth,
  ctrl(ctrlContacts.deleteContact)
);

module.exports = router;