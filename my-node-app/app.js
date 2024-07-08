const express = require('express');
const app = express();
const port = 3000;
const sql = require('mssql');

// MS SQL Server configuration
const config = {
  user: "demouser",
  password: "Demo@Access",
  server: "172.245.142.62",
  port: 1455,
  database: "demodb",
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    // trustServerCertificate: true // Use this if you are connecting to a local server
  }
};

app.get('/', (req, res) => {
  sql.connect(config, err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.send('Database connection error: ' + err.message);
      return;
    }

    const request = new sql.Request();
    request.query('SELECT * FROM SalesDetails', (err, result) => {
      if (err) {
        console.error('Query error:', err);
        res.send('Query error: ' + err.message);
        return;
      }

      res.json(result.recordset);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
  

// iii