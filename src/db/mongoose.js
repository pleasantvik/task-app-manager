const mongoose = require("mongoose");
const app = require("../index.js");

const DB = "mongodb://127.0.0.1:27017/task-app";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then((cons) => {
    console.log("Successfully connected to the server");
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
