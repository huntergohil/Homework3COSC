const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task'); // Ensure this is the correct path to your Task model
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://huntergohil:todolist@todocluster.in66e.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Task
app.post('/api/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

// Read all Tasks
// Read all Tasks
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  });
  

// Update Task
app.put('/api/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete Task
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send(); // No content
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
