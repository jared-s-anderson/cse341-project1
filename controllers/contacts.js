const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// This gets all of the contacts.
const retrieveAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// This gets on of the contacts.
const retrieveSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// This creates a contact.
const createContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while trying to add a new contact.');
  }
};

// This updates a contact.
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const existingContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, existingContact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while trying to update a contact.');
  }
};

// This deletes one of the contacts.
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while trying to delete a contact.');
  }
};

// To go above and beyond, I decided to add another delete option.
const deleteAll = async (req, res) => {
  const response = await mongodb.getDb().db().collection('contacts').deleteMany({}, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'An error occurred while trying to delete all of the contacts.');
  }
};

module.exports = {
  retrieveAll,
  retrieveSingle,
  createContact,
  updateContact,
  deleteContact,
  deleteAll
};
