require("express-async-errors");
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const AppError = require("./utils/AppError");
const routes = require("./Routes");
const sqliteConnection = require("./database/sqlite");
const uploadConfig = require("./configs/upload");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);


sqliteConnection();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  };

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));