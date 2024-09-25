import Image from "next/image";
import Header from "../../../Components/Header"
import Footer from "../../../Components/Footer"

export default  function loading(){
    return(
        <div>
            <Header />
           <div className="h-screen bg-white">
            <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-2 border-red-600 rounded-full loader"></div>
            </div>
            </div>
            <Footer />
        </div>
    );
}