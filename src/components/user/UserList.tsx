import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { User } from "../../schema/user";
import getUserAPI from "../../services/api";
import AddUser from "./AddUser";
import UserDelete from "./UserDelete";
import UserEdit from "./UserEdit";

export default function UserList() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [userLoading, setUserLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [errors, setErrors] = React.useState<Object>();
  React.useEffect(() => {
    const api = getUserAPI();
    api.getUserList().then((data) => setUsers(data));
  }, []);

  function onDelete(id: number) {
    const api = getUserAPI();
    api
      .deleteUser(id)
      .then((res) => setUsers(users.filter((obj) => obj.id !== id)));
  }

  const onUserAddFormSubmitted = (user: User) => {
    console.log(user);
    setUserLoading(true);
    const api = getUserAPI();
    api
      .addUser(user)
      .then((returned_user) => {
        setUsers([...users, returned_user]);
        setUserLoading(false);
        setOpen(false)
      })
      .catch((err) => {
        setErrors(err.response?.data);
        setUserLoading(false);
      });
  };

  const handleOpen = (val: boolean) => {
    setOpen(val);
  };

  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">User CRUD using Django/React</Typography>
        <AddUser
          open={open}
          setOpen={handleOpen}
          loading={userLoading}
          errMsg={errors}
          onSubmit={onUserAddFormSubmitted}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th">#</TableCell>
              <TableCell component="th">Name</TableCell>
              <TableCell component="th">Email</TableCell>
              <TableCell component="th">Date of birth</TableCell>
              <TableCell component="th">Phone number</TableCell>
              <TableCell component="th">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email_id}</TableCell>
                <TableCell>{String(row.dob)}</TableCell>
                <TableCell>{row.phone_no}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <UserEdit />
                    <UserDelete onDelete={onDelete} row={row} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
