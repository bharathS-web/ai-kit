"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocLayout } from "../DocLayout";
import { TOCItem } from "../DocTOC";
import { ComponentPreview } from "../ComponentPreview";
import { InstallationSection } from "../InstallationSection";
import { ImageUploadPreview, ImageUploadItem } from "@inaicode/react";

const TOC_ITEMS: TOCItem[] = [
  { id: "installation", title: "Installation" },
  { id: "interactive-example", title: "Interactive example" },
  { id: "zoom-lightbox", title: "Lightbox zoom & removal" },
  { id: "props-reference", title: "Props reference" },
];

export default function ImageUploadPreviewPage() {
  const [images, setImages] = useState<ImageUploadItem[]>([
    {
      id: "img1",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      name: "gradient_flow.png",
    },
    {
      id: "img2",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      name: "architecture_diagram.png",
    },
    {
      id: "img3",
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
      name: "network_topology.png",
      isUploading: true,
      progress: 68,
    },
  ]);

  const handleRemove = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleAdd = () => {
    const newImg: ImageUploadItem = {
      id: `img-${Date.now()}`,
      url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&q=80",
      name: "uploaded_asset.png",
    };
    setImages([...images, newImg]);
  };

  return (
    <DocLayout
      breadcrumbSection="Media & Multimodal"
      breadcrumbPage="ImageUploadPreview"
      currentActive="ImageUploadPreview"
      tocItems={TOC_ITEMS}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            ImageUploadPreview
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Multimodal image preview thumbnails with upload progress spinners, hover removal triggers, and lightbox zoom modals.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/components/system-prompt-editor"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/components/audio-player"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="mt-8">
        <ComponentPreview
          title="ImageUploadPreview example"
          code={`<ImageUploadPreview
  images={images}
  onRemove={(id) => handleRemove(id)}
  onAdd={() => handleAdd()}
  maxImages={4}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <ImageUploadPreview
              images={images}
              onRemove={handleRemove}
              onAdd={handleAdd}
              maxImages={4}
            />
          </div>
        </ComponentPreview>
      </div>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Installation */}
      <InstallationSection
        componentName="ImageUploadPreview"
        slug="image-upload-preview"
        codeSnippet={`import { ImageUploadPreview } from "@inaicode/react";

<ImageUploadPreview
  images={[{ id: "1", url: "/sample.png" }]}
  onRemove={(id) => remove(id)}
  onAdd={() => openPicker()}
/>`}
      />

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Interactive Example */}
      <section id="interactive-example" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Interactive example
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hover over image cards to preview zoom triggers or delete uploaded assets before submitting the prompt.
        </p>
        <ComponentPreview
          code={`<ImageUploadPreview
  images={images}
  onRemove={(id) => remove(id)}
  onAdd={() => add()}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <ImageUploadPreview
              images={images}
              onRemove={handleRemove}
              onAdd={handleAdd}
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Zoom Lightbox */}
      <section id="zoom-lightbox" className="scroll-mt-8 space-y-4 mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lightbox zoom & removal
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Clicking the zoom magnifying icon opens an accessible backdrop lightbox preview.
        </p>
        <ComponentPreview
          code={`<ImageUploadPreview
  allowZoom={true}
  images={images.slice(0, 2)}
/>`}
        >
          <div className="w-full max-w-md py-4">
            <ImageUploadPreview
              allowZoom={true}
              images={images.slice(0, 2)}
            />
          </div>
        </ComponentPreview>
      </section>

      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* Props Reference */}
      <section id="props-reference" className="scroll-mt-8 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Props Reference
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 font-mono">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="p-3 font-mono text-brand-600">images</td>
                <td className="p-3 font-mono">ImageUploadItem[]</td>
                <td className="p-3 font-mono">[]</td>
                <td className="p-3">Array of image objects with id, url, name, isUploading, progress.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onRemove</td>
                <td className="p-3 font-mono">(id: string) =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when removing an image.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">onAdd</td>
                <td className="p-3 font-mono">() =&gt; void</td>
                <td className="p-3 font-mono">undefined</td>
                <td className="p-3">Callback when clicking Add File slot.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">maxImages</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">4</td>
                <td className="p-3">Maximum allowed images.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-600">allowZoom</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Enables fullscreen lightbox zoom.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}
