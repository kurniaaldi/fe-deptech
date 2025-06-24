"use client";

import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { AdminProfile, updateProfile } from "@/features/profile/profileSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

type Props = {
  onClose: () => void;
  existing?: AdminProfile | null;
};

export default function FormProfile({ onClose, existing }: Props) {
  const dispatch = useAppDispatch();

  const schema = yup.object({
    email: yup
      .string()
      .email("invalid email!")
      .required("Email must be filled!"),
    firstName: yup.string().required("First Name must be filled!"),
    lastName: yup.string().required("Last Name must be filled!"),
    gender: yup.string().required("Gender must be filled!"),
    birthDate: yup.string().required("Birthdate must be filled!"),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthDate: "",
    },
    resolver: yupResolver(schema),
  });
  console.log(watch());

  useEffect(() => {
    if (existing) {
      reset({
        firstName: existing.firstName,
        lastName: existing.lastName,
        email: existing.email,
        gender: existing.gender,
        birthDate: existing.birthDate?.split("T")[0],
      });
    }
  }, [existing, reset]);

  const onSubmit = (data: any) => {
    dispatch(updateProfile(data));
  };

  const handleClose = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthDate: "",
    });
    onClose();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-4 min-w-lg max-w-lg"
      >
        <h2 className="text-lg font-semibold">
          {existing ? "Edit" : "Tambah"} Profile
        </h2>
        <div className="flex w-full gap-4 flex-col">
          <TextField
            {...register("firstName")}
            placeholder="First Name"
            label="First Name"
          />
          <TextField
            {...register("lastName")}
            label="Last Name"
            placeholder="Last Name"
          />
          <TextField
            {...register("email")}
            label="Email"
            placeholder="Email"
            disabled
          />
          <TextField
            {...register("birthDate")}
            label="Birthdate"
            placeholder="Birthdate"
            type="date"
          />

          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} labelId="gender-label" label="Gender">
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
