import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const Pauthor = ({data}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // console.log(data.authorName)

  const { data: authors = [], refetch } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/author/${data?.autemail}`);
      return res.json();
    }
  });

  // console.log(authors)


  return (
    <div className="min-h-screen w-full py-10 md:px-10 overflow-hidden ">
      <div className="max-w-full md:max-w-full lg:max-w-7xl mx-auto space-y-12 ">
        {authors?.map((author, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="relative bg-white/95 rounded-3xl shadow-xl border border-green-100 overflow-hidden hover:shadow-2xl transition-all duration-700"
          >
            {/* Animated curved background behind image */}
            <motion.div
              className="absolute -top-20 -left-20 w-[380px] h-[380px] bg-gradient-to-br from-green-300 via-green-200 to-green-100 rounded-full opacity-40 blur-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Header section */}
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 p-8 md:p-10">
              {/* Author Image with shadow */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-shrink-0"
              >
                <div className="p-3 bg-white rounded-3xl shadow-xl border border-green-200 backdrop-blur-sm relative">
                  <img
                    src={author?.image}
                    alt={author?.name}
                    className="w-44 h-44 md:w-52 md:h-52 object-cover rounded-2xl shadow-md"
                  />

                  {/* Floating subtle glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-200/20 to-transparent"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Author Info */}
              <motion.div
                className="text-center mt-10 md:text-left space-y-2 md:pl-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h2 className="text-3xl text-center md:text-4xl font-bold text-green-700 drop-shadow-sm">
                  লেখক পরিচিতি
                </h2>
                <p className="text-xl text-center font-semibold text-gray-800">
                  {author.name}
                </p>
              </motion.div>
            </div>

            {/* Author Description */}
            <motion.div
              className="relative z-10 p-8 md:p-10 text-gray-800 leading-relaxed bg-gradient-to-b from-white via-green-100 to-green-200/100 rounded-b-3xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {author.authordescription.split("\n").map((para, i) => (
                <p
                  key={i}
                  className={`mb-3 ${
                    para.includes(":") ? "font-semibold text-green-700" : ""
                  }`}
                >
                  {para.trim()}
                </p>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pauthor;
