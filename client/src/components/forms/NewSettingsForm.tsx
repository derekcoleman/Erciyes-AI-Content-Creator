"MBY sağolsun 🤲";
import { Box, Card, FormControlLabel, Typography } from "@mui/material";
import { addSettings } from "@/lib/utils";
import { SettingsInfo } from "@/lib/types";

interface NewSettingsFormProps {}

const NewSettingsForm: React.FC<NewSettingsFormProps> = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // if (isFormValid()) {
    //   try {
    //     const settingsInfo: SettingsInfo = await addSettings({
    //       //theme giib gelen imputlar gelecek
    //     });
    //     if (settingsInfo.status) {
    //       console.log(settingsInfo);
    //     } else {
    //       alert("Settings update failed: " + settingsInfo.message);
    //     }
    //   } catch (error) {
    //     alert("Settings update failed: " + error.message);
    //   }
    // }
  };

  // const isFormValid = () => {
  //   //verilen inpurlar valid mi
  //   return true;
  // };

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
        Bilmem Ne Ayarları
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}></Box>
    </Card>
  );
};

export default NewSettingsForm;
