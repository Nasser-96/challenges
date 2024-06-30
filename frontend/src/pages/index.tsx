import DeleteButton from "@/components/shared/delete-button";
import RunButton from "@/components/shared/run-button";
import Slider3D from "@/components/shared/slider-3d";

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-2 items-center justify-center">
      <DeleteButton />
      <RunButton />
      <Slider3D />
    </div>
  );
}
