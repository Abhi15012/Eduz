



import React from 'react'

export  function useSearchTexts() {

    const SearchTexts = [
        "React Native Expo Masterclass",
        "Complete JavaScript Course",
        "UI/UX Design Essentials",
        "Machine Learning A-Z",
        "Python for Data Science",
        "AWS Certified Cloud Practitioner",
        "Fullstack Web Development Bootcamp",
        "Cybersecurity Crash Course",
        "Advanced Figma Techniques",
        "SQL Mastery for Analysts",
        "DSA Self Paced",
        "System Design Live",
        "Low Level Design 2.0",
        "Java Backend Expert",
        "Competitive Programming",
        "React for Professionals",
        "Fullstack Node Program",
        "Core CS Fundamentals",
        "DevOps and Cloud",
        "Android Development",
];

   const [currentTexts, setCurrentText] = React.useState("Credit Course");
   React.useEffect(() => {
         let index = 0;
            const interval = setInterval(() => {
                setCurrentText(SearchTexts[index]);
                index = Math.floor(Math.random() * SearchTexts.length);
            }, 5000);
            return () => clearInterval(interval);
    }, []);
   return {currentTexts};
}

