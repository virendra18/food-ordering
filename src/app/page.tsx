import Features from "@/components/homepage/features";
import HeroSection from "@/components/homepage/hero-section";
import Trending from "@/components/homepage/trending";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Food Ordering",
};
export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <Trending />
    </>
  );
}
