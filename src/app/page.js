import HomeScreen from "@/components/HomeScreen";
import Player from "@/components/Player/Player";
import PlaylistMainScreen from "@/components/PlaylistMainScreen";
import SlideBar from "@/components/SlideBar";
export default function Home() {
  return (
    <>
      <div className="flex overflow-hidden">
        {/* <SlideBar /> */}
        <HomeScreen className="flex-grow" />
      </div>
    </>
  );
}
