import React, { useCallback, useEffect, useState } from "react";
import "./dashboard.css";
import InventoryList from "../inventoryList/InventoryList";
import { getUserFromToken } from "../../utils/jwtUtils";
import { createInventory, deleteInventory, getAllInventory, updateInventory } from "../../api/inventoryApi";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Paper, Toolbar, CircularProgress, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Sidebar from "../Sidebar/Sidebar";
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leftBoxWidth, setLeftBoxWidth] = useState('calc(100vw - 280px)');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserFromToken();
        setLoggedUser(userData);
        fetchInventory();
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await getAllInventory();
      setInventory(response);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching inventory data", err);
      setError("Error fetching inventory data");
      setLoading(false);
    }
  };

  const inventoryForm = async (prevItem) => {
    const { value: item } = await Swal.fire({
      title: prevItem ? 'Update Item Details' : 'Enter Item Details',
      html:
        `<input type="text" value="${prevItem ? prevItem.name : ''}" id="item-name" class="swal2-input" placeholder="Item name">` +
        `<input type="number" value="${prevItem ? prevItem.quantity : ''}" id="item-quantity" class="swal2-input" placeholder="Item quantity">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#21C39E',
      preConfirm: () => {
        const name = document.getElementById('item-name').value;
        const quantity = document.getElementById('item-quantity').value;
    
        if (!name || !quantity) {
          Swal.showValidationMessage('Item name and quantity are required');
          return false;
        }
    
        return { name, quantity };
      }
    });

    return item;
  }

  const handleAddInventory = async () => {
    try {
      const item = await inventoryForm();

      if (item) {
        const response = await createInventory(item);
        setInventory([...inventory, response]);
      }
      
    } catch (err) {
      console.error("Error adding inventory item", err);
    }
  };

  const handleRemoveInventory = async (itemId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#21C39E',
        confirmButtonText: 'Yes, Delete!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteInventory(itemId);
          setInventory(inventory.filter((item) => item._id !== itemId));
        }
      });
      
    } catch (err) {
      console.error("Error removing inventory item", err);
    }
  };

  const handleEditInventory = async (itemId) => {
    try {
      const prevItem = inventory.find((item) => item._id === itemId);
      if (!prevItem) return;
  
      const updatedItem = await inventoryForm(prevItem);

      if (updatedItem) {
        const response = await updateInventory(itemId, updatedItem);
        setInventory(inventory.map((item) => (item._id === itemId ? response : item)));
      }
    } catch (err) {
      console.error("Error updating inventory item", err);
    }
  };  

  const renderBarChart = (inventory) => {
    const labels = inventory.map((item) => item.name);
    const quantities = inventory.map((item) => item.quantity);

    const barChartData = {
      labels: labels,
      datasets: [
        {
          label: "Quantity",
          data: quantities,
          backgroundColor: "rgba(75, 192, 192, 0.8)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    return barChartData;
  };

  const handleSidebarToggle = useCallback((res) => {
    setLeftBoxWidth(res ? 'calc(100vw - 280px)' : 'calc(100vw - 90px)');
  }, []);

  return (
    <div>
      <div style={{ float: "left" }}>
        <Sidebar onClose={handleSidebarToggle} />
      </div>

      <div style={{ float: "right", width: leftBoxWidth }}>
        <div style={{backgroundColor: "#dcfcf5", padding: "5px", borderRadius: "0px 0px 20px 20px"}}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, color: "#21C39E", fontWeight: "bold" }}>
              Inventory Management
            </Typography>
            <Typography>Welcome, {loggedUser?.username}!</Typography>
          </Toolbar>
        </div>

        {loggedUser?.level === 1 && (
          <div style={{ padding: "16px", display: 'flex', justifyContent: "flex-end" }}>
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: "#21C39E",
                "&:hover": {
                  backgroundColor: "#0e7469",
                },
              }} 
              onClick={handleAddInventory}
            > <AddIcon /> Add Inventory</Button>
          </div>
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error" variant="body1" align="center" style={{ padding: "16px" }}>
            {error}
          </Typography>
        ) : inventory.length === 0 ? (
          <Typography variant="body1" align="center" style={{ padding: "16px" }}>
            No inventory data available.
          </Typography>
        ) : (
          <div style={{ display: "grid"}}>
            <div style={{ margin: "40px" }}>
              <Paper>
                <Bar
                  style={{ minHeight: "200px", maxHeight: "550px"}}
                  data={renderBarChart(inventory)}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Inventory Quantity Chart",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Quantity",
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Item",
                        },
                      },
                    },
                    indexAxis: 'x',
                    datasets: {
                      bar: {
                        barThickness: 50,
                      },
                    },
                  }}
                />
              </Paper>
            </div>
            <div style={{ width: "100%"}}>
              <InventoryList
                inventory={inventory}
                onEditInventory={loggedUser?.level === 1 ? handleEditInventory : undefined}
                onRemoveInventory={loggedUser?.level === 1 ? handleRemoveInventory : undefined}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
