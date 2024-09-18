import express from 'express';
import { HealthRecord } from '../models/HealthRecord.js';

const router = express.Router();

// Create a new health record
router.post('/', async (req, res) => {
  try {
    const { date, bodyTemperature, bloodPressure, heartRate } = req.body;
    const newRecord = new HealthRecord({
      date,
      bodyTemperature,
      bloodPressure,
      heartRate
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all health records
router.get('/', async (req, res) => {
  try {
    const records = await HealthRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific health record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific health record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRecord = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecord) return res.status(404).json({ message: 'Record not found' });
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific health record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
