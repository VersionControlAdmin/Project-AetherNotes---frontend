// import LiveEditor from "../components/LiveEditor";
// import { useUploadedFilesContext } from "../context/UploadFiles.context";
"use client";
import { HeroSection } from "@/components/hero-section";
import NotesComponent from "@/components/note-component";

const HomePage = () => {
  return (
    <div className="px-32">
      <HeroSection />
      <NotesComponent />
    </div>
  );
};

export default HomePage;
