const express = require("express");
const app     = express();
const cors    = require("cors");

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const postRouter = require('./Routes/Posts');

app.use("/posts", postRouter);

const commentRouter = require('./Routes/Comments');

app.use("/comments", commentRouter);

const usersRouter = require('./Routes/Users');

app.use("/auth", usersRouter);

db.sequelize.sync().then(()=>{
    app.listen(3010, () => {
        console.log("Server running on port 3010");
      });
});
