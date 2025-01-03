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
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { ReactNode, useState } from "react";
import { formatDate, updatePost } from "@/lib/utils";
import CircularProgress from "@mui/material/CircularProgress";
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
  isShared = false,
  onTitleChange,
  onContentChange,
}) => {
  const [shareStatus, setShareStatus] = useState<boolean>(isShared);
  const [loading, setLoading] = useState<boolean>(false);
  const [editableTitle, setEditableTitle] = useState<string>(title);
  const [editableContent, setEditableContent] = useState<string>(content);
  const [error, setError] = useState(false);

  const handleUpdatePost = async () => {
    setLoading(true);
    try {
      const response = await updatePost(id, editableContent, editableTitle);

      if (response.status) {
        setShareStatus(true);
      } else {
        setShareStatus(false);
      }
    } catch (error) {
      console.error("Failed to update post: ", error);
      setShareStatus(false);
      setError(true);
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
                justifyContent: "end",
                alignItems: "center",
                gap: 1,
                marginBottom: 2,
                width: "20%",
              }}
            >
              {loading && <CircularProgress />}
              {error && <ErrorOutlineIcon fontSize="large" color="error" />}
              <Button
                variant="contained"
                color="primary"
                disabled={shareStatus}
                startIcon={<SaveAsIcon />}
                onClick={handleUpdatePost}
              >
                Kaydet
              </Button>
              {platformIcon}
            </Box>
          </Box>

          <CardMedia
            sx={{
              height: 300,
              width: 500,
              alignSelf: "center",
            }}
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
            <Typography variant="body2" sx={{ marginTop: 2, marginLeft: 1 }}>
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  style={{ marginRight: "5px", color: "#007bff" }}
                >
                  #{tag}
                </span>
              ))}
            </Typography>
            {shareStatus && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 1,
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
              </Box>
            )}
            <Typography
              fontSize="small"
              color="text.secondary"
              sx={{ textAlign: "end" }}
            >
              {formatDate(date)}
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ExpandedCard;
