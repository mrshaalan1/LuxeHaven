import { ICar, IMenu, IRoom } from "./types";

export const cars: ICar[] = [
  {
    CarId: 1,
    CarName: "M3",
    CarDescription: "Fastest Car in he word!!!!",
    CarPicUrl: "/assets/cars/car.jpg",
    CarBrand: "BMW",
    CarPrice: 60,
  },
  {
    CarId: 2,
    CarName: "whatsapp",
    CarDescription: "Drippiest Car in he word!!!!",
    CarPicUrl: "/assets/cars/car2.jpg",
    CarBrand: "whatsapp",
    CarPrice: 420,
  },
  {
    CarId: 3,
    CarName: "test",
    CarDescription: "Fastest Car in he word!!!!",
    CarPicUrl: "/assets/cars/car3.jpg",
    CarBrand: "test",
    CarPrice: 45,
  },
  {
    CarId: 4,
    CarName: "ford",
    CarDescription: "Fastest Car in he word!!!!",
    CarPicUrl: "/assets/cars/car2.jpg",
    CarBrand: "batata",
    CarPrice: 55,
  },
  {
    CarId: 5,
    CarName: "ford",
    CarDescription: "Fastest Car in he word!!!!",
    CarPicUrl: "/assets/cars/car3.jpg",
    CarBrand: "BMW",
    CarPrice: 33,
  },
];

