"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLeaves, deleteLeave, Leave } from "@/features/leave/leaveSlice";
import { fetchEmployees } from "@/features/employee/employeeSlice";
import LeaveForm from "@/components/leave-form";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Button,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AlertDialogSlide from "@/components/dialog";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function LeavePage() {
  const dispatch = useAppDispatch();
  const { data: leaves, pagination } = useAppSelector((s) => s.leave);
  //   const employees = useAppSelector((s) => s.employee.data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Leave | null>(null);

  useEffect(() => {
    dispatch(fetchEmployees({ page: 1, limit: 100 }));
    dispatch(fetchLeaves({ page: page + 1, limit: rowsPerPage }));
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
        <h1 className="text-xl font-bold">Data Cuti Pegawai</h1>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="success"
        >
          Add Leave
        </Button>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 500 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 170 }}>Employee</TableCell>
                <TableCell style={{ minWidth: 170 }}>Date</TableCell>
                <TableCell style={{ minWidth: 170 }}>Reason</TableCell>
                <TableCell style={{ minWidth: 170 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(leaves || []).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row?.Employee?.firstName} {row?.Employee?.lastName}
                  </TableCell>
                  <TableCell>
                    {row.startDate} s/d {row.endDate}
                  </TableCell>
                  <TableCell>{row.reason}</TableCell>
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
                      onClick={() => dispatch(deleteLeave(row.id))}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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

      <AlertDialogSlide open={open} handleClose={() => setOpen(false)}>
        <LeaveForm existing={editing} onClose={() => setOpen(false)} />
      </AlertDialogSlide>
    </div>
  );
}
