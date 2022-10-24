const express = require('express'); 
const app = express();              
const port = 5000;                 
const axios = require("axios")

app.get('/', async (req, res) => {
   
    const config = {
        headers: { Authorization: `Bearer acdf4f5ec30c9ce4f6a129d22f3b2097` }
    };

try {
    const body = {
        "search": {
          "s1": {"field": "StartTime", "data": 1666378800, "type": "gt" },
          "s2": {"field": "EndTime", "data": 1666551600, "type": "lt" }
      
        }
      }
   const deputyData = await axios.post( 
      'https://5dd54b23071604.na.deputy.com/api/v1/resource/Timesheet/QUERY',
      body,
      config
      )
     const result = deputyData.data.reduce(function (r, a) {
        r[a.Employee] = r[a.Employee] || [];
        r[a.Employee].push(a);
        return r;
    }, Object.create(null));
  console.log('deputyData', result);
   res.send(result)
} catch (error) {
    res.send(error);
}
                                                         
});

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});