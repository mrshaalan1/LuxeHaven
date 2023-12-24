import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    RestaurantItemName : {
      type: String,
  },
  RestaurantItemDescription: {
      type: String,
  }, 
  RestaurantItemType: {
        type: String,
    },
    RestaurantItemPrice: {
        type: String,
    },
})

const Car = mongoose.models.car || mongoose.model("car", CarSchema);

export default Car;