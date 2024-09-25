import Image from "next/image";
import NAV from '../Navbar';
export default  function loading(){
    return(
        <div className="flex w-full h-screen flex-row">
            <NAV />
           <div className=" w-full bg-gray-100 flex justify-center items-center">
            <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-2 border-red-600 rounded-full loader"></div>
            </div>
            </div>
        </div>
    );
}