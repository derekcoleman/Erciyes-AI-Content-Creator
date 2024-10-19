import { Button } from "@mui/material";
import { ReactNode } from "react";

interface SignButtonProps {
  title: string;
  variant: string;
  isFormValid?: boolean;
  icon?: ReactNode;
}

const SignButton: React.FC<SignButtonProps> = ({
  title,
  isFormValid = true,
  variant,
  icon,
}) => {
  return (
    <Button
      sx={{ width: "65%", height: "50px" }}
      variant={variant}
      disabled={!isFormValid}
      startIcon={icon}
    >
      {title}
    </Button>
  );
};

export default SignButton;
