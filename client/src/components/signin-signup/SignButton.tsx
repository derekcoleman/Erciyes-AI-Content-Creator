import { Button } from "@mui/material";
import { ReactNode } from "react";

interface SignButtonProps {
  title: string;
  variant: string;
  isFormValid?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  type?: string;
}

const SignButton: React.FC<SignButtonProps> = ({
  title,
  isFormValid = true,
  variant,
  icon,
  onClick,
  type = "button",
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      sx={
        variant === "outlined"
          ? {
              width: "65%",
              height: "40px",
              border: "solid #CFD6E4 1px",
              color: "black",
              textTransform: "none",
              fontWeight: "700",
            }
          : {
              width: "65%",
              height: "40px",
              textTransform: "none",
              fontWeight: "700",
            }
      }
      variant={variant}
      disabled={!isFormValid}
      startIcon={icon}
    >
      {title}
    </Button>
  );
};

export default SignButton;
