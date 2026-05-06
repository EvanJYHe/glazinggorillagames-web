"use client";

import { useState } from "react";
import SplitText from "../../shared/SplitText/SplitText.jsx";
import PageContainer from "../../ui/PageContainer.jsx";

const fieldClass =
  "w-full rounded-lg border border-ggg-border bg-white/[0.04] px-4.5 py-[15px] font-dm text-sm text-ggg-text outline-none transition-[border-color,background] duration-200 placeholder:text-ggg-dim focus:border-ggg-accent focus:bg-white/[0.06]";

const WorkTogether = ({ contactEmail, workTogether }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const updateField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const subject = encodeURIComponent(`${workTogether.subjectPrefix}${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${workTogether.replyPrefix} ${form.email}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-[88px]">
      <PageContainer>
        <div className="mx-auto max-w-[620px] text-center">
          <h2 className="mb-4 font-bebas font-bold text-ggg-contact uppercase text-ggg-text [font-synthesis:weight_style]">
            <SplitText text={workTogether.titleLines[0]} />
            <br />
            <SplitText text={workTogether.titleLines[1]} startDelay={150} className="text-ggg-accent" />
          </h2>
          <p className="mb-11 text-ggg-body text-ggg-muted">
            {workTogether.body}
          </p>

          <form className="flex flex-col gap-3.5 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3.5 max-[580px]:grid-cols-1">
              <input
                className={fieldClass}
                placeholder={workTogether.namePlaceholder}
                value={form.name}
                onChange={event => updateField("name", event.target.value)}
                required
              />
              <input
                className={fieldClass}
                type="email"
                placeholder={workTogether.emailPlaceholder}
                value={form.email}
                onChange={event => updateField("email", event.target.value)}
                required
              />
            </div>
            <textarea
              className={`${fieldClass} min-h-[140px] resize-none`}
              placeholder={workTogether.messagePlaceholder}
              value={form.message}
              onChange={event => updateField("message", event.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-1.5 inline-flex w-full touch-manipulation items-center justify-center rounded-ggg-sm bg-ggg-accent p-[15px] font-dm text-ggg-body-sm font-bold uppercase leading-none tracking-[0.07em] text-white transition duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ggg-accent"
            >
              {workTogether.submitLabel} →
            </button>
          </form>
        </div>
      </PageContainer>
    </section>
  );
};

export default WorkTogether;
