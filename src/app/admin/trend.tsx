import React, { PureComponent } from "react";
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
import { Space, Table } from "antd";
import type { TableProps } from "antd";



interface DataType {
  key: string;
  name: string;
  RoomNumber: number;
  RoomType: string;
  Date: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
    key: "Date",
    dataIndex: "Date",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    RoomNumber: 32,
    RoomType: "King",
    Date: "From: 20/1/2024, Till: 21/1/2024",
  },
  {
    key: "2",
    name: "Jim Green",
    RoomNumber: 42,
    RoomType: "Deluxe",
    Date: "From: 20/1/2024, Till: 25/1/2024",
  },
  {
    key: "3",
    name: "Joe Black",
    RoomNumber: 30,
    RoomType: "Superior",
    Date: "From: 22/1/2024, Till: 24/1/2024",
  },
];

const graphData = [
  {
    name: "20/1/2024",
    Room: 30,
    Car: 12,
  },
  {
    name: "21/1/2024",
    Room: 31,
    Car: 9,
  },
  {
    name: "22/1/2024",
    Room: 22,
    Car: 10,
  },
  {
    name: "23/1/2024",
    Room: 24,
    Car: 14,
  },
  {
    name: "24/1/2024",
    Room: 28,
    Car: 8,
  },
  {
    name: "25/1/2024",
    Room: 30,
    Car: 15,
  },
  {
    name: "26/1/2024",
    Room: 34,
    Car: 14,
  },
];

interface CustomizedLabelProps {
  x?: number;
  y?: number;
  stroke?: string;
  value?: string | number;
}

class CustomizedLabel extends PureComponent<CustomizedLabelProps> {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
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

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/line-chart-with-customized-label-hs5b7";

  render() {
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
                data={graphData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  height={60}
                  tick={<CustomizedAxisTick />}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Car"
                  stroke="#8884d8"
                  label={<CustomizedLabel />}
                />
                <Line type="monotone" dataKey="Room" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-primary-dark flex justify-center items-center pt-5">
          <div className="text-2xl" style={{fontSize: 12, width: "60%", height: "400px"}}>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    );
  }
}
