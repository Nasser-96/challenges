import useWindowIsLoaded from "@/hooks/useIsWindowLoaded";
import { useEffect, useState } from "react";
import { SlTrash } from "react-icons/sl";

export interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function DeleteButton({ ...props }: DeleteButtonProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { isWindow } = useWindowIsLoaded();

  const onClick = () => {
    setIsClicked(true);
    setDisabled(true);
    setTimeout(() => {
      setIsAnimated(false);
      setIsClicked(false);
    }, 1000);

    setTimeout(() => {
      setIsAnimated(true);
      setDisabled(false);
    }, 1500);
  };

  return (
    <button
      {...props}
      className={`py-2 px-5 rounded bg-red-700 text-white ${props.className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isWindow && (
        <div className="flex gap-3 min-h-full w-full items-center">
          <div className="flex relative h-3 scale-150">
            <div
              className={`absolute duration-500 transition-all left-[1px] flex justify-center w-full ${
                isClicked ? "bottom-2.5 -rotate-45" : "bottom-2 -rotate-0"
              }`}
            >
              {/* Trash Header */}
              <div className="absolute flex justify-center bottom-0.5 !-left-[1px] w-0.5">
                <div className="w-px h-0.5 left-[-0px] absolute bottom-0 bg-white" />
                <div className="w-[6px] h-px bg-white absolute bottom-0.5 -left-[5px]" />
                <div className="w-px h-0.5 bg-white absolute bottom-0 -left-[5px]" />
              </div>
              <div className="absolute bg-white h-px w-[10px] left-[-8px] -top-0.5" />
            </div>
            <div
              className={`absolute flex h-3 bg-green-200 items-center bottom-0 duration-300 transition-all ${
                isClicked ? "-bottom-1 rotate-45" : "bottom-0 -rotate-0"
              }`}
            >
              {/* Trash Body */}
              <div
                className={`absolute w-[6px] h-0 border-l-[1px] delay-100 border-r-[1px] duration-500 transition-all -left-[5px] bottom-0 border-b-[0px] border-transparent border-t-white ${
                  isClicked ? "border-t-[5px]" : "border-t-[0px]"
                }`}
              />
              <div className="absolute bg-white h-[8px] bottom-0 w-px rotate-6" />
              <div className="absolute bg-white h-[8px] bottom-0 w-px -left-[5px] -rotate-6" />
              <div className="absolute bg-white h-px flex self-end w-[4px] left-[-4.5px]" />
            </div>
          </div>
          <div className="flex">
            {"Delete".split("").map((char, index) => {
              return (
                <div
                  style={{
                    transitionDelay: isAnimated ? index * 0.1 + "s" : "0s",
                  }}
                  className={`${
                    isAnimated ? "duration-300 transition-all" : ""
                  } ${
                    isClicked
                      ? "-translate-x-10 scale-0 rotate-45"
                      : "translate-x-0 scale-100 rotate-0"
                  }`}
                  key={index}
                >
                  <span
                    style={{
                      transitionDelay: isAnimated ? index * 0.1 + "s" : "0s",
                    }}
                    className={`duration-300 transition-all delay-200 ${
                      isClicked ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div
                      style={{
                        transitionDelay: isAnimated ? index * 0.1 + "s" : "0s",
                      }}
                      className={`${
                        isAnimated ? "duration-300 transition-all" : ""
                      } ${isClicked ? "-translate-y-3" : "translate-y-0"}`}
                    >
                      {char}
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </button>
  );
}
