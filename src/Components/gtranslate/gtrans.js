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

    // Cleanup function
    return () => {
      const translateElement = document.getElementById(elementId);
      if (translateElement) {
        translateElement.innerHTML = ''; // Clear translation UI
      }
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
      
    </>
  );
};

export default GoogleTranslate;
