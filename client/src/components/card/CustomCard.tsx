import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { formatDate, textLimiter } from "@/lib/utils";
import ExpandedCard from "./ExpandedCard";
import { CustomCardProps } from "@/lib/types";
import TopixIcon from "../icons/TopixIcon ";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";

const CustomCard: React.FC<CustomCardProps> = ({
  platform,
  postImage,
  title,
  content,
  hashtags,
  likes,
  comments,
  date,
  height = 230,
  isInnerCard,
  id,
  isShared,
}) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<number>(isShared);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderPlatformIcon = () => {
    switch (platform) {
      case "Topix":
        return <TopixIcon />;
      case "instagram":
        return <InstagramIcon />;
      case "linkedIn":
        return <LinkedInIcon />;
      default:
        return null;
    }
  };

  const handleShareStatusChange = (status: boolean) => {
    setShareStatus(status ? 1 : 0);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: `${isInnerCard ? "customColors.innerCard" : ""}`,
          border: `${
            isInnerCard
              ? "1px solid" + theme.palette.customColors.inncerCardBorder
              : ""
          }`,
          width: "100%",
          maxWidth: "38vw",
          display: "flex",
          justifyContent: "center",
          height,
        }}
        onClick={handleClick}
      >
        <CardContent sx={{ width: "40%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {renderPlatformIcon()}
            {shareStatus === 1 ? (
              <DoneAllIcon sx={{ color: "lightseagreen" }} />
            ) : (
              <ScheduleSendIcon sx={{ color: "#d4aa00" }} />
            )}
          </Box>
          <CardMedia
            sx={{ height: 140, objectFit: "contain" }}
            image={postImage}
            title="No Image"
          />
        </CardContent>
        <CardContent sx={{ width: "50%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {textLimiter(title, 15)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {textLimiter(content, 150)}
          </Typography>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton size="small">
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">{likes}</Typography>
            <IconButton size="small" sx={{ marginLeft: 1 }}>
              <CommentIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">{comments}</Typography>
          </Box>
          <Typography
            fontSize="small"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {formatDate(date)}
          </Typography>
        </CardContent>
      </Card>
      <ExpandedCard
        id={id}
        open={open}
        onClose={handleClose}
        title={title}
        postImage={postImage}
        content={content}
        hashtags={hashtags}
        likes={likes}
        comments={comments}
        date={date}
        platformIcon={renderPlatformIcon()}
        onShareStatusChange={handleShareStatusChange}
        isShared={shareStatus === 1 ? true : false}
      />
    </>
  );
};

export default CustomCard;
