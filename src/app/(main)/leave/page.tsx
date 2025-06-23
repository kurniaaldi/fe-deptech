"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLeaves, deleteLeave } from "@/features/leave/leaveSlice";
import { fetchEmployees } from "@/features/employee/employeeSlice";
import LeaveForm from "@/components/leave-form";

export default function LeavePage() {
  const dispatch = useAppDispatch();
  const leaves = useAppSelector((s) => s.leave.data);
  //   const employees = useAppSelector((s) => s.employee.data);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchLeaves());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Data Cuti Pegawai</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Tambah Cuti
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Pegawai</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Alasan</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l: any) => (
            <tr key={l.id}>
              <td className="border p-2">
                {l.Employee?.firstName} {l.Employee?.lastName}
              </td>
              <td className="border p-2">
                {l.startDate} s/d {l.endDate}
              </td>
              <td className="border p-2">{l.reason}</td>
              <td className="border p-2">
                <button
                  onClick={() => dispatch(deleteLeave(l.id))}
                  className="text-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && <LeaveForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
