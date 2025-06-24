"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminProfile, fetchProfile } from "@/features/profile/profileSlice";
import { Avatar, Button, Typography } from "@mui/material";
import moment from "moment";
import AlertDialogSlide from "@/components/dialog";
import FormProfile from "@/components/form-profile";

export default function ProfileModule() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.profile.data);
  const loading = useAppSelector((s) => s.profile.loading);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProfile | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full h-full py-20">
      <div className="flex items-center justify-center flex-col gap-4 w-full max-w-3xl mx-auto h-full relative">
        <Button
          onClick={() => {
            setOpen(true);
            setEditing(profile);
          }}
          variant="contained"
          className="absolute right-0 top-0"
        >
          Edit
        </Button>
        <div>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <div className="flex items-start justify-start flex-col gap-2 w-full">
          <Typography>Name:</Typography>
          <Typography variant="h5">
            {profile?.firstName} {profile?.lastName}
          </Typography>
        </div>
        <div className="flex items-start justify-start flex-col gap-2 w-full">
          <Typography>Email:</Typography>
          <Typography variant="h5">{profile?.email}</Typography>
        </div>
        <div className="flex items-start justify-start flex-col gap-2 w-full">
          <Typography>Gender:</Typography>
          <Typography variant="h5">{profile?.gender}</Typography>
        </div>
        <div className="flex items-start justify-start flex-col gap-2 w-full">
          <Typography>Birthdate:</Typography>
          <Typography variant="h5">
            {moment(profile?.birthDate).format("DD MMM YYYY")}
          </Typography>
        </div>

        {open && (
          <AlertDialogSlide open={open} handleClose={() => setOpen(false)}>
            <FormProfile
              existing={editing}
              onClose={() => {
                setOpen(false);
                setEditing({
                  firstName: "",
                  lastName: "",
                  email: "",
                  gender: "",
                  birthDate: "",
                });
              }}
            />
          </AlertDialogSlide>
        )}
      </div>
    </div>
  );
}
