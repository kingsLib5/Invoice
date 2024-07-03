// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const app = express();
const port = 3000;
const sql = require('mssql');

// MS SQL Server configuration
const config = {
  user: 'your-username',
  password: 'your-password',
  server: 'your-server-name', 
  database: 'your-database-name',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true // Use this if you are connecting to a local server
  }
};

app.get('/', (req, res) => {
  sql.connect(config, err => {
    if (err) {
      console.log('Error connecting to the database:', err);
      res.send('Database connection error');
      return;
    }

    const request = new sql.Request();
    request.query('SELECT 1 AS number', (err, result) => {
      if (err) {
        console.log('Query error:', err);
        res.send('Query error');
        return;
      }

      res.send(`Query result: ${result.recordset[0].number}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});