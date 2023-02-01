import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import * as React from "react";
import { useForm } from "react-hook-form";
import { User, UserSchema, UserSchemaType } from "../../schema/user";
import ApiLoading from "./ApiLoading";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Props {
  errMsg: object | undefined;
  loading: boolean;
  open: boolean;
  setOpen(x: boolean):void;
  onSubmit(data: User): void;
}
const AddUser: React.FunctionComponent<Props> = ({ onSubmit, errMsg, loading,open, setOpen }) => {
  const [date, setDate] = React.useState<Dayjs | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: { id: 0 },
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">User Registration Form</Typography>
            {errMsg &&
              Object.values(errMsg).map((x, index) => (
                <Typography color="error" key={index}>
                  {x}
                </Typography>
              ))}
          </Box>
          <form onSubmit={handleSubmit((user) => onSubmit(user))}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <FormControl sx={{ width: "25ch" }}>
                  <TextField
                    variant="standard"
                    label="Name"
                    placeholder="Please enter text"
                    {...register("name")}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.name?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={6}>
                <FormControl sx={{ width: "25ch" }}>
                  <TextField
                    variant="standard"
                    type="email"
                    label="Email"
                    placeholder="Please enter text"
                    {...register("email_id")}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.email_id?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={6}>
                <FormControl sx={{ width: "25ch" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date of birth"
                      inputFormat="YYYY-MM-DD"
                      value={date}
                      onChange={(d: Dayjs | null) => {
                        if (d !== null) {
                          setDate(d);
                          setValue("dob", d.format("YYYY-MM-DD"));
                        }
                      }}
                      renderInput={(params) => (
                        <TextField variant="standard" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.dob?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={6}>
                <FormControl sx={{ width: "25ch" }}>
                  <TextField
                    label="Phone number"
                    variant="standard"
                    type="number"
                    placeholder="Please enter text"
                    {...register("phone_no", { valueAsNumber: true })}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.phone_no?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "end", my: 2 }}>
              <ApiLoading loading={loading}/>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddUser;
