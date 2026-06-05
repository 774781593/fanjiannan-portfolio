type FigmaImage = {
  src: string;
  width: number;
  height: number;
};

type FigmaImageStackProps = {
  images: FigmaImage[];
  title: string;
};

export function FigmaImageStack({ images, title }: FigmaImageStackProps) {
  return (
    <main className="min-h-screen bg-black">
      {images.map((image, index) => (
        <section
          key={image.src}
          className="mx-auto w-full max-w-[1920px] bg-black"
        >
          <img
            src={image.src}
            alt={`${title} ${index + 1}`}
            width={image.width}
            height={image.height}
            decoding={index === 0 ? "sync" : "async"}
            loading={index === 0 ? "eager" : "lazy"}
            className="block h-auto w-full select-none"
          />
        </section>
      ))}
    </main>
  );
}
