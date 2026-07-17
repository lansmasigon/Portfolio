export default function JourneySection() {
  return (
    <section id="journey" className="min-h-screen w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight text-[#1944F1] mb-12 md:mb-16 text-center">
          The Journey So Far
        </h2>
        <div className="max-w-3xl mx-auto relative pl-6 md:pl-12">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-border rounded-full"></div>
          
          <div className="flex flex-col gap-10 md:gap-12">
            {/* Education Card */}
            <div className="relative w-full">
              {/* Dot */}
              <div className="absolute left-[-24px] md:left-[-48px] top-8 -translate-y-1/2 w-6 h-6 rounded-full bg-blue border-4 border-background z-10 -translate-x-[calc(50%-2px)]"></div>
              
              <div className="w-full bg-white/40 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-l-4 border-blue">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue mb-2 block">Education</span>
                <h3 className="text-2xl font-bold">West Visayas State University - Main Campus</h3>
                <p className="text-text-secondary">Bachelor of Science in Information Systems, Major in Business Analytics</p>
                <p className="text-sm text-text-muted mt-1">Graduated Magna Cum Laude</p>
              </div>
            </div>

            {/* Internship Card */}
            <div className="relative w-full">
              {/* Dot */}
              <div className="absolute left-[-24px] md:left-[-48px] top-8 -translate-y-1/2 w-6 h-6 rounded-full bg-accent-purple border-4 border-background z-10 -translate-x-[calc(50%-2px)]"></div>
              
              <div className="w-full bg-white/40 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-l-4 border-accent-purple">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple mb-2 block">Internship</span>
                <h3 className="text-2xl font-bold">Knode Software Services - Iloilo City</h3>
                <div className="mt-4">
                  <p className="text-lg text-text-primary font-semibold">Full Stack Developer (Jan 2026 - May 2026):</p>
                  <ul className="list-disc list-outside ml-5 text-base/relaxed text-text-secondary mt-2 space-y-2">
                    <li>Developed and maintained web-based applications using modern full-stack technologies.</li>
                    <li>Implemented frontend features and user interfaces using React</li>
                    <li>Assisted in backend development, API integration, database operations, and system enhancements.</li>
                    <li>Participated in debugging, testing, and performance optimization activities.</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <p className="text-lg text-text-primary font-semibold">Quality Assurance Intern (Jan 2026 - May 2026):</p>
                  <ul className="list-disc list-outside ml-5 text-base/relaxed text-text-secondary mt-2 space-y-2">
                    <li>Developed and executed automated end-to-end test scripts using Playwright, improving testing efficiency and coverage.</li>
                    <li>Documented bugs and collaborated closely with developers to verify fixes and ensure timely issue resolution.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
