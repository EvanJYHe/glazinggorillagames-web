"use client";

import { useState } from "react";
import SplitText from "../../shared/SplitText/SplitText.jsx";
import Button from "../../ui/Button.jsx";
import PageContainer from "../../ui/PageContainer.jsx";

const fieldClass =
  "w-full appearance-none border-0 border-b border-ggg-border bg-transparent px-0 pb-3 pt-2 font-inter text-[16px] font-normal text-ggg-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-[oklch(0.5_0.015_60)] focus:border-ggg-accent";

const labelClass =
  "mb-2 block font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-ggg-muted";

const radialGlowClass =
  "pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_55%_at_24%_52%,oklch(28%_0.16_18_/_0.38)_0%,transparent_62%)]";

const imageMaskClass =
  "absolute left-0 top-0 block h-full w-full max-w-none object-cover object-[18%_50%] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_48%,rgba(0,0,0,0.55)_70%,transparent_86%)] [mask-image:linear-gradient(to_right,black_0%,black_48%,rgba(0,0,0,0.55)_70%,transparent_86%)] lg:w-[72%]";

const horizontalFadeClass =
  "absolute inset-0 bg-[linear-gradient(to_left,rgba(9,9,9,1)_0%,rgba(9,9,9,0.95)_30%,rgba(9,9,9,0.6)_55%,rgba(9,9,9,0)_75%)]";

const verticalFadeClass =
  "absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,1)_0%,transparent_35%),linear-gradient(to_bottom,rgba(9,9,9,0.6)_0%,transparent_25%)]";

const NumberedField = ({ number, label, children }) => (
  <label className="flex flex-col">
    <span className={labelClass}>
      <span className="mr-2 text-ggg-accent">{number}</span>
      {label}
    </span>
    {children}
  </label>
);

const WorkTogether = ({ contactEmail, pumpkinKeyArtUrl, workTogether }) => {
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
    <section
      id="contact"
      className="relative flex flex-col overflow-hidden py-20 sm:py-24 lg:py-[120px]"
    >
      <div className={radialGlowClass} aria-hidden />

      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        {pumpkinKeyArtUrl ? (
          <img
            className={imageMaskClass}
            src={pumpkinKeyArtUrl}
            alt=""
            decoding="async"
            loading="lazy"
          />
        ) : null}
        <div className={horizontalFadeClass} />
        <div className={verticalFadeClass} />
      </div>

      <PageContainer className="relative z-[3]">
        <div className="max-w-[560px] font-inter text-center lg:ml-auto lg:text-left">
          <h2 className="mb-5 font-bebas font-bold text-ggg-contact uppercase text-ggg-text [font-synthesis:weight_style]">
            <SplitText text={workTogether.titleLines[0]} />
            <br />
            <SplitText text={workTogether.titleLines[1]} startDelay={150} className="text-ggg-accent" />
          </h2>
          <p className="mx-auto mb-12 max-w-[440px] text-[15px] font-normal leading-[1.6] text-ggg-muted lg:mx-0">
            {workTogether.body}
          </p>

          <form className="flex flex-col gap-7 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-7 max-[520px]:grid-cols-1">
              <NumberedField number="01" label="Your name">
                <input
                  className={fieldClass}
                  placeholder={workTogether.namePlaceholder}
                  value={form.name}
                  onChange={event => updateField("name", event.target.value)}
                  required
                />
              </NumberedField>
              <NumberedField number="02" label="Email address">
                <input
                  className={fieldClass}
                  type="email"
                  placeholder={workTogether.emailPlaceholder}
                  value={form.email}
                  onChange={event => updateField("email", event.target.value)}
                  required
                />
              </NumberedField>
            </div>

            <NumberedField number="03" label="About your game">
              <textarea
                className={`${fieldClass} min-h-[88px] resize-none`}
                placeholder={workTogether.messagePlaceholder}
                value={form.message}
                onChange={event => updateField("message", event.target.value)}
                required
              />
            </NumberedField>

            <div className="mt-2 flex flex-col items-stretch gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div className="font-mono text-[11px] leading-[1.65] tracking-[0.06em] text-ggg-muted">
                Prefer email?
                <br />
                <a
                  href={`mailto:${contactEmail}`}
                  className="border-b border-ggg-accent pb-px text-ggg-text transition-colors hover:text-ggg-accent"
                >
                  {contactEmail}
                </a>
              </div>
              <Button type="submit" variant="pill" className="max-sm:w-full">
                {workTogether.submitLabel} <span aria-hidden>→</span>
              </Button>
            </div>
          </form>
        </div>
      </PageContainer>
    </section>
  );
};

export default WorkTogether;
