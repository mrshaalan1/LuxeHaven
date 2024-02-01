import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Car from "@/models/carModel";

connect();

export const POST = async (request: any) => {
  const requestBody = await request.json();

  const {CarId, CarName, CarDescription, CarBrand, CarPrice } =
    requestBody;
console.log(requestBody);

  Response;

  try {
    const car = await Car.findOne({ _id: CarId });

    if (!car) {
      return NextResponse.json("Car Not Found", { status: 404 });
    }

    const carIdAsString = CarId?.toString();

    if (CarId) car.CarId = carIdAsString;
    if (CarName) car.CarName = CarName;
    if (CarDescription) car.CarDescription = CarDescription;
    if (CarBrand) car.CarBrand = CarBrand;
    if (CarPrice) car.CarPrice = CarPrice;

    await car.save();

    return NextResponse.json("Successfully updated the Car", {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};
