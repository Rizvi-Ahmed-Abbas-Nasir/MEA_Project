import React from 'react'
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

const page = () => {
  return (
    <>
    <Header />
    <main>
      <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl p-3 text-center">RECOGNITION AND AFFILIATION WITH UNI GLOBAL</h1>
        <p className="text-sm md:text-base lg:text-lg p-3">About Us / Recognition & Affiliation with Uni Global</p>
      </section>

      <section className='px-5 sm:px-8 md:px-10 py-10'>
        <div className='flex flex-col md:flex-row md:justify-between gap-7 py-5'>
          <div className='w-full md:w-[50%]'>
            <div className='first-letter:text-4xl md:first-letter:text-5xl lg:first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-3 first-letter:float-start text-justify'>
              The Mumbai Engineers Union (MEU) is an extremely important engineering association in Maharashtra, which effectively supports engineers in resolving their issues. Since its establishment, the union has consistently advocated for various issues and provided guidance to engineers to achieve excellence.
              <br />
              <br />
              <h2 className="mb-2 text-base md:text-lg font-semibold text-gray-900">Key Initiatives:</h2>
              <ul className="space-y-1 list-inside">
                <li className="flex items-center pb-2">
                  <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Promotions and Rights: MEU actively fights for promotions for engineers and ensures departments adhere to promotion regulations.
                </li>
                <li className="flex items-center pb-2">
                  <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Social Security and Rights: MEU ensures social security for engineers by designing social security schemes and resolving their issues.
                </li>
                <li className="flex items-center pb-2">
                  <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Protection of Workers&apos; Rights: MEU protects engineers&apos; rights, supports them during tough conditions, and helps secure maximum compensation for them.
                </li>
                <li className="flex items-center pb-2">
                  <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Technical Solutions and Editorial Support: MEU assists in technical problem-solving and editorial support.
                </li>
                <li className="flex items-center pb-2">
                  <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Excellence and Research: MEU guides engineers in excellence and research.
                </li>
              </ul>
            </div>
          </div>

          <div className='w-full md:w-[50%]'>
            <img className='w-full h-full object-cover' src="assets/images/Rbg1.webp" alt="" />
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}

export default page
