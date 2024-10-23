"use client"

import Image from "next/image";
import { useEffect,useState,useRef  } from "react";
import { IoCall } from "react-icons/io5";
import IMGs from "../Assets/IMGs/man.png"
import { Nunito } from 'next/font/google'
import { FaRegBuilding } from "react-icons/fa6";
import { FaCube } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaLandmark } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaLandmarkDome } from "react-icons/fa6";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import OnScrollAnimation from "../Components/OnScrollAnimmation";
import Link from "next/link";
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Banner from "../Components/Banner";
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
const nunito = Nunito
    ({
        subsets: ['latin'],
        weight: ['700']

    })
export default function Landing() {
    const [events, setEvents] = useState([]);
    const elementRef = useRef(null);

    useGSAP(
        () => {
            
            // gsap code here...
            gsap.from('.textup', { 
                y: 25,
                opacity:0,
                duration:1,
                stagger:1,
                scrollTrigger: {
                    trigger: '.newone',
                    start: 'top bottom',
                    end: 'center center',
                    scrub: true,
                  }
             }); 
             gsap.from('.busanimation',{
                x:400,
                opacity:0,
                duration:1.5,
                scrollTrigger: {
                    trigger: '.busanimation',
                    start: '50% bottom',
                    end: 'center center',
                  }
             })
             gsap.from('.slide',{
                x:40,
                opacity:0,
                duration:1.5,
                scrollTrigger: {
                    trigger: '.slide',
                    start: '50% bottom',
                    end: 'center center',
                    scrub:true,
                  }
             })
             gsap.from('.slide2',{
                x:40,
                opacity:0,
                duration:1.5,
                stagger:2,
                scrollTrigger: {
                    trigger: '.slide2box',
                    start: 'top bottom',
                    end: 'center center',
                    scrub:true,
                  }
             })
             gsap.from('.nameop',{
                
                opacity:0.2,
                duration:1.5,
                scrollTrigger: {
                    trigger: '.nameop',
                    start: '50% bottom',
                    end: 'center center',
                    scrub:true,
                  }
             })// <-- automatically reverted
        },
        { scope: elementRef }
    );
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/event`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch images.");
        }
        const result = await response.json();
        setEvents(result);
      } catch (error) {
        console.log(error);
      }
    };
    //On Scroll Animation Function
    useEffect(() => {
        fetchImages();
       
    }, []);
    console.log(typeof document);
    if (typeof document !== 'undefined') {
    //   //  will run in client's browser only
    //     var hiddenElements1 = document.querySelectorAll(".hidden3");
    //     var hiddenElements = document.querySelectorAll(".hidden2");
    //     var hiddenElement2 = document.querySelectorAll(".hidden1");
    //     var hiddenElement3 = document.querySelectorAll(".hidden4");

    //     //   var hiddenElement2 = document.querySelectorAll(".hidden3");
    //     // console.log(hiddenElements);
    //     OnScrollAnimation(hiddenElements1);
    //     OnScrollAnimation(hiddenElements)
    //     OnScrollAnimation(hiddenElement2)
    //     OnScrollAnimation(hiddenElement3)

    //        OnScrollAnimation(hiddenElement2)
    }
    return (
        <div ref={elementRef}>
            <Header />
        <div className=" w-[100%] bg-white flex gap-20 flex-col overflow-hidden">
            <div className=" w-full h-[100vh] flex justify-center ">
                {/* <Image
                alt="bg-image"
                width={10000}
                height={10000}
                    src="/assets/images/flip_bg.png"
                    className=" w-[100%] h-[100%] object-right object-cover"
                /> */}
                <Banner />
            </div>
            <div className="  w-[100%] newone  bg-white  flex justify-center">
                <div className="w-[100%] h-[70vh] sm:h-[25vh] md:h-[65vh] bg-white mt-[-10rem] z-10 flex  justify-around flex-wrap xl:h-[25vh] gap-5 xl:flex-nowrap shadow-xl xl:w-[90%] text-center    ">
                    <div className="textup flex justify-center  items-center px-10 py-5  text-center gap-2">
                        <h1 className=" text-[2.5rem] text-[#c72626] xl:text-[3rem] font-bold ">68</h1><h3 className="text-[0.7rem] w-14 xl:text-[0.8rem]">YEAR&apos;S FOUNDATION</h3>
                    </div>
                    <div className=" textup flex justify-center items-center px-10 py-5  text-center gap-2">
                        <h1 className="text-[2.5rem] text-[#c72626] xl:text-[3rem] font-bold ">1500+</h1><h3 className="text-[0.7rem] w-14 xl:text-[0.8rem]">TOTAL MEMBERS</h3>
                    </div>
                    <div className=" textup flex justify-center items-center px-10 py-5  text-center gap-2">
                        <h1 className="text-[2.5rem] text-[#c72626] xl:text-[3rem] font-bold ">25</h1><h3 className="text-[0.7rem] w-14 xl:text-[0.8rem]">Total SEMINARS</h3>
                    </div>
                    <div className="textup flex justify-center px-10 py-5 items-center text-center gap-2">
                        <h1 className="text-[2.5rem] text-[#c72626] xl:text-[3rem] font-bold ">525</h1><h3 className="text-[0.7rem] w-14 xl:text-[0.8rem]">SUCCESS PROGRAM</h3>
                    </div>
                </div>

            </div>
            <div className=" w-full bg-white flex justify-center flex-col items-center gap-10 ">
                <div className="busanimation w-[90%] h-[inherte] text-black flex items-center xl:justify-around xl:items-start gap-20 md:gap-10 xl:gap-5 flex-col xl:flex-row">
                    <div className=" w-[100%] xl:w-[35%] flex  justify-center flex-col xl:block  ">
                        <h1 className={`${nunito.className} text-[2rem]  font-bold `}>WELCOME TO MUNICIPAL ENGINEERS ASSOCIATION</h1>
                        <div className="w-[87%]">
                            <h5 className="mt-5 ">The struggles undertaken by the Municipal Engineers Association have yielded numerous results. For instance,
                                promotion policies have been established, increases in salary, allowances, and service facilities have been achieved, and a decision was made to retain positions for degree-holding engineers.</h5>
                        </div>
                        <Link  href={'background-of-mea'}>
                            <button className=" py-4 px-4 rounded-md mt-5 bg-[#c72626]  text-white">Learn More</button>
                        </Link>
                    </div>
                    <div className="w-[100%] slide xl:w-[30%] md:h-[80] xl:h-[50vh] ">
                        <Image src={"/assets/images/home.png"}
                        alt="heroimage"
                            className="w-[100%] h-[100%] xl:h-[100%] object-fit  "
                            width={500}
                            height={500}

                        />
                    </div>
                    {/* <div className="w-[100%]  xl:w-[30%] md:h-[80%] xl:h-[50vh] hidden3 ">
                        <Image src={"/assets/images/home.png"}
                        alt="hero image"
                            className="w-[100%] h-[100%] xl:h-[100%] object-fit  "
                            width={500}
                            height={500}
                        />
                    </div> */}
                </div>
                <div className="w-[90%] h-[15vh] bg-[#c72626] flex justify-center items-center">
                    <h1 className=" text-[1.2rem] xl:text-[2rem] text-white ">Municipal Engineer Association</h1>
                </div>
            </div>
            <div className="w-full h-[inherte] flex justify-center  ">
                <div className="slide2box w-[100%] px-[15px] md:w-full xl:w-[90%] h-[inherte] flex justify-center items-center  gap-10 flex-wrap md:gap-10 xl:gap-10 ">
                    <div className=" slide2 h-[30vh] md:my-7  md:h-[45vh] xl:h-[40vh] w-[20rem] flex-col  flex justify-start">
                        <div className=" flex ">
                            <div className=" hover:animate-pulse hover:shadow-xl h-[10vh] duration-300 ease-in-out ">
                                <FaLandmarkDome style={{ color: "#c72626", fontSize: '6rem', background: "white", padding: "1.2rem" }} />
                            </div>
                            <div className="flex h-[12vh]  py-10 items-center">
                                <h3 className="text-[1.2rem] ml-2">Background Of Municipal Engineer Association</h3>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-justify"> It is an established fact that some engineers who run businesses under the name of Brihanmumbai Engineers Union become active in December by showing...</p>
                        </div>

                    </div>
                    <div className=" slide2 h-[30vh] md:my-7  md:h-[45vh] xl:h-[40vh] w-[20rem] flex-col  flex justify-start">
                        <div className=" flex ">
                            <div className=" hover:animate-pulse hover:shadow-xl h-[10vh] uration-300 ease-in-out ">
                                <FaRegBuilding style={{ color: "#c72626", fontSize: '6rem', background: "white", padding: "1.2rem" }} />
                            </div>
                            <div className="flex h-[12vh]  py-10 items-center">
                                <h3 className="text-[1.2rem] ml-2">Objective of  Municipal Engineer Association</h3>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-justify">Our Freedom movement gathered momentum in the early thirties and brought about a new awakening amongst the Freedom seeking inteligentsia...</p>
                        </div>

                    </div>
                    <div className="slide2 h-[30vh] md:my-7  md:h-[45vh] xl:h-[40vh] w-[20rem] flex-col  flex justify-start">
                        <div className=" flex ">
                            <div className=" hover:animate-pulse hover:shadow-xl h-[10vh] uration-300 ease-in-out ">
                                <FaBook style={{ color: "#c72626", fontSize: '6rem', background: "white", padding: "1.2rem" }} />
                            </div>
                            <div className="flex h-[12vh]  py-10 items-center">
                                <h3 className="text-[1.2rem] ml-2"> Recognition and Affiliation </h3>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-justify">Social Security and Rights: MEU ensures social security for engineers by designing social security schemes and resolving...</p>
                        </div>

                    </div>
                    <div className=" slide2 h-[30vh] md:my-7   md:h-[45vh] xl:h-[40vh] w-[20rem] flex-col  flex justify-start">
                        <div className=" flex ">
                            <div className="hover:animate-pulse hover:shadow-xl  h-[10vh] uration-300 ease-in-out ">
                                <FaPerson style={{ color: "#c72626", fontSize: '6rem', background: "white", padding: "1.2rem" }} />
                            </div>
                            <div className="flex h-[12vh]  py-10 items-center">
                                <h3 className="text-[1.2rem] ml-2">Contributing in Science and Technology</h3>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-justify">Dispute Resolution: After attacks from municipal councilors, the organization provided support and pressured the administration to take...</p>
                        </div>

                    </div>
                    <div className="slide2 h-[30vh] md:my-7  md:h-[45vh] xl:h-[40vh] w-[20rem] flex-col  flex justify-start">
                        <div className=" flex ">
                            <div className=" hover:animate-pulse hover:shadow-xl h-[10vh] uration-300 ease-in-out ">
                                <FaLandmark style={{ color: "#c72626", fontSize: '6rem', background: "white", padding: "1.2rem" }} />
                            </div>
                            <div className="flex h-[12vh]  py-10 items-center">
                                <h3 className="text-[1.2rem] ml-2">Future Of Municipal Engineer Association</h3>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-justify">Our Freedom movement gathered momentum in the early thirties and brought about a new awakening amongst the Freedom seeking inteligentsia...</p>
                        </div>

                    </div>
                    <div className="slide2 h-[30vh] md:my-7  md:h-[45vh] xl:h-[40vh] w-[20rem] flex-col  flex justify-start">
                        <div className=" flex ">
                            <div className=" hover:animate-pulse hover:shadow-xl h-[10vh] uration-300 ease-in-out ">
                                <FaCube style={{ color: "#c72626", fontSize: '6rem', background: "white", padding: "1.2rem" }} />
                            </div>
                            <div className="flex h-[12vh]  py-10 items-center">
                                <h3 className="text-[1.2rem] ml-2">Participation and Appreciation</h3>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="text-justify">Our Freedom movement gathered momentum in the early thirties and brought about a new awakening amongst the Freedom seeking inteligentsia...</p>
                        </div>

                    </div>

                </div>
            </div>
            <div className="  w-full h-[inherte]  flex justify-start items-center flex-col gap-5">

                <div className="w-[90%] h-[15vh] bg-[#c72626] flex justify-center items-center">
                    <h1 className="text-[1.2rem] xl:text-[2rem] text-white ">Distinguished Honorary Fellows</h1>

                </div>
                <div className="mt-10 h-[10vh] w-full flex items-center flex-col">
                    <h2 className="text-[1rem] px-5 xl:text-[1.3rem]">68 years of tradition of faith!! An organization that protects life!</h2>
                </div>
                <div className="flex px-5 justify-center gap-7 md:gap-20">
                    {/* <div className=" w-[80%]   h-[inherte]  md:w-full xl:w-full flex justify-center gap-10 items-center xl:justify-around md:flex-col xl:flex-row">
                        <div className="flex text-[0.8rem] xl:text-[1rem] gap-2 flex-row justify-center flex-wrap xl:flex-nowrap xl:flex-col hidden2   list-disc opacity-[60%]" >
                            <li className="font-bold text-[1.2rem]">Sharad Rao</li>

                            <li>Adv. Mahabal Shetty - President /General Secretary</li>
                            <li>Engr. Vijay Pachpande - Vice Present</li>

                            <li>Engr. Ramesh Malviya - Vice President</li>

                            <li>Engr. Ramesh Kurhade - Secretary</li>
                            <li> Engr. Ramesh Kurhade - Secretary</li>
                            <li>Engr. T.V. Shah - Founder Member</li>

                            <li>Engr. Jeevan Patil - Vice presidet</li>

                            <li>Engr. Rajendra Joshi - Vice resident</li>

                            <li>Engr. Satish Kumar Vani Vice - President</li>
                            <li>Engr. Jagannath Gavane - Secretary</li>

                            <li>Engr. Navnath Ghadge- Executive Chairman</li>

                            <li>
                                Engr. Vishal Kokate - Secretary</li>

                            <li>Engr. Yashpal Hungergekar - Secretary</li>

                            <li>Engr. Rajendra Joshi - Vice resident</li>

                            <li>
                                Engr. Rajendra Joshi - Vice resident</li>


                        </div>
                        <div className="flex text-[0.8rem] xl:text-[1rem] gap-2 flex-row  xl:flex-nowrap xl:flex-col hidden3  list-disc opacity-[60%] " >
                            <li>Engr. Rajendra Joshi - Vice resident</li>
                            <li>Engr. Vishal Kokate - Secretary</li>
                            <li>Engr. Vishal Kokate - Secretary</li>
                            <li>Engr. Navnath Ghadge- Executive Chairman</li>

                            <li>
                                Engr. Vishal Kokate - Secretary</li>
                            <li>Engr. Yashpal Hungergekar - Secretary</li>

                            <li>Engr. Rajendra Joshi - Vice resident</li>

                            <li>
                                Engr. Rajendra Joshi - Vice resident</li>

                            <li>Engr. Navnath Ghadge- Executive Chairman</li>


                        </div>
                    </div> */}
                    <div className="nameop w-[50%]">
                        <ul className="max-w-md space-y-1  list-disc list-inside ">
                            <li className="font-bold">Sharad Rao</li>
                            <li>Adv. Mahabal Shetty - President / General Secretary</li>
                            <li>Engr. Vijay Pachpande - Vice President</li>
                            <li>Engr. Ramesh Malviya - Vice President</li>
                            <li>Engr. Jeevan Patil - Vice President</li>
                            <li>Engr. Rajendra Joshi - Vice President</li>
                            <li>Engr. Satish Kumar Vani - Vice President</li>
                            <li>Engr. T.V. Shah - Founder Member</li>
                            <li>Engr. Ramesh Kurhade - Secretary</li>

                        </ul>
                    </div>

                    <div className="nameop w-[50%]">
                        <ul className="max-w-md space-y-1  list-disc list-inside">
                            <li>Engr. Navnath Ghadge - Executive Chairman</li>
                            <li>Engr. Rajendra Joshi - Vice President</li>
                            <li>Engr. Vishal Kokate - Secretary</li>
                            <li>Engr. Yashpal Hungergekar - Secretary</li>
                            <li>Engr. Jagannath Gavane - Secretary</li>                          
                        </ul>
                    </div>

                </div>

            </div>
            <div className="w-full min-h-screen  flex flex-col items-center">
                <div className="w-[90%] h-[15vh] bg-[#c72626]  items-center justify-center flex">
                    <h1 className=" text-[1.3rem] md:text-[1.5rem] xl:text-[2.5rem] text-white  ">Municipal Engineer Association</h1>
                </div>
                <section className="w-full flex flex-col  items-center flex-grow">
          <div className="w-[90%] flex flex-col">
            <div className="w-[90%] mt-10">
              <h1 className="text-[2.5rem]">Events</h1>
            </div>
            <div className="w-full min-h-fit flex  flex-wrap m-0 md:m-10 gap-10">
              {
              events.map((event) => (
                <div
                  key={event.eventId}
                  className="relative w-full max-w-sm overflow-hidden shadow-lg cursor-pointer group "
                >
                  <Image
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={300}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <div className="text-center p-4">
                      <p className="text-sm text-black mb-2">{event.date}</p>
                      <h2 className="text-xl font-bold text-black">
                        {event.title}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

            </div>
        </div>
        <Footer />
        </div>
    );

};
