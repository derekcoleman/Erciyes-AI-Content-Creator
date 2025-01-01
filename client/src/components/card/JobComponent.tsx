import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface JobProps {
  id: number;
  title: string;
  platform: string;
  days: string[];
  hour: string;
  onDelete: (jobId: number) => void;
}

const JobComponent: React.FC<JobProps> = ({
  id,
  title,
  platform,
  days,
  hour,
  onDelete,
}) => {
  return (
    <Card sx={{ margin: 2, width: "96.5%" }}>
      <CardHeader
        title={title}
        subheader={`Platform: ${platform}`}
        action={
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        }
      />
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

export default JobComponent;
