import { Box, Divider, Typography } from "@mui/material";

interface TextButtonProps {
  title: string;
  isFormActive: boolean;
  onClick: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  title,
  isFormActive = false,
  onClick,
}) => {
  return (
    <Box onClick={onClick}>
      <Typography
        variant="h6"
        sx={
          isFormActive
            ? {
                cursor: "pointer",
                fontWeight: "700",
              }
            : { cursor: "pointer", fontWeight: "700", color: "gray" }
        }
      >
        {title}
      </Typography>
      {isFormActive && (
        <Box
          mt={1}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              border: "solid 2px #1976d2",
              width: "60%",
              margin: "0 auto",
              color: "#1976d2",
              borderRadius: "12px",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default TextButton;
