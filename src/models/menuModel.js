import mongoose, { Document, Schema } from "mongoose";

const MenuSchema = new mongoose.Schema({
  RestaurantItemId: {
    type: Schema.Types.ObjectId,
  },
  RestaurantItemName: {
    type: String,
  },
  RestaurantItemDescription: {
    type: String,
  },
  RestaurantItemIngredient:{
    type: String,
  },
  RestaurantItemType: {
    type: String,
  },
  RestaurantItemPrice: {
    type: Number,
  },
  RestaurantItempPicUrl: {
    type: String,
  },
});

const Menu = mongoose.models.menu || mongoose.model("menu", MenuSchema);

export default Menu;
