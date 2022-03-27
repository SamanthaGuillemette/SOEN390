/**
 * @fileoverview This component takes care of the AdminList function.
 *
 */
 import Box from "@mui/material/Box";
 import Table from "@mui/material/Table";
 import TableBody from "@mui/material/TableBody";
 import TableCell from "@mui/material/TableCell";
 import TableContainer from "@mui/material/TableContainer";
 import TableHead from "@mui/material/TableHead";
 import TableRow from "@mui/material/TableRow";
 import TablePagination from "@mui/material/TablePagination";
 import AccountBoxIcon from '@mui/icons-material/AccountBox';
 import { makeStyles } from "@material-ui/core/styles";
 import { useEffect, useState } from "react";
 import { getAdmins } from "../../backend/firebaseAdminUtilities";
 import EachRow from "./EachRow";

 // adding styling
 const dropdownStyle = makeStyles({
   paper: {
     background: "var(--background-main)", // giving background color to dropdown
     color: "var(--text-inactive)", // color of text in the dropdown
     borderRadius: "10px",
   },
   color: {
     color: "var(--text-inactive)", // color of text in pasgination
   },
   select: {
     "&:after": {
       borderBottomColor: "var(--text-inactive)",
     },
     "& .MuiSvgIcon-root": {
       color: "var(--text-inactive)", // color of pagination button
     },
   },
 });
 
 // function to create data
 function createData( adminName, id, dob, role, disabled) {
   return {adminName, id, dob, role, disabled};
 }
 
 function AdminList() {
   const classes = dropdownStyle(); // adding styling
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [adminsList, setAdminsList] = useState(null);
 
   useEffect(() => {
     getAdmins().then((data) => {
       let results = [];
       data.forEach((doc) => {
         results.push(
           createData(
             `${doc.firstName} ${doc.lastName}`,
             doc.email, 
             doc.dob, 
             doc.role,
             doc.disabled
           )
         );
       });
       setAdminsList(results);
     });
   }, []);
 
   /**
    * Function that handles changing the page of the admins
    * @param  {} event
    * @param  {} newPage
    */
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
 
   /**
    * Function that handles changing the row per page
    * @param  {} event
    */
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };

   return (
     <TableContainer className="ADMIN__table">
       <Box className="ADMIN__table__label">
         {" "}
         {/* Creating label*/}
         <AccountBoxIcon className="ADMIN__table__icon"/>
         Accounts List
       </Box>
       <Table aria-label="collapsible table">
         {/* Start of table headers */}
         <TableHead>
           <TableRow>
             <TableCell
               sx={{ borderColor: "var(--background-secondary)" }}
               className="ADMIN__table__header"
               align="left"
             >
              Admin Name
             </TableCell>
             <TableCell
               sx={{ borderColor: "var(--background-secondary)" }}
               className="ADMIN__table__header"
               align="left"
             >
               ID
             </TableCell>
             <TableCell
               sx={{ borderColor: "var(--background-secondary)" }}
               className="ADMIN__table__header"
               align="center"
             >
               Date of Birth
             </TableCell>
             <TableCell
               sx={{ borderColor: "var(--background-secondary)" }}
               className="ADMIN__table__header"
               align="center"
             >
               Role
             </TableCell>
             <TableCell
               sx={{ borderColor: "var(--background-secondary)" }}
               className="ADMIN__table__header"
               align="center"
             >
               Disable Account
             </TableCell>
           </TableRow>
         </TableHead>
         {/* End of table headers */}
         <TableBody>
           {/* Calculating how many pages to show per page */}
           {adminsList &&
             (rowsPerPage > 0
               ? adminsList.slice(
                   page * rowsPerPage,
                   page * rowsPerPage + rowsPerPage
                 )
               : adminsList
             ).map((row) => <EachRow key={row.id} row={row} />)}
         </TableBody>
       </Table>
       {adminsList && (
         <TablePagination // adding pagination
           classes={{
             root: classes.color,
           }}
           rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]} // displaying options 5, 10, or ALL
           component="div"
           count={adminsList.length} // setting how many rows there are in total
           rowsPerPage={rowsPerPage} // setting the rows per page
           page={page} // setting the page
           onPageChange={handleChangePage} // changing page
           onRowsPerPageChange={handleChangeRowsPerPage} // changing rows on page
           className={classes.select} // styling
           SelectProps={{
             inputProps: { "aria-label": "rows per page" },
             MenuProps: {
               classes: { paper: classes.paper },
               sx: {
                 "&& .Mui-selected": {
                   backgroundColor: "var(--background-secondary)",
                 },
               },
             },
           }}
         />
       )}
     </TableContainer>
   );
 }
 
 export default AdminList; 