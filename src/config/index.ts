import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Senne Wander - Game Developer",
  author: "Senne Pleun Wander",
  description:
    "Game developer with experience in Unity and Unreal Engine, seeking an internship to further develop industry skills.",
  lang: "en",
  siteLogo: "/NobuVectorized.svg",
  navLinks: [
    { text: "Projects", href: "projects" },
    { text: "About", href: "/contact#about" },
    {text: "Contact", href:"/contact#contact"},
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://www.linkedin.com/in/senne-wander-2b3b87262/" },
    { text: "Github", href: "https://github.com/Snainner" }
  ],
  socialImage: "/zen-og.png",
  canonicalURL: "https://astro-zen.vercel.app",
  
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Senne Wander",
    specialty: "Game Developer",
    summary:
      "Hello there, I'm a passionate game programmer with experience in both Unity and Unreal Engine, currently seeking an internship to further develop my industry skills.",
    email: "sennepw@gmail.com",
  },
  projects: [
    {
      name: "u Music",
      summary: "A music streaming app that emulates Spotify's core features.",
      date:"11-2-2025",
      slug:"/projectpg",
      image: "/spotifu.png",
      heroImage:"/spotifu.png",
    },

    {
      name: "Spotifu Music",
      summary: "A music streaming app that emulates Spotify's core features.",
      date:"11-2-2025",
      slug:"Spotifu",
      image: "/spotifu.png",
      heroImage:"/spotifu.png",
    },
  ],
  about: {
    description: `
      Welcome to my game development portfolio where I’m excited to share my  passion for game design and programming. Most of my projects are created in a  collaborative setting using  agile methods, and those experiences have shaped how I approach problem-solving and teamwork.

      I’m now looking for an internship where I can  grow my skills, and contribute to creating games that players  enjoy. If you have any available opportunities, feel free to reach out to me below.
    `,
    image: "/LighthousePicSmall.png",
    
  },
  contact:{
    description:`Want to collaborate, say hi, or chat about internship openings? Reach out at sennepw@gmail.com`,
  },
};

// #5755ff
