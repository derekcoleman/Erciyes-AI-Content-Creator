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
import { PieChart } from "@mui/x-charts";

interface PerformanceSumCardProps {
  performacesumDatas: { count: number; title: string }[];
}

const PerformanceSumCard: React.FC<PerformanceSumCardProps> = ({
  performacesumDatas,
}) => {
  const data = [
    {
      id: 0,
      value: performacesumDatas[0].count,
      label: performacesumDatas[0].title,
    },
    {
      id: 1,
      value: performacesumDatas[1].count,
      label: performacesumDatas[1].title,
    },
    {
      id: 2,
      value: performacesumDatas[2].count,
      label: performacesumDatas[2].title,
    },
    {
      id: 3,
      value: performacesumDatas[3].count,
      label: performacesumDatas[3].title,
    },
  ];

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
          <Box sx={{ width: "25%" }}>
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
          </Box>
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
