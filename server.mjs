// import express from 'express';
// import fetch from 'node-fetch';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // JDoodle API Integration
// app.post('/api/execute', async (req, res) => {
//   const { script, language, versionIndex, stdin = '' } = req.body;

//   // Validate input
//   if (!script || !language || !versionIndex) {
//     return res.status(400).json({ error: 'Missing required parameters: script, language, or versionIndex' });
//   }

//   try {
//     // Make the request to JDoodle API
//     const response = await fetch('https://api.jdoodle.com/v1/execute', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         script, language, versionIndex, stdin,
//         clientId: "7b279535039890cd5cf18655db68257c",
//         clientSecret: "5895182bf7400494076f1bc11f9e39a8b669c5b18337f3ac8d520af7bb36bb4b"
//       }),
//     });

//     // Check API response status
//     if (!response.ok) {
//       const errorDetails = await response.json();
//       console.error('JDoodle API Error:', errorDetails);
//       return res.status(response.status).json({ error: 'Error fetching from JDoodle API', details: errorDetails });
//     }

//     // Parse and return the API response
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Error executing code:', error.message);
//     res.status(500).json({ error: 'Failed to execute code', details: error.message });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// server.mjs
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// JDoodle API Integration
app.post('/api/execute', async (req, res) => {
  const { script, language, versionIndex, stdin = '' } = req.body;

  if (!script || !language || !versionIndex) {
    return res.status(400).json({ error: 'Missing required parameters: script, language, or versionIndex' });
  }

  try {
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
        script,
        language,
        versionIndex,
        stdin,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return res.status(response.status).json({ error: 'JDoodle API Error', details: errorDetails });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`JDoodle API server running at http://localhost:${PORT}`);
});
