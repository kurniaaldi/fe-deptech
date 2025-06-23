"use client";

import { useForm } from "react-hook-form";
import { loginAdmin } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginAdmin(data));
  };

  useEffect(() => {
    if (token) router.push("/employee");
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full space-y-4 p-6 border rounded"
      >
        <div>
          <input
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Format email tidak valid",
              },
            })}
            placeholder="Email"
            className="w-full border p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Minimal 6 karakter",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full border p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
