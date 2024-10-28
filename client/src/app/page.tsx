import HomeSkeleton from "@/components/skeleton/HomeSkeleton";
import MiniDrawer from "../components/drawer/MiniDrawer";

export default function HomePage() {
  return (
    <MiniDrawer>
      <HomeSkeleton />
    </MiniDrawer>
  );
}
