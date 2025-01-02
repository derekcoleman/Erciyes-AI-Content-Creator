import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface JobProps {
  id?: number;
  title: string;
  platform: string;
  days: string[];
  hour: string;
  sub_topic?: string;
  mood?: string;
  like?: number;
  comment?: number;
  interaction?: number;
  frequency?: number;
  onDelete: (jobId: number) => void;
}

const JobComponent: React.FC<JobProps> = ({
  id,
  title,
  platform,
  days,
  hour,
  sub_topic,
  mood,
  like,
  comment,
  interaction,
  frequency,
  onDelete,
}) => {
  if (!id) {
    throw new Error("id is required");
  }

  const interactionsData = [
    { label: "Beğeni", value: like },
    { label: "Yorum", value: comment },
    { label: "Etkileşim", value: interaction },
    { label: "Kelime Sıklığı", value: frequency },
  ];
  const filteredInteractions = interactionsData.filter(
    (item) => item.value !== 0
  );

  return (
    <Card sx={{ margin: 2, width: "96.5%" }}>
      <CardHeader
        sx={{ paddingBottom: 1 }}
        title={title}
        subheader={`Platform: ${platform}`}
        action={
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent sx={{ paddingTop: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Gün:{" "}
          </Typography>
          {days.map((day) => (
            <Chip key={day} label={day} sx={{ margin: 0.5 }} />
          ))}
          <Typography variant="body2" color="text.secondary">
            Alt Başlık:{" "}
          </Typography>
          {sub_topic ? (
            <Chip key={sub_topic} label={sub_topic} sx={{ margin: 0.5 }} />
          ) : (
            <Chip key={"sub_topic"} label={"Yok"} sx={{ margin: 0.5 }} />
          )}
          <Typography variant="body2" color="text.secondary">
            Mood:{" "}
          </Typography>
          {mood ? (
            <Chip key={mood} label={mood} sx={{ margin: 0.5 }} />
          ) : (
            <Chip key={"mood"} label={"Yok"} sx={{ margin: 0.5 }} />
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Gözetimler:{" "}
          </Typography>

          {like === 0 &&
            comment === 0 &&
            interaction === 0 &&
            frequency === 0 && (
              <Chip key="none" label={`Yok`} sx={{ margin: 0.5 }} />
            )}
          {filteredInteractions.map((item) => (
            <Chip key={item.label} label={item.label} sx={{ margin: 0.5 }} />
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
