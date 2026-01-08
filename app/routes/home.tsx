import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly ATS" },
    {
      name: "description",
      content: "A friendly ATS used to anaysle the resume according to the JD",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [resumes, setResume] = useState<Resume[]>([]);

  // const signOut = usePuterStore((state) => state.auth.signOut);
  // const isAuthenticated = usePuterStore((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes.map(
        (resume) => JSON.parse(resume.value) as Resume
      );
      setResume(parsedResumes);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth?next=/", { replace: true });
  };
  return (
    <main className="bg-[url('/images/bg-main.webp')] bg-cover">
      <div className="flex items-center">
        <Navbar />
        {auth.isAuthenticated && (
          <div className="flex justify-end px-4">
            <button
              onClick={handleLogout}
              className="primary-button"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <section className="main-section">
        <div className="page-heading px-16">
          <h1>Friendly ATS</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}
        {!loadingResumes && resumes?.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: (typeof resumes)[number]) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
