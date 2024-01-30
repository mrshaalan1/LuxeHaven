import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Space, Table, message } from "antd";
import type { ColumnType } from "antd/lib/table/interface";
import axios from "axios";

interface DataType {
  key: string;
  customer: { $id: string };
  RoomNumber: any;
  RoomType: any;
  Date: string;
}

interface CustomizedAxisTickProps {
  x?: number;
  y?: number;
  stroke?: string;
  payload?: { value: string };
}
class CustomizedAxisTick extends PureComponent<CustomizedAxisTickProps> {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload?.value}
        </text>
      </g>
    );
  }
}
export default function Example() {
  interface Reservation {
    _id: { $id: string };
    customer: { $id: string };
    RoomId: { $numberInt: string };
    CarId: { $numberInt: string };
    CarRentalFrom: string;
    CarRentalTo: string;
    spa: boolean;
    gym: boolean;
    __v: { $numberInt: string };
    reservationFrom: string;
    reservationTo: string;
    roomDetails?: Record<string, any> | null;
    carDetails?: Record<string, any> | null;
  }
  const columns: ColumnType<DataType>[] = [
    {
      title: "Customer ID",
      dataIndex: "customer",
      key: "customer",
      //render: (text) => <a>{text.$oid}</a>,
    },
    {
      title: "Room Number",
      dataIndex: "RoomNumber",
      key: "RoomNumber",
    },
    {
      title: "Room Type",
      dataIndex: "RoomType",
      key: "RoomType",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.key && (
            <>
              <a onClick={() => handleDelete(record.key)}>Delete</a>
            </>
          )}
        </Space>
      ),
    },
  ];

  const [data, setData] = useState<DataType[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/reservation/list");
      const fetchedData = await response.json();
      //console.log("Fetched Data:", fetchedData);
      setData(fetchedData.reservations);
      const updatedReservations = fetchedData.reservations;

      const promises = updatedReservations.map(async (reservation: any) => {
        let room = reservation?.RoomId;
        //let car = reservation?.carReservation?.CarId;
        const roomResponse = room
          ? await axios.post("http://localhost:3000/api/rooms/getRoom", {
              RoomId: room,
            })
          : null;
        //console.log(roomResponse?.data.room);

        // Sending GET request to get car details
        // const carResponse = car
        //   ? await axios.post("/api/cars/car/getCar", {
        //       CarId: car,
        //     })
        //   : null;

        return {
          ...reservation,
          roomDetails: roomResponse?.data.room || null,
          //carDetails: carResponse?.data.car || null,
        };
      });
      const result = await Promise.all(promises);
      setReservations(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedReservations = reservations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: reservations.length,
    onChange: onChangePage,
    itemRender: (current: any, type: any, originalElement: any) => {
      if (
        type === "prev" ||
        type === "next" ||
        type === "jump-prev" ||
        type === "jump-next"
      ) {
        return React.cloneElement(originalElement, {
          style: { color: "white" },
        });
      }
      return (
        <span style={{ color: current === currentPage ? "black" : "white" }}>
          {current}
        </span>
      );
    },
  };

  const today = new Date();
  const fiveDaysFromNow = new Date(today);
  fiveDaysFromNow.setDate(today.getDate() + 5);

  const countOccurrences = (data: any, key: any) => {
    const counts: Record<string, number> = {};
    data.forEach((item: any) => {
      const date = item[key]?.toString()?.substring(0, 10);
      counts[date] = (counts[date] || 0) + 1;
    });
    return counts;
  };

  // Count occurrences of reservation dates
  const roomCounts = countOccurrences(reservations, "reservationFrom");
  //const carCounts = countOccurrences(reservations, "CarRentalFrom");

  // Transform counts into graphData format
  const transformedRoomData = Object.entries(roomCounts).map(
    ([date, count]) => ({
      name: date,
      Room: count,
    })
  );

  // const transformedCarData = Object.entries(carCounts).map(([date, count]) => ({
  //   name: date,
  //   Car: count,
  // }));

  const handleDelete = async (reservationId: string) => {
    try {
      await axios.delete("/api/reservation/delete", {
        data: {
          reservationId,
          reservationType: "room",
        },
      });
      message.success("Reservation Deleted successfully")
      // After successful deletion, you may want to refetch the data or update the state
      fetchData();
    } catch (error) {
      message.error("Reservation Deletion failed!!")
      console.error("Error deleting reservation:", error);
    }
  };
  const dataSource = paginatedReservations.map((reservation) => ({
    key: reservation._id,
    customer: reservation.customer,
    RoomNumber: reservation.roomDetails?.RoomNumber || 0,
    RoomType: reservation.roomDetails?.RoomType || "",
    Date: `From: ${new Date(reservation.reservationFrom)
      .toISOString()
      .substring(0, 10)}, Till: ${new Date(reservation.reservationTo)
      .toISOString()
      .substring(0, 10)}`,
  }));

  return (
    <div>
      <div className="flex justify-center items-center my-10">
        <div
          style={{ width: "60%", height: "400px" }}
          className="bg-zinc-100 flex"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={[...transformedRoomData /*, ...transformedCarData*/]}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Line
                type="monotone"
                dataKey="Car"
                stroke="#8884d8"
                label={<CustomizedLabel />}
              /> */}
              <Line type="monotone" dataKey="Room" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-primary-dark flex justify-center items-center pt-5">
        <div
          className="text-2xl"
          style={{ fontSize: 12, width: "60%", height: "400px" }}
        >
          {/* {reservations.map((reservation) => (
            <div>{reservation.roomDetails?.RoomType}</div>
          ))} */}
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={paginationConfig}
          />
        </div>
      </div>
    </div>
  );
}
