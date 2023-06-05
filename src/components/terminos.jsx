import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../style/terms.css";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <p
        className="terms-cond"
        style={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        Términos y condiciones
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalbox">
          <Typography id="modal-modal-title" variant="h6" component="h5">
            Términos y condiciones:
          </Typography>
          <Typography
            style={{ fontSize: "12px" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Propiedad intelectual Todos los contenidos de la aplicación,
            incluyendo la música, las imágenes, los gráficos, las fotografías,
            los videos, los textos y los logotipos, son propiedad de Audn o de
            sus respectivos propietarios de derechos de autor. Usted no está
            autorizado a copiar, distribuir, transmitir, reproducir, publicar,
            vender, otorgar licencias o explotar de cualquier otra manera los
            contenidos de la aplicación sin el permiso previo por escrito de
            Audn. Uso de la aplicación La aplicación está destinada
            exclusivamente para su uso personal y no comercial. Usted no está
            autorizado a utilizar la aplicación para cualquier otro propósito,
            incluyendo, pero no limitado a, la transmisión, el almacenamiento o
            la distribución de contenido ilegal o inapropiado. Usted no debe
            utilizar la aplicación para cualquier actividad que pueda dañar la
            reputación de Audn o de cualquier tercero.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
