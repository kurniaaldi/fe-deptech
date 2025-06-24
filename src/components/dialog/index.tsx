import * as React from "react";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IPropsDialog {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function AlertDialogSlide(props: IPropsDialog) {
  const { open, handleClose, children, title } = props;

  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title || ""}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
