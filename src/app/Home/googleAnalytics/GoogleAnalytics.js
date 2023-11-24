import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <div className="container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RTSEYBRWVZ" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-RTSEYBRWVZ');
        `}
        </Script>
      </div>
    </>
  );
};

export default GoogleAnalytics;
