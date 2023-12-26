import { cars } from "./libs/data";
import Car from "./src/models/carModel";
import dotenv from "dotenv";
import connect from "./src/dbConfig/dbConfig";

dotenv.config();

connect();

const importData = async () => {
  try {
    // delete previous data | avoid duplication
    await Car.deleteMany();

    await Car.insertMany(cars);

    console.log("Data imported");

    // 0 is a success code and 1 (or another number) can be a failure code.
    process.exit();
  } catch (error) {
    console.log("Data not imported", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Car.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log("Data not destroyed");
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}