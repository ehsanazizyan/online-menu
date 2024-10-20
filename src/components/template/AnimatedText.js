import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const text = [
    "   👋به کافه ما خوش آمدید",
    "رزرو برای مراسمات شما",
    " ک_____افه  رستوران",
    "بامدیریت برادران رایت😊",
    "متن پنجم",
];

const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
};

const AnimatedTexts = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % text.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            style={{
                borderRadius: "20px",
                boxShadow:
                    " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}>
            <motion.div initial="hidden" animate="visible" variants={textVariants} key={index}>
                <div
                    style={{
                        color: "red",
                        textAlign: "center",
                        margin: "5vh 0",
                        width: "100%",
                        fontSize: "1.3rem",
                        padding: "20px",
                    }}>
                    {text[index]}
                </div>
            </motion.div>
        </div>
    );
}

export default AnimatedTexts;
// import { Typography } from "@mui/material";
// import { motion } from "framer-motion";

// export default function AnimatedText() {
//     let text;
//     const texts = ["انیمیشن 1", "انیمیشن 2", "انیمیشن 3", "انیمیشن 4", "انیمیشن 5"];
//     setInterval(() => {
//         text = texts.map((item) => (text = item));
//     }, 100);
//     console.log(text);
//     return (
//         <motion.div initial="hidden" animate="visible" variants={textVariants}>
//             {text}
//         </motion.div>
//     );
// }
