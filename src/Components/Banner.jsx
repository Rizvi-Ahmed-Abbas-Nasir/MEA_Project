import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// import path from "path"
// import fs from "fs"



// export async function getStaticProps() {
//   const imagesDir = path.join(process.cwd(), 'public/images');
//   const files = fs.readdirSync(imagesDir);

//   // Filter out non-image files if needed (optional)
//   const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

//   // Create paths with leading slash
//   const imagePaths = imageFiles.map(file => `/images/${file}`);
//   console.log(imagePaths)

//   return {
//     props: {
//       imageList: imagePaths,
//     },
//   };
// }

const BannerComponent = () => {
  const imageList = [
    "/images/bg0.jpg",
    "/images/bg1.jpeg",   // Leading slash for public images
    "/images/bg2.jpeg",
    "/images/bg3.jpeg",
    "/images/bg4.jpeg",
    "/images/bg5.jpeg",
    "/images/bg6.jpg",
    "/images/bg7.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [imageList.length]);

  const slideVariants = {
    initial: { x: "100%", opacity: 0 },  // Start off-screen to the right
    animate: { x: "0%", opacity: 1 },     // Slide to center
    exit: { x: "-100%", opacity: 0 },     // Exit off-screen to the left
  };

  return (
    <motion.div
      className="w-full h-[100vh] flex justify-center relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}  
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} // Only animates once
      transition={{ duration: 1 }} // Smooth transition duration
    >
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            alt="banner-image"
            src={imageList[currentImageIndex]}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default BannerComponent;
