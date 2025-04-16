"use client";

import { useState } from "react";

import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  const [selectedOption, setSelectedOption] = useState("quote");

  return <ContactForm formType={selectedOption} />;

}


