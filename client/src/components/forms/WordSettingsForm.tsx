import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { WordSettingsInfo } from "@/lib/types";
import { useState } from "react";
import CustomChipBox from "../inputs/CustomChipBox";

interface WordSettingsFormProps {
  bannedWords: string[];
  wantedWords: string[];

  onFormSubmit?: (data: WordSettingsInfo) => void;
}

const WordSettingsForm: React.FC<WordSettingsFormProps> = ({
  bannedWords,
  wantedWords,
  onFormSubmit,
}) => {
  const [wantedChips, setWantedChips] = useState<string[]>(wantedWords);
  const [bannedChips, setBannedChips] = useState<string[]>(bannedWords);

  const handleWantedChipsChange = (newChips: string[]) => {
    setWantedChips(newChips);
  };

  const handleBannedChipsChange = (newChips: string[]) => {
    setBannedChips(newChips);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      try {
        const settingsInfo: WordSettingsInfo = {
          wantedWords: wantedChips,
          bannedWords: bannedChips,
        };
        onFormSubmit(settingsInfo);
      } catch (error) {
        console.error("Settings update failed: ", error);
      }
    }
  };

  const isFormValid = () => {
    return wantedChips.length > 0 || bannedChips.length > 0;
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{
        paddingBottom: 6,
        paddingTop: 2,
        margin: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Kelime Ayarları
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <CustomChipBox
          onChipsChange={handleWantedChipsChange}
          title="İstenilen Kelime"
          isWanted={true}
          chipData={wantedChips}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <CustomChipBox
          onChipsChange={handleBannedChipsChange}
          title="Yasaklı Kelime"
          isWanted={false}
          chipData={bannedChips}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "10%",
            height: "56px",
            marginTop: "14px",
          }}
          disabled={!isFormValid()}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default WordSettingsForm;
