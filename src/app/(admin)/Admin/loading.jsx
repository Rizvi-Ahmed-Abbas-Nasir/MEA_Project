import Image from "next/image";
import NAV from '../Navbar';
export default  function loading(){
    return(
        <div className="flex  w-full xl:flex-row flex-col">
            <NAV />
           <div className="flex h-[100vh] flex-col w-full px-6 py-6 gap-6  bg-gray-100">
            <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-2 border-red-600 rounded-full loader"></div>
            </div>
            </div>
        </div>
    );
}