"use client";

import { Controller, useForm } from "react-hook-form";
import {
  addEmployee,
  updateEmployee,
  Employee,
} from "@/features/employee/employeeSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  onClose: () => void;
  existing?: Employee | null;
};

export default function EmployeeForm({ onClose, existing }: Props) {
  const dispatch = useAppDispatch();

  const schema = yup.object({
    email: yup
      .string()
      .email("invalid email!")
      .required("Email must be filled!"),
    firstName: yup.string().required("First Name must be filled!"),
    lastName: yup.string().required("Last Name must be filled!"),
    gender: yup.string().required("Gender must be filled!"),
    phone: yup.string().required("Phone Number must be filled!"),
    address: yup.string().required("Address must be filled!"),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Employee, "id">>({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phone: "",
      address: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Omit<Employee, "id">) => {
    if (existing) {
      dispatch(updateEmployee({ id: existing.id, ...data }));
    } else {
      dispatch(addEmployee(data));
    }
    onClose();
  };

  const handleClose = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phone: "",
      address: "",
    });
    onClose();
  };

  useEffect(() => {
    if (existing) {
      reset(existing);
    }
  }, [existing, reset]);

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 space-y-4 rounded w-full min-w-lg max-w-lg"
      >
        <h2 className="text-lg font-semibold">
          {existing ? "Edit" : "Create"} Employee
        </h2>

        <div className="flex w-full gap-4 flex-col">
          <div className="grid grid-cols-2 gap-2">
            <TextField
              {...register("firstName", { required: true })}
              placeholder="First Name"
              label="First Name"
              fullWidth
              error={!!errors?.firstName?.message}
              helperText={errors?.firstName?.message}
            />

            <TextField
              {...register("lastName", { required: true })}
              placeholder="Last Name"
              label="Last Name"
              fullWidth
              error={!!errors?.lastName?.message}
              helperText={errors?.lastName?.message}
            />
          </div>

          <TextField
            {...register("email", { required: true })}
            placeholder="Email"
            label="Email"
            fullWidth
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
          />

          <TextField
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            label="Phone Number"
            fullWidth
            error={!!errors?.phone?.message}
            helperText={errors?.phone?.message}
          />

          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel id="gender-label">Pilih Jenis Kelamin</InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="gender-label"
                  label="Pilih Jenis Kelamin"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </FormControl>

          <TextField
            {...register("address", { required: true })}
            placeholder="Address"
            label="Address"
            fullWidth
            multiline
            rows={2}
            error={!!errors?.address?.message}
            helperText={errors?.address?.message}
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
