"use client";

import { Controller, useForm } from "react-hook-form";
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
import { addAdmin, Admin } from "@/features/admin/adminslice";
import { updateProfile } from "@/features/profile/profileSlice";

type Props = {
  onClose: () => void;
  existing?: Admin | null;
};

type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: string;
};

export default function AdminForm({ onClose, existing }: Props) {
  const dispatch = useAppDispatch();

  const schema = yup.object({
    email: yup.string().email("Invalid email!").required("Email is required!"),
    firstName: yup.string().required("First Name is required!"),
    lastName: yup.string().required("Last Name is required!"),
    gender: yup.string().required("Gender is required!"),
    birthDate: yup.string().required("Birthdate is required!"),
    password: yup.string().required("Password is required!"),
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
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthDate: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  console.log(existing);

  const onSubmit = async (data: FormInput) => {
    if (existing) {
      const updatePayload = { ...data, id: existing.id };
      dispatch(updateProfile(updatePayload));
    } else {
      const res = await dispatch(addAdmin(data)).unwrap();
      if (res) {
        onClose();
      }
    }
    onClose();
  };

  const handleClose = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthDate: "",
      password: "",
    });
    onClose();
  };

  useEffect(() => {
    if (existing) {
      reset({
        firstName: existing.firstName,
        lastName: existing.lastName,
        email: existing.email,
        gender: existing.gender,
        birthDate: existing.birthDate?.split("T")[0] || "",
        password: "",
      });
    }
  }, [existing, reset]);

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 space-y-4 rounded w-full min-w-lg max-w-lg"
      >
        <h2 className="text-lg font-semibold">
          {existing ? "Edit" : "Create"} Admin
        </h2>

        <div className="flex w-full gap-4 flex-col">
          <div className="grid grid-cols-2 gap-2">
            <TextField
              {...register("firstName")}
              placeholder="First Name"
              label="First Name"
              fullWidth
              error={!!errors?.firstName?.message}
              helperText={errors?.firstName?.message}
            />

            <TextField
              {...register("lastName")}
              placeholder="Last Name"
              label="Last Name"
              fullWidth
              error={!!errors?.lastName?.message}
              helperText={errors?.lastName?.message}
            />
          </div>

          <TextField
            {...register("email")}
            placeholder="Email"
            label="Email"
            fullWidth
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
          />

          <TextField
            {...register("password")}
            placeholder={
              existing ? "Leave blank to keep current password" : "Password"
            }
            label="Password"
            type="password"
            fullWidth
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
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
            {...register("birthDate")}
            placeholder="Birthdate"
            label="Birthdate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors?.birthDate?.message}
            helperText={errors?.birthDate?.message}
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
