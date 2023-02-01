import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

interface Props {
  loading: boolean;
}
const ApiLoading: React.FunctionComponent<Props> = ({ loading }) => {
  return (
    <div>
      <Button
        disabled={loading}
        type="submit"
        variant="contained"
      >
        Save
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ApiLoading;
