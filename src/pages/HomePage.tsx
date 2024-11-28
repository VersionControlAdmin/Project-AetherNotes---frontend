// import LiveEditor from "../components/LiveEditor";
// import { useUploadedFilesContext } from "../context/UploadFiles.context";
"use client";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import NotesComponent from "@/components/note-component";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <NotesComponent />
    </div>
  );
};

export default HomePage;
