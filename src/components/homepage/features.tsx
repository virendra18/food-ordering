import Image from "next/image";
import React from "react";

import FeaturesCard from "./features-card";

const Features = () => {
  return (
    <section className="mb-10 ">
      <h2 className="text-center mt-10 mb-5 text-[50px] text-primary font-bold">
        Features
      </h2>

      <div className="flex flex-col md:flex-row justify-center md:gap-10 lg:gap-32">
        <FeaturesCard>
          <h3 className="font-bold text-center text-[25px] mt-3 mb-10">
            1000+ Ratings(4.3)
          </h3>
          <Image
            height={240}
            width={240}
            src="/hotel.png"
            alt=""
            className="h-60"
          />
        </FeaturesCard>

        <FeaturesCard>
          <h3 className="font-bold text-[25px] mt-3 mb-10">Fast Delivery</h3>
          <Image
            height={240}
            width={240}
            src="/delivery.png"
            alt=""
            className="h-60"
          />
        </FeaturesCard>

        <FeaturesCard>
          <h3 className="font-bold text-[25px] mt-3 mb-10">Quality Control</h3>
          <Image
            height={240}
            width={240}
            src="/quality.png"
            alt=""
            className="h-60"
          />
        </FeaturesCard>
      </div>
    </section>
  );
};
export default Features;
