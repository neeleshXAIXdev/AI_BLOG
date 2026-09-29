require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/db");

const PORT = process.env.PORT;

connectDb();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
