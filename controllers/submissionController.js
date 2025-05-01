// controllers/submissionController.js
import { createSubmission, getAllSubmissions } from '../models/submissionModel.js';

export const submitForm = async (req, res) => {
  const { name, email, location, question } = req.body;

  try {
    await createSubmission(name, email, location, question);
    res.send('✅ Submission saved successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving submission.');
  }
};

export const showSubmissions = async (req, res) => {
  try {
    const submissions = await getAllSubmissions();

    let html = `
      <h1>📝 Submissions</h1>
      <a href="/logout">Logout</a>
      <table border="1">
        <tr><th>Name</th><th>Email</th><th>Location</th><th>Question</th></tr>
    `;

    submissions.forEach((s) => {
      html += `<tr><td>${s.name}</td><td>${s.email}</td><td>${s.location}</td><td>${s.question}</td></tr>`;
    });

    html += '</table>';
    res.send(html);
  } catch (error) {
    res.status(500).send('Failed to retrieve submissions.');
  }
};
