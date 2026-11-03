import BackendStatus from "./BackendStatus";
const tools = [
  {
    number: "01",
    title: "Question Paper Analyser",
    description:
      "Upload previous-year papers and discover topic patterns, question frequency and syllabus coverage.",
    category: "EXAM PREPARATION",
    status: "Building first",
    featured: true,
  },
  {
    number: "02",
    title: "CGPA Calculator",
    description:
      "Calculate your GPA and explore different marks and grade scenarios.",
    category: "ACADEMICS",
    status: "Coming soon",
  },
  {
    number: "03",
    title: "Lab Report Builder",
    description:
      "Organise your experiment details and create structured lab reports.",
    category: "PRODUCTIVITY",
    status: "Coming soon",
  },
  {
    number: "04",
    title: "Timetable Planner",
    description:
      "Find free periods, organise tasks and make better use of your study time.",
    category: "PLANNING",
    status: "Coming soon",
  },
  {
    number: "05",
    title: "Assignment Checker",
    description:
      "Compare your assignment draft against the requirements and rubric.",
    category: "ACADEMICS",
    status: "Coming soon",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#20251f]">
      <nav className="flex items-center justify-between border-b border-[#e8e9e3] px-6 py-5 md:px-16">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            SofySpeaks<span className="text-[#76966d]">.</span>
          </h1>
          <p className="text-xs tracking-widest text-gray-500">
            STUDENT HUB
          </p>
        </div>

        <span className="rounded-full border border-[#dfe5d9] px-4 py-2 text-xs font-medium text-[#58734f]">
          YOUR ACADEMIC SPACE
        </span>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-[#76966d]">
            LEARN SMARTER. STAY ORGANISED.
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Everything you need
            <br />
            to make student life
            <br />
            <span className="text-[#78956e]">a little easier.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600">
            A collection of practical tools designed to help students
            study better, manage their academics and save time.
          </p>
        </div>

        <div className="mb-7 mt-20 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#78956e]">
              THE TOOLKIT
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Explore your tools
            </h3>
          </div>

          <p className="hidden text-sm text-gray-500 sm:block">
            Built for every student.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {tools.map((tool) => (
            <article
              key={tool.number}
              className={`rounded-2xl border p-7 transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                tool.featured
                  ? "border-[#d5dfce] bg-[#eef3e9] md:col-span-2"
                  : "border-[#e8e9e3] bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#78956e]">
                  {tool.number}
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold tracking-wider text-[#65785e]">
                  {tool.status.toUpperCase()}
                </span>
              </div>

              <p className="mt-8 text-[10px] font-semibold tracking-[0.18em] text-gray-500">
                {tool.category}
              </p>

              <h4 className="mt-2 text-xl font-semibold">
                {tool.title}
              </h4>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                {tool.description}
              </p>

              {tool.featured && (
                <p className="mt-6 text-sm font-semibold text-[#58734f]">
                  Our first tool is currently in development.
                </p>
              )}
            </article>
          ))}
        </div>
        <BackendStatus />

        <footer className="mt-20 border-t border-[#e8e9e3] pt-7 text-center">
          <p className="text-sm text-gray-500">
            Made for students, with purpose.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            © 2026 SofySpeaks Student Hub
          </p>
        </footer>
      </section>
    </main>
  );
}
