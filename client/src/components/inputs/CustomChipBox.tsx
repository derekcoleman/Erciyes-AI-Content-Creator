import { Box, Chip, FormControl, TextField } from "@mui/material";
import { useState } from "react";

interface CustomChipBoxProps {
  onChipsChange: (chips: string[]) => void;
  title: string;
  isWanted: boolean;
}

const CustomChipBox: React.FC<CustomChipBoxProps> = ({
  onChipsChange,
  title,
  isWanted,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const trimmedInput = inputValue.trim();

      if (!chips.includes(trimmedInput)) {
        const newChips = [...chips, trimmedInput];
        setChips(newChips);
        setInputValue("");
        onChipsChange(newChips);
      } else {
        setInputValue("");
      }
      event.preventDefault();
    }
  };

  const handleDelete = (chipToDelete: string) => {
    const newChips = chips.filter((chip) => chip !== chipToDelete);
    setChips(newChips);
    onChipsChange(newChips);
  };

  return (
    <Box
      sx={{
        width: "30%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormControl fullWidth margin="normal" sx={{ width: "100%" }}>
        <TextField
          onChange={handleInputChange}
          id="outlined-basic"
          placeholder={title}
          variant="outlined"
          value={inputValue}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          width: "100%",
        }}
      >
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleDelete(chip)}
            variant={isWanted ? "outlined" : "filled"}
            sx={{
              marginBottom: "8px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomChipBox;
