import {
  Box,
  Modal,
  Typography,
  CardMedia,
  IconButton,
  Fade,
  Backdrop,
  Button,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share"; // Paylaşım simgesi
import { ReactNode, useState } from "react";
import { addPostManuel } from "@/lib/utils";

// Fonksiyon tipi
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
}) => {
  const [shareStatus, setShareStatus] = useState<boolean>(isShared);

  const handleShare = async () => {
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
    }
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
            <Typography variant="h4" component="div" gutterBottom>
              {title}
            </Typography>

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
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {content}
          </Typography>
          {shareStatus && (
            <Box sx={{ marginTop: 2 }}>
              <Alert severity={shareStatus ? "success" : "error"}>
                {shareStatus}
              </Alert>
            </Box>
          )}
          {!shareStatus && <Box sx={{ marginTop: 2, height: "48px" }}></Box>}
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
              {new Date(date).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ExpandedCard;
