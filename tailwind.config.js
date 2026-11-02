import plugin from "tailwindcss/plugin"
import typography from "@tailwindcss/typography"

export default {
  plugins: [
		plugin(function ({ addBase }) {
			addBase({
				html: { 
          // fontSize: ".9375vw", 
          fontFamily: "RedHatDisplay, sans-serif",
          lineHeight: "1.1", }
			})
		}),
		typography
	],

  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   safelist: [
     "lg:items-end",
     {
       pattern: /^(text-|bg-|w-|max-w-|order-)/
     }
   ],
 
   theme: {
     extend: {
       lineHeight: {},
       colors: {
          black: "#141414",
          white: "#FFFFFF",
          purple: "#441752",
       },

       fontFamily: {
        RedHatDisplay: ["RedHatDisplay"]
       },
 
       fontSize: {
         base: [
           "clamp(14px, 1rem, 22px)",
           {
             lineHeight: "1.2"
           }
         ],
         92: [
           "clamp(50px, 5.111rem, 150px)",
           {
             lineHeight: ".8",
             fontWeight: "400"
           }
         ],
         80: [
           "clamp(60px, 4.444rem, 95px)",
           {
             lineHeight: "1",
             fontWeight: "400"
           }
         ],
         76: [
           "clamp(60px, 4.222rem, 90px)",
           {
             lineHeight: "1",
             fontWeight: "400"
           }
         ],
         75: [
           "clamp(55px, 4.166rem, 90px)",
           {
             lineHeight: "1",
             fontWeight: "400"
           }
         ],
         72: [
           "clamp(60px, 3.944rem, 950px)",
           {
             lineHeight: ".9",
             fontWeight: "400"
           }
         ],
         60: [
           "clamp(50px, 3.23rem, 75px)",
           {
             lineHeight: ".9",
             fontWeight: "400"
           }
         ],
         54: [
           "clamp(44px, 3rem, 60px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         50: [
           "clamp(40px, 2.7777rem, 55px)",
           {
             lineHeight: ".9",
             fontWeight: "400"
           }
         ],
         48: [
           "clamp(40px, 2.666rem, 55px)",
           {
             lineHeight: "1.1",
             fontWeight: "400"
           }
         ],
         44: [
           "clamp(40px, 2.444rem, 55px)",
           {
             lineHeight: "1.1",
             fontWeight: "400"
           }
         ],
         40: [
           "clamp(20px, 2.22rem, 51px)",
           {
             lineHeight: "1.1",
             fontWeight: "400"
           }
         ],
         36: [
           "clamp(30px, 2rem, 36px)",
           {
             lineHeight: "1.1",
             fontWeight: "400"
           }
         ],
         32: [
           "clamp(28px, 1.777rem, 34px)",
           {
             lineHeight: "1",
             fontWeight: "400"
           }
         ],
         30: [
           "clamp(10px, 1.6666rem, 32px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         28: [
           "clamp(24px, 1.5555rem, 30px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         26: [
           "clamp(17px, 1.4444rem, 30px)",
           {
             lineHeight: "1.1",
             fontWeight: "400"
           }
         ],
         24: [
           "clamp(16px, 1.3333rem, 28px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         22: [
           "clamp(12px, 1.2222rem, 24px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         20: [
           "clamp(15px, 1.1111rem, 25px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         18: [
           "clamp(15px, 1rem, 20px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         16: [
           "clamp(16px, .888rem, 22px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         14: [
           "clamp(10px, .77rem, 20px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         12: [
           "clamp(10px, .66rem, 18px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         10: [
           "clamp(10px, .55rem, 16px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ],
         8: [
           "clamp(8px, .44rem, 14px)",
           {
             lineHeight: "1.25",
             fontWeight: "400"
           }
         ]
       },
 
       letterSpacing: {
         tight: "-.02em",
         tighter: "-.03em"
       },
 
       spacing: {
         18: "4.5rem",
         25: "6.25rem",
         26: "6.5rem",
         28: "7rem",
         30: "7.5rem",
         92: "23rem"
       },
 
       screens: {
         "max-sm": { min: "0px", max: "639px" },
         "max-lg": { min: "375px", max: "1023px" },
          xs: "375px",
       		sm: "600px",
       		md: "768px",
       		lg: "992px",
       		xl: "1024px",
       		"2xl": "1600px"
       }
     }
   }
 }
 