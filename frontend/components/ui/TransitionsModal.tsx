"use client";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

interface AppModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: {
    xs: "90%",
    sm: "80%",
    md: 600,
  },
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

// Modal bileşeninin genel iskelet yapısı
const TransitionsModal = ({
  open,
  title,
  onClose,
  children,
}: AppModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">{title}</Typography>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>
          <div>{children}</div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
