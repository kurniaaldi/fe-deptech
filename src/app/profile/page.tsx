"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProfile, updateProfile } from "@/features/profile/profileSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.profile.data);
  const loading = useAppSelector((s) => s.profile.loading);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      Object.entries(profile).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    }
  }, [profile, setValue]);

  const onSubmit = (data: any) => {
    dispatch(updateProfile(data));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <input
        {...register("firstName")}
        className="border p-2 w-full"
        placeholder="Nama Depan"
      />
      <input
        {...register("lastName")}
        className="border p-2 w-full"
        placeholder="Nama Belakang"
      />
      <input
        {...register("email")}
        disabled
        className="border p-2 w-full bg-gray-100"
      />
      <input
        {...register("birthDate")}
        type="date"
        className="border p-2 w-full"
      />
      <select {...register("gender")} className="border p-2 w-full">
        <option value="male">Laki-laki</option>
        <option value="female">Perempuan</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>
    </form>
  );
}
