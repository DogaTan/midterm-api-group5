const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.get('/hello', (req, res) => {
    res.send('🟢 Hello from Midterm Project API!');
  });

  
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
