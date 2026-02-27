import BaselineImg from "../assets/Baseline-Logo-White-text-SVG.png"
import qcssImg from "../assets/qcsstudio_logo.jpg"
import calsysImg from "../assets/calsys.png"
import Image from "next/image";
import Link from "next/link";
const companies = [
    {
        name: "Baseline IT Development Private Limited",
        logo: BaselineImg,
        link: "https://baselineitdevelopment.com",
        period: "Aug 2025– Feb 2026",
        description: (
            <>
                Contributed to the development of{" "}
                <a
                    href="https://hosttravel.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                >
                    HostTravel
                </a>{" "}
                using Next.js, Node.js, Express.js, and MongoDB. Implemented server-side
                rendering with optimized caching strategies (unstable cache) to enhance
                performance and scalability. Also developed real-time chat functionality
                to improve user interaction and engagement.
            </>
        ),
    },
    {
        name: "CQLsys Technologies Private Limited",
        logo: calsysImg,
        link: "https://www.cqlsys.com/",
        period: "Feb 2024– May 2025",
        description: (
            <> Served as a Mern Stack Developer for 1.3 years, working on multiple scalable
                applications built with React.js, Node.js, Express.js, MongoDB, and MySQL.

                platforms like{" "}
                <a
                    href="https://palmettopickleball.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                >
                    Palmetto Pickleball
                </a>{" "}
                and{" "}
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                >
                    LetMeCU
                </a>.
                Contributed to 2 mobile applications, including Plusbilites (5000+ active users),
                implementing secure payment integrations with Stripe, PayPal, and Razorpay.
                Designed and optimized real-time single and group chat systems to ensure
                high performance and seamless user interaction.
            </>
        ),
    },
    {
        name: "QuantumCrafters Studio Private Limited",
        logo: qcssImg,
        link: "https://www.qcsstudio.com/",
        period: "May 2023– Feb 2024",
        description: (
            <>
                Worked at{" "}
                <a
                    href="https://elevatrx.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                >
                    ElevatrX
                </a>{" "}
                where I built scalable full-stack applications using React.js, Node.js,
                Express.js, MongoDB, and Redis. Integrated FCM for real-time notifications
                and deployed optimized solutions on AWS S3 and Cloud CDN for high performance.
            </>
        ),
    },
];
export default function LastCompnise() {
    return (
        <section className="flex flex-col items-center" id="about">

            {/* Heading */}
            <div className="flex flex-col items-center mt-20">
                <h2 className="text-center text-4xl font-semibold max-w-2xl">
                    Last{" "}
                    <span className="bg-gradient-to-t from-indigo-600 to-black p-1 bg-left inline-block bg-no-repeat">
                        Companies
                    </span>
                </h2>

                <p className="text-center text-slate-400 max-w-lg mt-3">
                    Worked with leading IT companies in Mohali, Punjab, contributing to
                    scalable web applications in a collaborative and growth-driven environment.
                </p>
            </div>

            {/* Grid Section */}
            <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 md:px-0 mt-18">
                {
                    companies.map((item, index) => {
                        return (
                            <div key={index} className="py-10 border-b border-slate-700 md:py-0 md:border-r md:border-b-0 md:px-10">
                                <div className="w-[100px] h-[100px] p-2 bg-indigo-600/20 border border-indigo-600/30 rounded">
                                    <Image
                                        alt=""
                                        width={100}
                                        height={100}
                                        priority={true}
                                        src={item.logo}
                                    />
                                </div>

                                <div className="mt-5 space-y-2">
                                    <Link href={item.link} target="blank" className="text-base font-medium text-slate-200">
                                        {item.name}
                                    </Link >
                                    <h3>{item.period}</h3>
                                    <p className="text-sm text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
               

            </div>
        </section>
    );
}