import mongoose, { Document, Schema } from "mongoose";


const CarSchema = new mongoose.Schema({
  CarId: {
    type: Schema.Types.ObjectId,
  },
  CarName: {
    type: String,
  },
  CarDescription: {
    type: String,
  },
  CarPic: {
    type: String,
  },
  CarBrand: {
    type: String,
  },
  CarPrice: {
    type: Intl,
  },
});

const Car = mongoose.models.car || mongoose.model("car", CarSchema);


export default Car;
