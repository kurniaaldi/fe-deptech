"use client";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLeave } from "@/features/leave/leaveSlice";

type FormInput = {
  employeeId: number;
  reason: string;
  startDate: string;
  endDate: string;
};

export default function LeaveForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((s) => s.employee.data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    const res = await dispatch(addLeave(data));
    if (!("error" in res)) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded space-y-4 w-full max-w-md"
      >
        <h2 className="text-lg font-semibold">Tambah Cuti Pegawai</h2>

        <select
          {...register("employeeId", { required: true })}
          className="border p-2 w-full"
        >
          <option value="">Pilih Pegawai</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.firstName} {e.lastName}
            </option>
          ))}
        </select>

        <input
          {...register("reason", { required: true })}
          placeholder="Alasan cuti"
          className="border p-2 w-full"
        />
        <input
          {...register("startDate", { required: true })}
          type="date"
          className="border p-2 w-full"
        />
        <input
          {...register("endDate", { required: true })}
          type="date"
          className="border p-2 w-full"
        />

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
        {errors.reason && (
          <p className="text-red-500 text-sm">Semua field wajib diisi</p>
        )}
      </form>
    </div>
  );
}
