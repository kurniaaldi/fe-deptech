"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  InputAdornment,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addAdmin } from "@/features/admin/adminslice";

type LoginFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: string;
};

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function RegisterModule() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    formState: { errors, isDirty },
  } = useForm<LoginFormData>({
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

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(addAdmin(data)).unwrap();
      router.push("/login");
    } catch (err) {
      console.error("Gagal register:", err);
    }
  };

  useEffect(() => {
    if (token) router.push("/login");
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
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
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Format email tidak valid",
                },
              })}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Minimal 6 karakter",
                },
              })}
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
              name="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
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

          <Button
            disabled={!isDirty}
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </Card>
    </div>
  );
}
