
"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Swiper CSS
import "swiper/css";
import "swiper/css/autoplay";
const techLogos = [
    { name: "React", src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" },
    { name: "Node.js", src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" },
    { name: "JavaScript", src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" },
    { name: "Next.js", src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" },
    { name: "Tailwind CSS", src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" },
    { name: "MongoDB", src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mongodb.png" },
    { name: "MySQL", src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mysql.png" },
    // Add more if needed
];

const TechSlider = () => {
    return (
        <div className="w-full py-10 bg-[#0c0a3b] my-3">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={5}
                loop={true}
                speed={4000}
                autoplay={{
                    delay: 0, 
                    disableOnInteraction: false,
                }}
                freeMode={true}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                }}
            >
                {techLogos.map((tech) => (
                    <SwiperSlide key={tech.name}>
                        <div className="flex justify-center items-center p-4">
                            <img
                                src={tech.src}
                                alt={tech.name}
                                className="h-16 w-16 object-contain"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TechSlider;