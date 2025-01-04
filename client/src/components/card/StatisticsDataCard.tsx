import { formatDate, textLimiter } from "@/lib/utils";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import TopixIcon from "../icons/TopixIcon ";

interface StatisticsDataCardProps {
  title: string;
  likes: number;
  comments: number;
  date?: string;
  postImage: string;
  content?: string;
  hashtags?: string[];
}

const StatisticsDataCard: React.FC<StatisticsDataCardProps> = ({
  title,
  likes,
  comments,
  date,
  postImage,
  content,
  hashtags = [],
}) => {
  const theme = useTheme();
  return (
    <Card
      className="statistics-data-card"
      sx={{
        border: `${"2px solid" + theme.palette.customColors.inncerCardBorder}`,
        display: "flex",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <CardMedia
          component="img"
          sx={{ height: "182px", width: "182px", objectFit: "contain" }}
          image={postImage}
          alt={title}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <TopixIcon />
          <Typography variant="body2" color="textSecondary">
            {formatDate("2024-12-30T18:35:31.000Z")}
          </Typography>
        </Box>
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1" component="div">
          {textLimiter(content, 300)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: "auto",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FavoriteIcon fontSize="small" /> {likes}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CommentIcon fontSize="small" />
              {comments}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {hashtags.map((tag, index) => (
              <span
                key={index}
                style={{ marginRight: "5px", color: "#007bff" }}
              >
                #{tag}
              </span>
            ))}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatisticsDataCard;
