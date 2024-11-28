import React, { useState } from "react";
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
import FacebookIcon from "@mui/icons-material/Facebook";
import { textLimiter } from "@/lib/utils";
import ExpandedCard from "./ExpandedCard";

interface CustomCardProps {
  platform: string;
  postImage: string;
  title: string;
  content: string;
  hashtags: string[];
  likes: number;
  comments: number;
  date: string;
  height?: number;
  isInnerCard?: boolean;
}

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
}) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderPlatformIcon = () => {
    switch (platform) {
      case "instagram":
        return <InstagramIcon />;
      case "linkedIn":
        return <LinkedInIcon />;
      case "facebook":
        return <FacebookIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: `${
            isInnerCard ? theme.palette.customColors.innerCard : ""
          }`,
          maxWidth: "38vw",
          display: "flex",
          justifyContent: "center",
          height,
        }}
        onClick={handleClick}
      >
        <CardContent sx={{ width: "40%" }}>
          {renderPlatformIcon()}
          <CardMedia
            sx={{ height: 140, objectFit: "contain" }}
            image={postImage}
            title="green iguana"
          />
        </CardContent>
        <CardContent sx={{ width: "50%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {textLimiter(content)}
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
            {new Date(date).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <ExpandedCard
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
      />
    </>
  );
};

export default CustomCard;
