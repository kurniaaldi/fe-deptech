"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  fetchEmployees,
  deleteEmployee,
  Employee,
} from "@/features/employee/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EmployeeForm from "@/components/employee-form";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
  IconButton,
  Button,
} from "@mui/material";
import AlertDialogSlide from "@/components/dialog";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Swal from "sweetalert2";

export default function EmployeeModule() {
  const dispatch = useAppDispatch();
  const { data: employees, pagination } = useAppSelector(
    (state) => state.employee,
  );
  const [editing, setEditing] = useState<Employee | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Data Pegawai</h1>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Tambah Pegawai
        </Button>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 500 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 170 }}>Name</TableCell>
                <TableCell style={{ minWidth: 170 }}>Email</TableCell>
                <TableCell style={{ minWidth: 170 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(employees || []).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell style={{ width: 160 }}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEditing(row);
                        setOpen(true);
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure want delete pemanently?",
                          icon: "warning",
                          showCancelButton: true,
                          cancelButtonColor: "gray",
                          confirmButtonText: "delete",
                          cancelButtonText: "cancel",
                          reverseButtons: true,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(deleteEmployee(row.id));
                          }
                        });
                      }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pagination.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {open && (
        <AlertDialogSlide open={open} handleClose={() => setOpen(false)}>
          <EmployeeForm onClose={() => setOpen(false)} existing={editing} />
        </AlertDialogSlide>
      )}
    </div>
  );
}
