import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div id="home">
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Welcome to the Personal Trainer app!
      </Typography>
      <Typography variant="h6">
        Start managing your appointments and tracking your data by adding
        customers.
      </Typography>
    </div>
  );
}
