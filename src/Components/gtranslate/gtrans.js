import { useEffect } from 'react';
import Head from 'next/head';

const GoogleTranslate = () => {
  useEffect(() => {
    const scriptId = 'google-translate-script';
    const elementId = 'google_translate_element';

    // Function to initialize Google Translate
    const initializeGoogleTranslate = () => {
      // Use setTimeout to give some time for the google object to be ready
      setTimeout(() => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,mr',
              layout: window.google.translate.TranslateElement.InlineLayout 
                      ? window.google.translate.TranslateElement.InlineLayout.HORIZONTAL 
                      : null,
            },
            elementId
          );
          
          // Automatically change the language to Marathi (mr)
          autoTranslateToMarathi();
        } else {
          console.error('Google Translate not loaded yet.');
        }
      }, 1000); // Wait 1 second before trying to access google.translate
    };

    const autoTranslateToMarathi = () => {
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        selectElement.value = 'mr'; // Set the language to Marathi (mr)
        selectElement.dispatchEvent(new Event('change')); // Trigger the change event
      }
    };

    // Check if the script is already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // Initialize Google Translate Element
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,mr',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
          },
          elementId
        );
        
        // Automatically change the language to Marathi after initialization
        autoTranslateToMarathi();
      };
    }

    // Hide Google Translate top banner and logo
    const hideGoogleTranslateElements = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Hides the Google Translate iframe banner at the top of the page */
        
        /* Prevents the page content from shifting down */
        body {
          top: 0px !important;
        }
        /* Hides the Google logo and text in the dropdown widget */
        
        .goog-te-gadget {
          font-size: 0px;
        }
      `;
      document.head.appendChild(style);
    };

    hideGoogleTranslateElements();

    // Observe when the Google Translate toolbar is added to the DOM
    const observer = new MutationObserver(() => {
      const closeButton = document.querySelector('.skiptranslate .goog-te-gadget-simple .close-button');
      if (closeButton) {
        closeButton.click(); // Click the close button
        observer.disconnect(); // Stop observing once the button is found and clicked
      }
    });

    // Start observing the body for child additions
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect(); // Clean up the observer on component unmount
    };
  }, []);

  return (
    <>
      <Head>
        <style>{`
          body {
            top: 0px !important;
          }
        `}</style>
      </Head>
     
      <div id="google_translate_element" className='mb-[-10%]'></div>
      <div className='h-[30px] w-[200px] ml-[-50%] mb-[-15%] bg-white '>
        <div className='h-[100%] w-[100px] mt-[-10%] ml-[100px] bg-white'></div> </div>
    </>
  );
};

export default GoogleTranslate;
