// Imports
const express = require("express");


const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");

const { PORT } = require("./constants");
const routes = require("./router");

//connecting to DB

// Local variables
const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);


dbConnect()
.then(()=>{
    console.log('successfully conected to the DB');
})
.catch((err) => console.log('error while trying to connect to DB'));


// Routing
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