export const rooms: IRoom[] = [
  {
    RoomId: 1,
    RoomType: "Deluxe",
    RoomNumber: 12,
    RoomDescription: "Lorem ipsum dolor sit amet",
    RoomPicUrl: "/assets/rooms/Room1.png",
    RoomPrice: 50,
    RoomRating: 4.5,
  },
  {
    RoomId: 2,
    RoomType: "Pool",
    RoomNumber: 32,
    RoomDescription: "Lorem ipsum dolor sit amet",
    RoomPicUrl: "/assets/rooms/Room2.png",
    RoomPrice: 55,
    RoomRating: 4.5,

  },
  {
    RoomId: 3,
    RoomType: "Superior",
    RoomNumber: 76,
    RoomDescription: "Lorem ipsum dolor sit amet",
    RoomPicUrl: "/assets/rooms/Room3.png",
    RoomPrice: 95,
    RoomRating: 4.5,

  },
  {
    RoomId: 4,
    RoomType: "King",
    RoomNumber: 87,
    RoomDescription: "Lorem ipsum dolor sit amet",
    RoomPicUrl: "/assets/rooms/Room4.png",
    RoomPrice: 120,
    RoomRating: 4.5,

  },

];
export const menu: IMenu[] = [
  {
    RestaurantItemId: 1,
    RestaurantItemName: "Omelet",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Egg",
    RestaurantItemType: "BREAKFAST",
    RestaurantItemPrice: 5,
    RestaurantItempPicUrl: "/assets/menu/Omelet.png",
  },
  {
    RestaurantItemId: 2,
    RestaurantItemName: "Yogurt Granola Berries",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Yogurt, Blueberries, Raspberries ,Oat",
    RestaurantItemType: "BREAKFAST",
    RestaurantItemPrice: 12,
    RestaurantItempPicUrl: "/assets/menu/bowl-of-yogurt-granola-berries.png",
  },
  {
    RestaurantItemId: 3,
    RestaurantItemName: "Scrambled Eggs",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Egg ,Toast, Goat Cheese",
    RestaurantItemType: "BREAKFAST",
    RestaurantItemPrice: 10,
    RestaurantItempPicUrl: "/assets/menu/scrambled-eggs with-toast-and-goat-cheese.png",
  },
  {
    RestaurantItemId: 4,
    RestaurantItemName: "Waffle",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Waffle, Honey, Yogurt, Bananas",
    RestaurantItemType: "BREAKFAST",
    RestaurantItemPrice: 15,
    RestaurantItempPicUrl: "/assets/menu/waffle-honey-yogurt-bananas-flickr.png",
  },
  {
    RestaurantItemId: 5,
    RestaurantItemName: "Hamburgers",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Meat Patty, Lettuce, Tomato, Onions, Chedder Cheese",
    RestaurantItemType: "LUNCH",
    RestaurantItemPrice: 15,
    RestaurantItempPicUrl: "/assets/menu/hamburgers.png",
  },
  {
    RestaurantItemId: 6,
    RestaurantItemName: "Lasagna",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Pasta, Meat, Onions, Tomato Sauce, White Sauce",
    RestaurantItemType: "LUNCH",
    RestaurantItemPrice: 15,
    RestaurantItempPicUrl: "/assets/menu/lasagna.png",
  },
  {
    RestaurantItemId: 7,
    RestaurantItemName: "Fish and Chips",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Salmon, French Fries, Lemon",
    RestaurantItemType: "LUNCH",
    RestaurantItemPrice: 14,
    RestaurantItempPicUrl: "/assets/menu/Fish-and-chips.png",
  },
  {
    RestaurantItemId: 8,
    RestaurantItemName: "Mini Beef Wellingtons",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Beef, Bread, Mushroom",
    RestaurantItemType: "LUNCH",
    RestaurantItemPrice: 25,
    RestaurantItempPicUrl: "/assets/menu/mini-beef-wellingtons.png",
  },
  {
    RestaurantItemId: 9,
    RestaurantItemName: "Hamburg Steak",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Meat Patty, Roasted Potatos, Vegies",
    RestaurantItemType: "LUNCH",
    RestaurantItemPrice: 16,
    RestaurantItempPicUrl: "/assets/menu/hamburg-steak.png",
  },
  {
    RestaurantItemId: 10,
    RestaurantItemName: "Ham and Eggs",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Ham, Egg, French Fries",
    RestaurantItemType: "DINNER",
    RestaurantItemPrice: 16,
    RestaurantItempPicUrl: "/assets/menu/ham-eggs-fried.png",
  },
  {
    RestaurantItemId: 11,
    RestaurantItemName: "Beef Stew",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Beef, Potato, Carrot",
    RestaurantItemType: "DINNER",
    RestaurantItemPrice: 12,
    RestaurantItempPicUrl: "/assets/menu/beef-stew.png",
  },
  {
    RestaurantItemId: 12,
    RestaurantItemName: "England Fish Pie",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Fish, white sauce",
    RestaurantItemType: "DINNER",
    RestaurantItemPrice: 18,
    RestaurantItempPicUrl: "/assets/menu/england-fish-pie.png",
  },
  {
    RestaurantItemId: 13,
    RestaurantItemName: "Classic Meatloaf",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Meat, Mashed Potatoes, peas, bread",
    RestaurantItemType: "DINNER",
    RestaurantItemPrice: 18,
    RestaurantItempPicUrl: "/assets/menu/classic-meatloaf.png",
  },
  {
    RestaurantItemId: 14,
    RestaurantItemName: "Coffee Latte",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Coffee, Milk",
    RestaurantItemType: "DRINK",
    RestaurantItemPrice: 18,
    RestaurantItempPicUrl: "/assets/menu/Latte.png",
  },
  {
    RestaurantItemId: 15,
    RestaurantItemName: "Strawberry Smoothie",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Strawberry, Milk, Ice",
    RestaurantItemType: "DRINK",
    RestaurantItemPrice: 18,
    RestaurantItempPicUrl: "/assets/menu/strawberry.png",
  },
  {
    RestaurantItemId: 16,
    RestaurantItemName: "Dark Coffee",
    RestaurantItemDescription: "lorem",
    RestaurantItemIngredient: "Coffee",
    RestaurantItemType: "DRINK",
    RestaurantItemPrice: 18,
    RestaurantItempPicUrl: "/assets/menu/Coffe.png",
  },

];