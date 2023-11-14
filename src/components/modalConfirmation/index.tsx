import * as React from "react";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "./styles";
import { Trash } from "phosphor-react";
import { ButtonCancel, ButtonConfirm } from "./styles";

interface ModalConfirmProps {
  deleteFunction: () => void;
}

export function ModalConfirmation({ deleteFunction }: ModalConfirmProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function DeleteAndCloseModal() {
    deleteFunction();
    setOpen(false);
  }

  return (
    <div>
      <Delete onClick={handleClickOpen}>
        <Trash />
        Deletar
      </Delete>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#323238",
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle color="white" id="alert-dialog-title">
          {"Tem certeza que deseja deletar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color={"#c4c4cc"} id="alert-dialog-description">
            Atenção essa ação não pode ser desfeita, portanto tenha certeza.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={handleClose}>Cancelar</ButtonCancel>
          <ButtonConfirm
            variant="contained"
            onClick={DeleteAndCloseModal}
            autoFocus
          >
            Confirmar
          </ButtonConfirm>
        </DialogActions>
      </Dialog>
    </div>
  );
}
