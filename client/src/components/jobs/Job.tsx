import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
} from "@mui/material";

interface JobProps {
  title: string;
  platform: string;
  days: string[];
  hour: string;
}

const Job: React.FC<JobProps> = ({ title, platform, days, hour }) => {
  return (
    <Card sx={{ margin: 2, width: "96.5%" }}>
      <CardHeader title={title} subheader={`Platform: ${platform}`} />
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Günler:{" "}
          </Typography>
          {days.map((day) => (
            <Chip key={day} label={day} sx={{ margin: 0.5 }} />
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Saat: {hour || "Seçim yapılmadı"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Job;
