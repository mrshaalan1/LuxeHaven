export interface ICar {
  CarId: number;
  CarName: String;
  CarDescription: String;
  CarPicUrl: string;
  CarBrand: String;
  CarPrice: Number;
  CarRentalFrom: String;
  CarRentalTo: String;
}

export interface IMenu {
  RestaurantItemId: number;
  RestaurantItemName: String;
  RestaurantItemDescription: String;
  RestaurantItemIngredient: String;
  RestaurantItemType: string;
  RestaurantItemPrice: Number;
  RestaurantItempPicUrl: String;
}
