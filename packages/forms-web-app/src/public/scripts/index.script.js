(()=>{var e,n,t={544:e=>{e.exports={COOKIE_POLICY_KEY:"cookie_policy",CSS_CLASSES:{displayNone:"govuk-!-display-none"},DEFAULT_COOKIE_POLICY:{essential:!0,settings:!1,usage:!1,campaigns:!1},SELECTORS:{button:{cookieBanner:{consent:'button[name="cookie_banner"]',accepted:'button[name="cookie_banner_accepted"]',rejected:'button[name="cookie_banner_rejected"]'}},cookieBanner:{consent:"#cookie-banner-consent",accepted:"#cookie-banner-accepted",rejected:"#cookie-banner-rejected"}}}},268:(e,n,t)=>{var o=t(544),r=t(100),c=r.hideSingleDomElementBySelector,i=r.showSingleDomElementBySelector,a=function(e){return c(e,o.SELECTORS.cookieBanner.accepted)},s=function(e){var n=e.querySelector(o.SELECTORS.button.cookieBanner.accepted);n.addEventListener("click",(function t(){a(e),n.removeEventListener("click",t)}),!1)};e.exports={addCookieConsentAcceptedListener:s,hideConsentAcceptedBanner:a,showCookieConsentAcceptedBanner:function(e){i(e,o.SELECTORS.cookieBanner.accepted),s(e)}}},243:(e,n,t)=>{var o=t(544),r=t(100),c=r.hideSingleDomElementBySelector,i=r.showSingleDomElementBySelector,a=function(e){return c(e,o.SELECTORS.cookieBanner.rejected)},s=function(e){var n=e.querySelector(o.SELECTORS.button.cookieBanner.rejected);n.addEventListener("click",(function t(){a(e),n.removeEventListener("click",t)}),!1)};e.exports={addCookieConsentRejectedListener:s,hideConsentRejectedBanner:a,showCookieConsentRejectedBanner:function(e){i(e,o.SELECTORS.cookieBanner.rejected),s(e)}}},35:(e,n,t)=>{function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i=t(544),a=t(62),s=a.createCookie,l=a.eraseCookie,u=a.readCookie,d=t(100).hideSingleDomElementBySelector,C=t(268).showCookieConsentAcceptedBanner,p=t(243).showCookieConsentRejectedBanner,S=t(277).initialiseOptionalJavaScripts,f=function(e,n){l(e,i.COOKIE_POLICY_KEY),s(e,i.COOKIE_POLICY_KEY,JSON.stringify(n))},E=function(e){return d(e,i.SELECTORS.cookieBanner.consent)},O=function(e){var n=i.SELECTORS.button.cookieBanner.consent;return{allConsentButtons:e.querySelectorAll(n),acceptCookieConsentButton:e.querySelector("".concat(n,'[value="accept"]')),rejectCookieConsentButton:e.querySelector("".concat(n,'[value="reject"]'))}},v=function(e){return e.forEach((function(e){return e.classList.remove(i.CSS_CLASSES.displayNone)}))},g=function(e,n){n.addEventListener("click",(function t(){f(e,r(r({},i.DEFAULT_COOKIE_POLICY),{},{usage:!0})),E(e),n.removeEventListener("click",t),C(e),S(e)}),!1)},k=function(e,n){n.addEventListener("click",(function t(){f(e,i.DEFAULT_COOKIE_POLICY),E(e),n.removeEventListener("click",t),p(e)}),!1)};e.exports={addRejectCookieConsentListener:k,addAcceptCookieConsentListener:g,cookieConsentHandler:function(e){var n=O(e),t=n.allConsentButtons,o=n.acceptCookieConsentButton,r=n.rejectCookieConsentButton;o&&r&&(null===u(e,i.COOKIE_POLICY_KEY)?(g(e,o),k(e,r),v(t)):E(e))},displayConsentButtons:v,getConsentButtons:O,hideConsentBanner:E,setCookies:f}},100:(e,n,t)=>{var o=t(544);e.exports={showSingleDomElementBySelector:function(e,n){return e.querySelector(n).classList.remove(o.CSS_CLASSES.displayNone)},hideSingleDomElementBySelector:function(e,n){return e.querySelector(n).classList.add(o.CSS_CLASSES.displayNone)}}},62:e=>{var n=function(e,n,t){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:365,r="";if("number"==typeof o){var c=new Date;c.setTime(c.getTime()+24*o*60*60*1e3),r="; expires=".concat(c.toUTCString())}var i="";i="; secure",e.cookie="".concat(n,"=").concat(t).concat(r).concat(i,"; path=/")};e.exports={createCookie:n,readCookie:function(e,n){for(var t="".concat(n,"="),o=e.cookie.split(";"),r=0;r<o.length;r+=1){for(var c=o[r];" "===c.charAt(0);)c=c.substring(1,c.length);if(0===c.indexOf(t))return c.substring(t.length,c.length)}return null},eraseCookie:function(e,t){n(e,t,"",-1)}}},847:e=>{e.exports={initialiseGoogleAnalytics:function(e){var n=e.getElementById("gaId")?e.getElementById("gaId").textContent:null;function t(){dataLayer.push(arguments)}if(n){var o=e.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://www.googletagmanager.com/gtag/js?id=".concat(n);var r=e.getElementsByTagName("script")[0];r.parentNode.insertBefore(o,r),window.dataLayer=window.dataLayer||[],t("js",new Date),t("config",n)}}}},527:e=>{function n(e){window.dataLayer=window.dataLayer||[],"denied"!==e&&"granted"!==e||function(){dataLayer.push(arguments)}("consent","update",{analytics_storage:e})}e.exports={grantConsent:function(){n("granted")},denyConsent:function(){n("denied")}}},277:(e,n,t)=>{var o=t(62).readCookie,r=t(544),c=t(847).initialiseGoogleAnalytics;t(527);e.exports={initialiseOptionalJavaScripts:function(e){var n=o(e,r.COOKIE_POLICY_KEY);if(null!==n)try{var t=JSON.parse(n);if(!t||void 0===t.usage)return;if(!1===t.usage)return void console.log("Declined consent. Third party cookies are not enabled.");c(e)}catch(e){console.error("Unable to decode the value of cookie",e)}else console.log("Consent not yet given for optional JavaScripts.")}}}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var c=o[e]={exports:{}};return t[e](c,c.exports,r),c.exports}e=r(35).cookieConsentHandler,n=r(277).initialiseOptionalJavaScripts,e(document),n(document)})();