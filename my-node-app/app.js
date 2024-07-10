const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sql = require('mssql');

const port = 3000;

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

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get sales details
app.get('/sales', (req, res) => {
  sql.connect(config, err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Database connection error', message: err.message });
      return;
    }

    const request = new sql.Request();
    request.query('SELECT SALESID, PRODUCTID, UNITPRICE, QTY, DISCOUNT FROM SalesDetails', (err, result) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Query error', message: err.message });
        return;
      }

      res.json(result.recordset);
    });
  });
});

// Endpoint to add a new sale detail
app.post('/sales', (req, res) => {
  const { SALESID, PRODUCTID, UNITPRICE, QTY, DISCOUNT } = req.body;

  sql.connect(config, err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Database connection error', message: err.message });
      return;
    }

    const request = new sql.Request();
    const query = `INSERT INTO SalesDetails (SALESID, PRODUCTID, UNITPRICE, QTY, DISCOUNT)
                   VALUES ('${SALESID}', '${PRODUCTID}', ${UNITPRICE}, ${QTY}, ${DISCOUNT})`;
    request.query(query, (err, result) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Query error', message: err.message });
        return;
      }

      res.json({ SALESID, PRODUCTID, UNITPRICE, QTY, DISCOUNT });
    });
  });
});

// Endpoint to delete a sale detail
app.delete('/sales/:salesId', (req, res) => {
  const salesId = req.params.salesId;

  sql.connect(config, err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Database connection error', message: err.message });
      return;
    }

    const request = new sql.Request();
    const query = `DELETE FROM SalesDetails WHERE SALESID = '${salesId}'`;
    request.query(query, (err, result) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Query error', message: err.message });
        return;
      }

      res.json({ message: 'Sale detail deleted', salesId });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});