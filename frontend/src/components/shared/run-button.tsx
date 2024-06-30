import { useRef, useState } from "react";
import PlayIcon from "../icons/play-icons";
import Loader from "./loader";

export default function RunButton() {
  const runWord = "تشغيل";
  const [fill, setFill] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const [leftPlayIcon, setLeftPlayIcon] = useState<string>("15%");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    setIsLoading(true);
    setIsClicked(true);
    setLeftPlayIcon("calc(100% - 25px)");
    setFill(100);

    setTimeout(() => {
      setIsAnimated(false);
      setIsLoader(true);
      setLeftPlayIcon("15%");
    }, 800);

    setTimeout(() => {
      setFill(0);
      setIsClicked(false);
      setIsLoader(false);
    }, 3000);

    setTimeout(() => {
      setIsAnimated(true);
      setIsLoading(false);
    }, 3200);
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      ref={buttonRef}
      className="bg-emerald-500 !py-1 !px-5 rounded text-white w-fit relative flex items-center justify-center"
    >
      <div
        className={`absolute top-2 transition-all duration-300 ${
          isLoader ? "opacity-100" : "opacity-0"
        }`}
      >
        <Loader />
      </div>
      <div dir="rtl" className="flex tracking-tighter gap-0 relative ml-5">
        {runWord.split("").map((char, index) => {
          return (
            <p
              className={`tracking-[-1px] transition-all duration-200 ${
                isClicked ? "opacity-0" : "opacity-100"
              }`}
              style={{
                transitionDelay: isAnimated
                  ? (runWord.length - index) * 0.05 + "s"
                  : 0 + "s",
              }}
              key={index}
            >
              {(index !== 0 ? "ـ" : "") +
                char +
                (index !== runWord.length - 1 ? "ـ" : "")}
            </p>
          );
        })}
      </div>
      <div
        className={`absolute right-0 w-fit transition-all duration-700`}
        style={{ left: leftPlayIcon }}
      >
        <div
          className={`transition-all duration-300 ${
            isLoader ? "opacity-0" : "opacity-100"
          }`}
        >
          <PlayIcon fillPercent={fill} />
        </div>
      </div>
    </button>
  );
}
