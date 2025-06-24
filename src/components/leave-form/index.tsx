"use client";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLeave, updateLeave, Leave } from "@/features/leave/leaveSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

type FormInput = {
  employeeId: string;
  reason: string;
  startDate: string;
  endDate: string;
};

export default function LeaveForm({
  onClose,
  existing,
}: {
  onClose: () => void;
  existing?: Leave | null;
}) {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((s) => s.employee.data);

  const schema = yup.object({
    reason: yup.string().required("Reason must be filled!"),
    startDate: yup.string().required("Start Date must be filled!"),
    endDate: yup.string().required("End Date must be filled!"),
    employeeId: yup.string().required("Employee must be selected!"),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "all",
    defaultValues: {
      reason: "",
      startDate: "",
      endDate: "",
      employeeId: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (existing) {
      reset({
        reason: existing.reason,
        startDate: existing.startDate.split("T")[0],
        endDate: existing.endDate.split("T")[0],
        employeeId: String(existing.employeeId),
      });
    }
  }, [existing, reset]);

  const onSubmit = async (data: FormInput) => {
    const payload = {
      ...data,
      employeeId: Number(data.employeeId),
    };

    const res = existing
      ? await dispatch(updateLeave({ id: existing.id, ...payload }))
      : await dispatch(addLeave(payload));

    if (!("error" in res)) {
      handleClose();
    }
  };

  const handleClose = () => {
    reset({
      reason: "",
      startDate: "",
      endDate: "",
      employeeId: "",
    });
    onClose();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded space-y-4 w-full min-w-lg max-w-lg"
      >
        <h2 className="text-lg font-semibold">
          {existing ? "Edit" : "Tambah"} Cuti Pegawai
        </h2>

        <div className="flex w-full gap-4 flex-col">
          <FormControl fullWidth error={!!errors.employeeId}>
            <InputLabel id="employeeId-label">Pilih Pegawai</InputLabel>
            <Controller
              name="employeeId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="employeeId-label"
                  label="Pilih Pegawai"
                >
                  {employees.map((e) => (
                    <MenuItem key={e.id} value={e.id.toString()}>
                      {e.firstName} {e.lastName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employeeId.message}
              </p>
            )}
          </FormControl>

          <TextField
            {...register("reason")}
            placeholder="Alasan cuti"
            label="Alasan"
            fullWidth
            error={!!errors?.reason?.message}
            helperText={errors?.reason?.message}
          />
          <TextField
            {...register("startDate")}
            type="date"
            label="Tanggal Mulai"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors?.startDate?.message}
            helperText={errors?.startDate?.message}
          />
          <TextField
            {...register("endDate")}
            type="date"
            label="Tanggal Selesai"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors?.endDate?.message}
            helperText={errors?.endDate?.message}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="contained" type="button" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="contained" type="submit">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
