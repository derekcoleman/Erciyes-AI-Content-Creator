import {
  Box,
  Modal,
  Typography,
  CardMedia,
  IconButton,
  Fade,
  Backdrop,
  Button,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { ReactNode, useState } from "react";
import { addPostManuel, formatDate } from "@/lib/utils";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ExpandedCardProps {
  open: boolean;
  onClose: () => void;
  title: string;
  postImage: string;
  content: string;
  hashtags: string[];
  likes: number;
  comments: number;
  date: string;
  platformIcon: ReactNode;
  id: number;
  onShareStatusChange: (status: boolean) => void;
  isShared?: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({
  open,
  onClose,
  title,
  postImage,
  content,
  hashtags,
  likes,
  comments,
  date,
  platformIcon,
  id,
  onShareStatusChange,
  isShared = false,
  onTitleChange,
  onContentChange,
}) => {
  const [shareStatus, setShareStatus] = useState<boolean>(isShared);
  const [loading, setLoading] = useState<boolean>(false);
  const [editableTitle, setEditableTitle] = useState<string>(title);
  const [editableContent, setEditableContent] = useState<string>(content);

  //veri tabanında postu güncellememiz gerekli
  const handleShare = async () => {
    setLoading(true);
    try {
      const response = await addPostManuel(id);

      if (response.status) {
        setShareStatus(true);
        onShareStatusChange(true);
      } else {
        setShareStatus(false);
        onShareStatusChange(false);
      }
    } catch (error) {
      console.error("Failed to share post: ", error);
      setShareStatus(false);
      onShareStatusChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTitleChange(newTitle);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    setEditableContent(newContent);
    onContentChange(newContent);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
            width: "80%",
            height: "80%",
            overflowY: "scroll",
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {isShared ? (
              <Typography variant="h4" component="div" gutterBottom>
                {title}
              </Typography>
            ) : (
              <TextField
                fullWidth
                variant="outlined"
                value={editableTitle}
                onChange={handleTitleChange}
                sx={{ mb: 2 }}
              />
            )}

            <Box
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                marginBottom: 2,
              }}
            >
              {loading && <CircularProgress />}
              {shareStatus ? (
                <CheckCircleOutlineIcon fontSize="large" color="success" />
              ) : loading ? (
                <ErrorOutlineIcon fontSize="large" color="error" />
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                color="primary"
                disabled={shareStatus}
                startIcon={<ShareIcon />}
                onClick={handleShare}
              >
                Paylaş
              </Button>
              {platformIcon}
            </Box>
          </Box>

          <CardMedia
            sx={{ height: 300, objectFit: "contain" }}
            image={postImage}
            title="Expanded Post Image"
          />
          {isShared ? (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {content}
            </Typography>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              value={editableContent}
              onChange={handleContentChange}
              multiline
              rows={6}
              sx={{ mt: 2 }}
            />
          )}

          <Box sx={{ marginTop: "auto" }}>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
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
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small">
                  <FavoriteIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2">{likes}</Typography>
                <IconButton size="small" sx={{ marginLeft: 1 }}>
                  <CommentIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2">{comments}</Typography>
              </Box>
              <Typography fontSize="small" color="text.secondary">
                {formatDate(date)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ExpandedCard;
