import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { fetchTableData, fetchTables } from "../api/TableAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CustomCard: React.FC = () => {
  const [chartType, setChartType] = useState("");
  const [tables, setTables] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");

  useEffect(() => {
    const loadTables = async () => {
      const fetchTable = await fetchTables();
      setTables(fetchTable || []);
    };
    loadTables();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const loadTableData = async () => {
        const data = await fetchTableData(selectedTable);
        setTableData(data || []);
      };
      loadTableData();
    }
  }, [selectedTable]);

  const handleChartTypeChange = (event: SelectChangeEvent<string>) => {
    setChartType(event.target.value as string);
  };

  const handleTableChange = (event: SelectChangeEvent<string>) => {
    setSelectedTable(event.target.value as string);
  };

  const chartData = {
    labels: tableData.map((item) => item.name),
    datasets: [
      {
        label: "Quantity",
        data: tableData.map((item) => item.quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#F44336",
          "#FFC107",
        ],
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    const chartKey = `${chartType}-${selectedTable}`;
    switch (chartType) {
      case "bar":
        return <Bar key={chartKey} data={chartData} />;
      case "line":
        return <Line key={chartKey} data={chartData} />;
      case "pie":
        return <Pie key={chartKey} data={chartData} />;
      default:
        return (
          <Typography>Select a chart type to display the chart.</Typography>
        );
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "20px", p: "20px" }}>
      <Card sx={{ flex: "0 0 300px", padding: "10px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
            Select Data and Chart-Type :
          </Typography>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Entity/Data
            </Typography>
            <Select
              value={selectedTable}
              onChange={handleTableChange}
              fullWidth
              displayEmpty
              sx={{ border: "1px solid #ccc", borderRadius: 1, p: 1 }}
            >
              <MenuItem disabled value="">
                <em>Select a Table</em>
              </MenuItem>
              {tables.map((table) => (
                <MenuItem key={table} value={table}>
                  {table}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Chart Type
            </Typography>
            <Select
              value={chartType}
              onChange={handleChartTypeChange}
              fullWidth
              displayEmpty
              sx={{ border: "1px solid #ccc", borderRadius: 1, p: 1 }}
            >
              <MenuItem disabled value="">
                <em>Select Chart Type</em>
              </MenuItem>
              <MenuItem value="bar">Bar Chart</MenuItem>
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="pie">Pie Chart</MenuItem>
            </Select>
          </Box>
        </CardContent>
      </Card>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 600, height: 400 }}>
          {renderChart()}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomCard;
