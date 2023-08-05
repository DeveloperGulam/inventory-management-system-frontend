import React from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import './inventoryList.css';

const InventoryList = ({ inventory, onEditInventory, onRemoveInventory }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#21C39E",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#dcfcf5",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className="inventory-table">
      <h3 className="t-title">Inventory List</h3>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              {onRemoveInventory && <StyledTableCell align="right">Action</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                {onRemoveInventory && (
                  <StyledTableCell align="right">
                    <Button variant="contained" sx={{backgroundColor: "#21C39E", marginX: "20px"}} color="secondary" onClick={() => onEditInventory(item._id)}>
                       Edit <DriveFileRenameOutlineIcon sx={{fontSize: "18px"}} /> 
                    </Button>
                    <Button variant="contained" sx={{backgroundColor: "#d33"}} color="secondary" onClick={() => onRemoveInventory(item._id)}>
                      Delete <DeleteIcon sx={{fontSize: "18px"}} /> 
                    </Button>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InventoryList;