"use client";
import NotesComponent from "@/components/note-component";
import { LoggedInHeaderSection } from "@/components/loggedin-header-section";
import { PromptSignupLogin } from "@/components/prompt-signup-login";
import { useAuth } from "@/components/auth/useAuth";

const PrivateNotesHomePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <PromptSignupLogin />;
  }

  return (
    <div className="px-32">
      <LoggedInHeaderSection />
      <NotesComponent />
    </div>
  );
};

export default PrivateNotesHomePage;
