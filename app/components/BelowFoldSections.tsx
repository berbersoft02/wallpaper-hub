"use client";

import dynamic from "next/dynamic";

const WallpaperShowcase = dynamic(
  () => import("./WallpaperShowcase"),
  { ssr: false }
);
const Gallery = dynamic(() => import("./Gallery"), {
  ssr: false,
  loading: () => (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="h-96 bg-card-bg/20 rounded-xl animate-pulse" />
    </section>
  ),
});
const IconsPFPs = dynamic(() => import("./IconsPFPs"), {
  ssr: false,
  loading: () => (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="h-96 bg-card-bg/20 rounded-xl animate-pulse" />
    </section>
  ),
});

export default function BelowFoldSections({
  showcaseImages,
}: {
  showcaseImages: { src: string; alt: string }[];
}) {
  return (
    <>
      <WallpaperShowcase images={showcaseImages} />
      <Gallery />
      <IconsPFPs />
    </>
  );
}
