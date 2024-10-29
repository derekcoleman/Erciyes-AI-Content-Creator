import HomeSkeleton from "@/components/skeleton/HomeSkeleton";
import MiniDrawer from "../components/drawer/MiniDrawer";
import { Grid } from "@mui/material";
import CustomCard from "@/components/card/CustomCard";
import { posts } from "@/lib/conts";

export default function HomePage() {
  const loading = false;

  return (
    <MiniDrawer>
      {loading ? (
        <HomeSkeleton />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={5} mb={2}>
            <CustomCard {...posts[0]} />
          </Grid>

          <Grid container spacing={2}>
            {posts.slice(1).map((post, index) => (
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CustomCard {...post} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </MiniDrawer>
  );
}
