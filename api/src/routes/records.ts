import express from 'express';
const Ajv = require('ajv').default;
import { addRecord, getAllRecords } from '../services/recordsService';
const recordSchema = require('../schemas/recordSchema.json');

const router = express.Router();
const ajv = new Ajv();
const validate = ajv.compile(recordSchema);

router.get('/', (req, res) => {
  try {
    const records = getAllRecords();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

router.post('/', (req, res) => {
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({ errors: validate.errors });
  }

  const { name, gender, duration, date } = req.body;

  try {
    addRecord(name, gender, duration, date);
    res.status(201).json({ message: 'Record added successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to add record. Please try again.' });
  }
});

export default router;
