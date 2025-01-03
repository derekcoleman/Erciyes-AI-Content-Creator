import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { addPostManuel, formatDate, textLimiter } from "@/lib/utils";
import ExpandedCard from "./ExpandedCard";
import { CustomCardProps } from "@/lib/types";
import TopixIcon from "../icons/TopixIcon ";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ShareIcon from "@mui/icons-material/Share";

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
  onTitleChange,
  onContentChange,
}) => {
  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<number>(isShared);
  const [error, setError] = useState(false);

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

  const handleTitleEdit = (newTitle: string) => {
    onTitleChange(id, newTitle);
  };

  const handleContentEdit = (newContent: string) => {
    onContentChange(id, newContent);
  };

  const handleShare = async () => {
    setLoading(true);
    try {
      const response = await addPostManuel(id);

      if (response.status) {
        setShareStatus(1);
      } else {
        setShareStatus(0);
      }
    } catch (error) {
      console.error("Failed to share post: ", error);
      setShareStatus(0);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
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
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
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
        <CardContent
          sx={{ width: "50%", display: "flex", flexDirection: "column" }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {textLimiter(title, 15)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {textLimiter(content, isShared === 0 ? 200 : 120)}
          </Typography>
          <Box sx={{ marginTop: "auto" }}>
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
            {shareStatus === 1 && (
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
            )}

            <Typography
              fontSize="small"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              {formatDate(date)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box>
        {loading && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        )}
        {error && (
          <ErrorOutlineIcon
            fontSize="large"
            color="error"
            sx={{ position: "absolute", zIndex: 1 }}
          />
        )}
        <Button
          variant="contained"
          color={error ? "warning" : "primary"}
          disabled={shareStatus === 1}
          startIcon={<ShareIcon />}
          onClick={handleShare}
          sx={{
            width: "100%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          Paylaş
        </Button>
      </Box>

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
        isShared={shareStatus === 1 ? true : false}
        onTitleChange={handleTitleEdit}
        onContentChange={handleContentEdit}
      />
    </Box>
  );
};

export default CustomCard;
