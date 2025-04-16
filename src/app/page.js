

import Hero from "../components/Hero";
import TestimonialSection from "./../components/testimonial";
import Insights from "./../components/Insights";
import Products from "../components/Products";
import  Trail  from "../components/Trail";
import ClientLogosCarousel from "../components/ClientCarousel";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <main className="pt-16 min-h-screen">

      <Hero />
      <Products/>
    <TestimonialSection/>
    <ClientLogosCarousel/>
    <Insights/>
<ContactForm/>
    </main>
  );
}
