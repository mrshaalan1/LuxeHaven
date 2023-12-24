import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
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

const Menu = mongoose.models.menu || mongoose.model("menu", MenuSchema);

export default Menu;