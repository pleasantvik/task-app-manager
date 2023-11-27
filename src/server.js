const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./index");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DB_LOCAL;
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
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
