import { PiCirclesThreeLight } from "react-icons/pi";

function Loading_Screen() {
    return (
        <div className="absolute z-0 flex justify-center items-center w-[100vw] h-[100vh] bg-white/50">
            <PiCirclesThreeLight className="absolute z-50 animate-spin text-6xl text-red-500" />
        </div>
    );
}


export default Loading_Screen;