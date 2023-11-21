const { default: mongoose } = require("mongoose");

const DB_LOCAL = "mongodb://127.0.0.1:27017/task-app";

mongoose
  .connect(DB_LOCAL, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then((cons) => {
    console.log(cons);
    console.log("Successfully connected to the server");
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

const User = mongoose.model("User", userSchema);
const me = new User({
  name: "Adedayo",
  age: -1,
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => {
    console.log(err);
  });
// const task = new Tour({
//   description: "Learn the mongoose",
//   completed: false,
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
