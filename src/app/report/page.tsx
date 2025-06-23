"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReport } from "@/features/report/reportSlice";

export default function ReportPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((s) => s.report);

  useEffect(() => {
    dispatch(fetchReport());
  }, [dispatch]);
  console.log(data);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Laporan Cuti Pegawai</h1>
      {data.map((emp) => (
        <div key={emp.id} className="border p-4 mb-4">
          <h2 className="font-semibold">
            {emp.firstName} {emp.lastName}
          </h2>
          <ul className="list-disc ml-4">
            {emp.Leaves.map((cuti) => (
              <li key={cuti.id}>
                {cuti.reason} – {cuti.startDate} s/d {cuti.endDate}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
