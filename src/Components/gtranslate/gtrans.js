import { useEffect } from 'react';
import Head from 'next/head';

const GoogleTranslate = () => {
  useEffect(() => {
    const scriptId = 'google-translate-script';

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
          'google_translate_element'
        );
      };
    }

  }, []);

  return (
    <>
      <Head>
        <style>{`
          .goog-te-banner-frame.skiptranslate {
            display: none !important;
          }
          body {
            top: 0px !important;
          }
        `}</style>
      </Head>
      <div id="google_translate_element"></div>
    </>
  );
};

export default GoogleTranslate;
