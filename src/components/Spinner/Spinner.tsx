import { CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={35} thickness={2} color="primary" />
    </div>
  );
};

export default Spinner;
