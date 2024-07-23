const express = require("express");
const app = express();

const db = require('./models');

//Routers
const postRouter = require('./Routes/Posts');

app.use("/posts", postRouter)

db.sequelize.sync().then(()=>{
    app.listen(3010, () => {
        console.log("Server running on port 3010");
      });
});
