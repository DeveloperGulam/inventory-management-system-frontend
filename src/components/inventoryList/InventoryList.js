import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import './inventoryList.css';

const InventoryList = ({ inventory, onRemoveInventory }) => {
  return (
    <div className="inventory-table">
      <h3 className="t-title">Inventory List</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              {onRemoveInventory && <TableCell align="right">Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                {onRemoveInventory && (
                  <TableCell align="right">
                    <Button variant="contained" sx={{backgroundColor: "#d33"}} color="secondary" onClick={() => onRemoveInventory(item._id)}>
                      Remove
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InventoryList;