"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReport } from "@/features/report/reportSlice";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

export default function ReportPage() {
  const dispatch = useAppDispatch();
  const { data, loading, pagination } = useAppSelector((s) => s.report);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchReport({ page: page + 1, limit: 10 }));
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Report Employee Leaves</h1>

      {data.map((emp) => (
        <Accordion key={emp.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              {emp.firstName} {emp.lastName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-disc ml-4">
              {emp.Leaves.map((cuti) => (
                <li key={cuti.id}>
                  {cuti.reason} – {moment(cuti.startDate).format("DD-MM-yyyy")}{" "}
                  s/d {moment(cuti.endDate).format("DD-MM-yyyy")}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="flex items-center justify-center w-full p-4">
        <Pagination
          onChange={handleChangePage}
          color="primary"
          count={pagination.totalPages}
        />
      </div>
    </div>
  );
}
