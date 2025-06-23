"use client";

import { useForm } from "react-hook-form";
import {
  addEmployee,
  updateEmployee,
  Employee,
} from "@/features/employee/employeeSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
  existing?: Employee | null;
};

export default function EmployeeForm({ onClose, existing }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Employee, "id">>();

  const onSubmit = (data: Omit<Employee, "id">) => {
    if (existing) {
      dispatch(updateEmployee({ id: existing.id, ...data }));
    } else {
      dispatch(addEmployee(data));
    }
    onClose();
  };

  useEffect(() => {
    if (existing) {
      reset(existing);
    }
  }, [existing, reset]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded space-y-4 w-full max-w-md"
      >
        <h2 className="text-lg font-semibold">
          {existing ? "Edit" : "Tambah"} Pegawai
        </h2>

        <input
          {...register("firstName", { required: true })}
          placeholder="Nama Depan"
          className="border p-2 w-full"
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">Wajib diisi</span>
        )}

        <input
          {...register("lastName", { required: true })}
          placeholder="Nama Belakang"
          className="border p-2 w-full"
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">Wajib diisi</span>
        )}

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="border p-2 w-full"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">Wajib diisi</span>
        )}

        <select
          {...register("gender", { required: true })}
          className="border p-2 w-full"
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
        {errors.gender && (
          <span className="text-red-500 text-sm">Wajib diisi</span>
        )}

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="text-gray-500">
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
