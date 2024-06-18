import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
// import Stack from '@mui/joy/Stack';
import Typography from '@mui/material/Typography';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Swal from 'sweetalert2'
// import dayjs from 'dayjs';
import Package from '../../services/Package';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddPackage = (observer((props) => {

  const [newPackage, setNewPackage] = useState({
    name: "Package 1",
    trackingNumber: "TRACK001",
    collected: false,
    lat: 32.0853,
    lng: 34.7818,
  })
  // MeetingStore.addCountId()
  
  const handleAddPackage = (event) => {
    const { name, value } = event.target;
    setNewPackage({ ...newPackage, [name]: value });
    console.log(name)
    console.log(value)
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    props.setIsOpen(false)
    setOpen(false)
  }
  const save = async () => {
    // // if (!ServiceStore.serviceArr.find(x => x.id == meeting.serviceType)) {
    // //   Swal.fire({
    // //     title: "Error! id not correct!",
    // //     icon:"error"
    // //   })
    // // }
    //  if (meeting.clientName !== '' && meeting.clientEmail !== '' && meeting.clientPhone !== '') {
    //   await MeetingStore.saveMeeting(meeting);
    console.log(newPackage,"newPackage")
    let x=  Package.postPackage(newPackage);
    console.log("x", x)
    // Package.listPackages.push(newPackage)
      if (x!=null) {
        Swal.fire({
          title: "you successed",
          icon: "success",
        })
        Package.getPackages()
      }
      else
        Swal.fire({
          title: "the date is apear, please try again",
          icon: "warning"
        });
    
    handleClose();
  }
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          add package
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {/* <Stack spacing={2}> */}
              <TextField
                id="name"
                label="name"
                name="name"
                type='string'
                onChange={handleAddPackage}
              />
              <TextField
                id="trackingNumber"
                label="trackingNumber"
                name="trackingNumber"
                type='text'
                onChange={handleAddPackage}
              />
           
              <TextField
                id="collected"
                label="collected"
                name="collected"
                type='text'
                onChange={handleAddPackage}
              />
              <TextField
                id="lat"
                label="lat"
                name="lat"
                type='text'
                onChange={handleAddPackage}
              />
              <TextField
                id="lng"
                label="lng"
                name="lng"
                type='text'
                onChange={handleAddPackage}
              />
            {/* </Stack> */}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={save}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
))
export default AddPackage