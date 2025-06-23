"use client";

import { useEffect, useState } from "react";
import {
  fetchEmployees,
  deleteEmployee,
  Employee,
} from "@/features/employee/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EmployeeForm from "@/components/employee-form";

export default function EmployeePage() {
  const dispatch = useAppDispatch();
  const { data: employees } = useAppSelector((state) => state.employee);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Data Pegawai</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Tambah Pegawai
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="border p-2">
                {emp.firstName} {emp.lastName}
              </td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setEditing(emp);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => dispatch(deleteEmployee(emp.id))}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <EmployeeForm onClose={() => setShowForm(false)} existing={editing} />
      )}
    </div>
  );
}
