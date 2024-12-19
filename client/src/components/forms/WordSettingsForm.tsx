import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { addWordSettings } from "@/lib/utils";
import { WordSettingsInfo } from "@/lib/types";
import { useState } from "react";
import CustomChipBox from "../inputs/CustomChipBox";

interface WordSettingsFormProps {
  customInteractionData: string[];
}

const WordSettingsForm: React.FC<WordSettingsFormProps> = ({
  customInteractionData = [""],
}) => {
  const [wantedChips, setWantedChips] = useState<string[]>([]);
  const [bannedChips, setBannedChips] = useState<string[]>([]);
  const [customInteraction, setCustomInteraction] = useState(
    customInteractionData
  );

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
        const settingsInfo: WordSettingsInfo = await addWordSettings({
          wantedWords: wantedChips,
          bannedWords: bannedChips,
        });
        if (settingsInfo.status) {
          console.log("Settings successfully updated:", settingsInfo);
        } else {
          alert("Settings update failed: " + settingsInfo.message);
        }
      } catch (error) {
        alert("Settings update failed: " + error.message);
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
          onChipsChange={handleBannedChipsChange}
          title="Yasaklı Kelime"
          isWanted={true}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <CustomChipBox
          onChipsChange={handleWantedChipsChange}
          title="İstenilen Kelime"
          isWanted={false}
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
