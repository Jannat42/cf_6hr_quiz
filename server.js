const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');

const app = express();
const port = 3000;
// Connect to MongoDB with correct connection string format and necessary options
mongoose.connect('mongodb://localhost:27017/quiz_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // Set to false to opt out of using findAndModify() and use findOneAndUpdate() instead
  useCreateIndex: true // Set to true to opt in to using createIndex() for index creation
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());

// Routes
// Create a new quiz question
app.post('/api/quizzes', async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const quiz = new Quiz({ question, options, correctAnswer });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the quiz' });
  }
});

// Get all quiz questions
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching quizzes' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
