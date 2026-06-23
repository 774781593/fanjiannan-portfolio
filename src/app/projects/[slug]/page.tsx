import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LayeredProjectPage } from "@/components/LayeredProjectPage";
import { getProjectSeo, projectSeo } from "@/data/projectSeo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectSeo.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = getProjectSeo(slug);

  if (!seo) {
    return {};
  }

  const path = `/projects/${seo.slug}/`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title: `${seo.title} | FanJiannan Portfolio`,
      description: seo.description,
      url: path,
      siteName: "FanJiannan Portfolio",
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 675,
          alt: seo.title
        }
      ],
      locale: "zh_CN",
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | FanJiannan Portfolio`,
      description: seo.description,
      images: [seo.image]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const seo = getProjectSeo(slug);

  if (!seo) {
    notFound();
  }

  return (
    <>
      <h1 className="sr-only">
        {`${seo.title} - ${seo.category}`}
      </h1>
      <LayeredProjectPage slug={seo.slug} />
    </>
  );
}
