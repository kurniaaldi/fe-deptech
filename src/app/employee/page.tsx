"use client";
import api from "@/libs/api";
import { useEffect, useState } from "react";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    const res = await api.get("/employee");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Data Pegawai</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e: any) => (
            <tr key={e.id}>
              <td>
                {e.firstName} {e.lastName}
              </td>
              <td>{e.email}</td>
              <td>
                <button>Edit</button>
                <button>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
