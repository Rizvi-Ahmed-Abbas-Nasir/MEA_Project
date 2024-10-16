"use client"; // Ensures the component runs on the client side


import Header from "../../Components/Header";
import Footer from "../../Components/Footer";



const PdfViewer = () => {
  return (
    <div>
        <Header />
    <div className="flex justify-start items-center w-full px-10 py-10">
      <div className="w-[40%] md:w-[30%] bg-white border rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
          <h3 className="text-base font-medium text-gray-700">PDF Preview</h3>
          <a
            href="/assets/pdf/ebookOne.pdf" // Direct link to the PDF in the public folder
            target="_blank"
            className="text-blue-500 hover:text-blue-700 focus:outline-none text-sm"
          >
            Download
          </a>
        </div>
        <embed 
          src="/assets/pdf/ebookOne.pdf" 
          type="application/pdf" 
          width="100%" 
          height="300px" 
          className="rounded-b-lg"
        />
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PdfViewer;
