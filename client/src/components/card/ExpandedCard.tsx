import {
  Box,
  Modal,
  Typography,
  CardMedia,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { ReactNode } from "react";

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
}) => {
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
            {platformIcon}
          </Box>

          <CardMedia
            sx={{ height: 300, objectFit: "contain" }}
            image={postImage}
            title="Expanded Post Image"
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {content}
          </Typography>
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
