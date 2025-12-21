import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/loan1.jpg';
import bannerImg2 from '../../../assets/loan2.jpg';
import bannerImg3 from '../../../assets/loan3.jpg';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    const slides = [
        {
            image: bannerImg1,
            title: "Your Dream Loan Awaits",
            subtitle: "Apply now and make your financial goals a reality",
            cta1: "Apply for Loan",
            cta2: "Explore Loans"
        },
        {
            image: bannerImg2,
            title: "Fast and Easy Loan Approval",
            subtitle: "Get your loan approved in no time",
            cta1: "Apply for Loan",
            cta2: "Explore Loans"
        },
        {
            image: bannerImg3,
            title: "Secure Your Financial Future",
            subtitle: "Flexible loan plans tailored for you",
            cta1: "Apply for Loan",
            cta2: "Explore Loans"
        },
    ];


    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };


    const titleInfinite = {
        animate: { y: [0, -10, 0] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    };

    return (
        <section className="relative w-full  overflow-hidden">
            <Carousel
                autoPlay
                infiniteLoop
                interval={5000}
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                swipeable={true}
                emulateTouch={true}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="relative w-10/12 max-w-7xl mx-auto bg-gradient-to-br px-10 py-10 2xl:py-14 2xl:px-16 from-orange-100 via-yellow-50 to-white rounded-xl 2xl:rounded-3xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 2xl:gap-16 border border-orange-100 shadow-xl"
                    >
                        {/* Left Text */}
                        <motion.div
                            className="md:w-1/2 w-full text-center md:text-left flex flex-col justify-center space-y-4"
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                        >
                            <motion.h1
                                className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 leading-tight pb-2"
                                {...titleInfinite}
                            >
                                {slide.title}
                            </motion.h1>
                            <p className="text-base md:text-lg 2xl:text-xl text-gray-700 font-medium max-w-md 2xl:max-w-xl">
                                {slide.subtitle}
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                <Link
                                    to="/loan-application"
                                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-5 py-2 md:px-6 md:py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                                >
                                    {slide.cta1}
                                </Link>
                                <Link
                                    to="/all-loans"
                                    className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-5 py-2 md:px-6 md:py-3 rounded-full font-bold transition-all duration-300 shadow-md"
                                >
                                    {slide.cta2}
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Image */}
                        <div className="md:w-1/2 w-full flex justify-center items-center">
                            <img
                                src={slide.image}
                                alt={`banner-${index}`}
                                className="object-cover rounded-2xl shadow-2xl w-full md:w-[85%] lg:w-[80%] 2xl:w-[90%] h-52 md:h-[350px] lg:h-[380px] 2xl:h-[500px] border-4 border-white transform hover:rotate-2 transition-transform duration-500"
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Banner;
