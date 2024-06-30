import { MouseEvent, useEffect, useRef, useState } from "react";

export default function Slider3D() {
  const [list, setList] = useState<string[]>([]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [initialRotation, setInitialRotation] = useState<number>(0);

  const startDragging = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setInitialRotation(rotation);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotation(initialRotation + deltaX / 2);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => stopDragging();
    const handleMouseMove = (e: any) => onDrag(e);

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  useEffect(() => {
    setList(["bg-green-500", "bg-slate-500", "bg-blue-500", "bg-yellow-500"]);
  }, []);
  return (
    <>
      <div
        className="relative w-[900px] h-64 flex justify-center items-center bg-black overflow-hidden"
        ref={sliderRef}
        onMouseDown={(e) => startDragging(e)}
      >
        <div
          className="relative w-full h-full flex items-center transition-transform duration-300 ease-in-out"
          style={{ transform: `perspective(1000px) rotateY(${rotation}deg)` }}
        >
          {list.map((item, index) => {
            console.log(item);

            return (
              <div
                key={index}
                className={`absolute h-52 w-96 flex items-center justify-center text-white text-xl font-bold ${item}`}
                style={{
                  transform: `rotateY(${
                    index * (360 / list.length)
                  }deg) translateZ(300px)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
