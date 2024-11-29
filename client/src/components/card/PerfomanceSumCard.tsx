import { abbreviateNumber } from "@/lib/utils";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";

interface PerformanceSumCardProps {
  performacesumDatas: { count: number; title: string }[];
}

const PerformanceSumCard: React.FC<PerformanceSumCardProps> = ({
  performacesumDatas,
}) => {
  return (
    <Card sx={{ margin: 2, width: "96.5%" }}>
      <CardHeader
        sx={{ margin: 2 }}
        title={"PERFORMANCE SUMMARY"}
        subheader={`View your all performance metrics.`}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {performacesumDatas.map((data) => (
            <Box
              key={data.title}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              <Typography
                sx={{
                  margin: 0.5,
                  fontSize: "24px",
                }}
              >
                {data.title}
              </Typography>
              <Divider sx={{ width: "100%" }} />
              <Tooltip
                title={data.count}
                enterDelay={500}
                leaveDelay={200}
                arrow
              >
                <Typography
                  sx={{
                    margin: 1,
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  {abbreviateNumber(data.count)}
                </Typography>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceSumCard;
