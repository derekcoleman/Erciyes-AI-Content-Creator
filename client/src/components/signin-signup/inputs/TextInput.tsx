import React from "react";
import { FormControl, OutlinedInput, Typography } from "@mui/material";

interface TextInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

const TextInput: React.FC<TextInputProps> = ({ text, setText, title }) => {
  return (
    <FormControl sx={{ width: "65%" }} variant="outlined">
      <Typography mt={1} mb={1} sx={{ fontWeight: "600" }}>
        {title}
      </Typography>
      <OutlinedInput
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="outlined-adornment-text"
        type="text"
        sx={{ backgroundColor: "white", height: "40px" }}
      />
      {title.length === 0 && (
        <Typography mb={1} sx={{ fontWeight: "400", color: "red" }}>
          Lütfen {title} giriniz.
        </Typography>
      )}
    </FormControl>
  );
};

export default TextInput;
