const express = require('express');
const cors = require('cors');
const  app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
// const db = require("./app/models");
// db.sequelize.sync();
app.use(cors(corsOptions));
// parse requests of content-type- applications/json
app.use(express.json());
// parse requests of content-type-application/x-www-form-urlencoded
app.use(express.urlencoded({ extended:true}));
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
console.log('Drop and Resync Db');
initial();
});
function initial() {
    Role.create({
    id: 1,
    name: "user"
    });
    Role.create({
    id: 2,
    name: "moderator"
    });
    Role.create({
    id: 3,
    name: "admin"
    });
}
// simple route
app.get('/',(req, res) => {
    res.json({message:"welcome to emihle's application!"});
});
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
 // set port , listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("listening on port ${PORT}");
});