import { Settings, CropRotate, ViewInAr, PieChart, Code, BarChart, CloudOutlined, FavoriteBorder, Public, PersonOutlined, AddLocationAltOutlined, PhoneIphone, EmailOutlined, Facebook, Twitter, Instagram, YouTube, Telegram, Email } from "@mui/icons-material"
import { Link } from "@mui/material"

export const navlink = [
  {
    url: "/",
    text: "Home",
  },
  {
    url: "/about",
    text: "About",
  },
  {
    url: "/services",
    text: "Services",
  },
  {
    url: "/portfolio",
    text: "Portfolio",
  },

  {
    url: "/contact",
    text: "Contact",
  },
]
export const home = [
  {
     image:"logo.png"

  },
]
export const about = [
  {
    desc: "ሕዋስ means “cell” in Amharic, and this section is all about the small sparks that power big change in Ethiopia’s health scene. We’re shining a spotlight on the grassroots clinics, city labs, and  health heroes whose everyday ingenuity builds the backbone of progress.",

    desc1: "Each story in Hiwas is a close-up on someone’s micro-level hustle. Whether it’s a DIY diagnostic tool or a community-run sanitation hub .And how those tiny wins add up to system wide impact.",

    //cover: "./images/akinahom.png",
  },
]
export const services = [
  {
    id: 1,
    icon: <Settings />,
    title: "Editing Medical Reports",
    desc: "We fix up medical write-ups so they’re clear, correct, and easy to read—in both Amharic and English.",
  },
  {
    id: 2,
    icon: <CropRotate />,
    title: " Simple Device Diagrams",
    desc: "We make easy-to-understand pictures that show how machines like ultrasound or X-ray work—great for clinics without tech support.",
  },
  {
    id: 3,
    icon: <ViewInAr />,
    title: " Turning Tech Talk into Everyday Language",
    desc: "We take tricky medical instructions and explain them in plain Amharic—so everyone knows how to use the tools safely.",
  },
  {
    id: 4,
    icon: <PieChart />,
    title: "Writing Special Columns",
    desc: "We share short stories and articles about small but powerful medical ideas—like Signal & Silence or Tiny Architects.",
  },
  {
    id: 5,
    icon: <Code />,
    title: "Naming & Logo Help",
    desc: "We help you come up with strong names, logos, and slogans for your health projects—so they feel local, trusted, and easy to remember.",
  },
  {
    id: 6,
    icon: <BarChart />,
    title: "Social Media Posts",
    desc: "We design posts that look great and make sense on LinkedIn or WhatsApp—especially when sharing medical info in a friendly way.",
  },
]

export const project  = [
  {
    id: 1,
    icon: <CloudOutlined />,
    num: "1",
    title: "Stethoscope report"
    
  },
  {
    id: 2,
    icon: <FavoriteBorder />,
    num: "10",
    title: "Pulsea"
  },
  {
    id: 3,
    icon: <Public />,
    num: "1",
    title: "Signal and Sign"
  
  },
  {
    id: 4,
    icon: <PersonOutlined />,
    num: "1",
    title: "Tiny Architect Big Question"
 
  },
];

export const portfolio = [
  {
    id: 1,
    cover: "../images/port/signal and sign.jpg",
    name: "column",
    category: "Use case",
    title: "signal and sign",
  },
  {
    id: 2,
    cover: "../images/port/Tiny archtect.jpg",
    name: "column",
    category: "Interview",
    title: "Tiny archtect",
  },
  {
    id: 3,
    cover: "../images/port/stetescope report.jpg",
    name: "column",
    category: "News",
    title: "stetescope report",
  },
  {
    id: 4,
    cover: "../images/port/pulsea.jpg",
    name: "column",
    category: "Device",
    title: "pulsea",
  },


  // {
  //   id: 5,
  //   cover: "../images/port/port5.jpg",
  //   name: "Brand",
  //   category: "design",
  //   title: "Brex Logo",
  // },
  // {
  //   id: 6,
  //   cover: "../images/port/port6.jpg",
  //   name: "Brand",
  //   category: "development",
  //   title: "Brex Logo",
  // },
];


export const contact = [
  {
    icon: <AddLocationAltOutlined />,
    text1: "Addis Ababa,Ethiopia",
    //text2: "Seattle, WA, 98101",
  },
  {
    icon: <PhoneIphone />,
    text1: "0935034153",
   
  },
  {
    icon: <EmailOutlined />,
    text1: "www.meseletabita@gmail.com",
    
  },
]
export const social = [
  {
    icon: <Facebook />,
     link: "https://www.facebook.com/Tabitha.Mesele", 
  },
  {
    icon: <Twitter />,
      link: "https://x.com/Tabitha_Mesele?t=btZR7q8qmMVCiuUYBBzkTA&s=09", 
  },
  {
    icon: <Email />,
     link: "www.meseletabitha@gmail.com", 
  },
  {
    icon: <Telegram />,
     link: "https://t.me/hiwasnew", 
  },
]

