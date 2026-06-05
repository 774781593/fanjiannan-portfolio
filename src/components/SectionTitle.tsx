import { FigmaFrame } from "@/components/FigmaFrame";
import { Reveal } from "@/components/Reveal";

type SectionTitleProps = {
  title: string;
  caption?: string;
};

export function SectionTitle({ title, caption }: SectionTitleProps) {
  return (
    <Reveal>
      <FigmaFrame className="mx-auto flex min-h-[250px] max-w-[1450px] items-center justify-center px-6 md:min-h-[330px]">
        <div className="text-center">
          <h1 className="text-[clamp(56px,10vw,154px)] font-black leading-none tracking-[0] text-acid">
            {title}
          </h1>
          {caption ? <p className="mt-12 text-lg font-medium text-ink/82 md:text-2xl">{caption}</p> : null}
        </div>
      </FigmaFrame>
    </Reveal>
  );
}
