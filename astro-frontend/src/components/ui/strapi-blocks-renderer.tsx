import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import type React from "react";
import { cn } from "~/helpers/cn";

interface StrapiBlocksProps {
  content: BlocksContent;
}

function StrapiBlocksRenderer(props: StrapiBlocksProps) {
  const { content } = props;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ level, children }) => {
          switch (level) {
            case 1:
              return <h1 className="text-5xl font-bold">{children}</h1>;
            case 2:
              return <h2 className="text-4xl font-bold">{children}</h2>;
            case 3:
              return <h3 className="text-3xl font-bold">{children}</h3>;
            case 4:
              return <h4 className="text-2xl font-bold">{children}</h4>;
            case 5:
              return <h5 className="text-xl font-bold">{children}</h5>;
            case 6:
              return <h6 className="text-lg font-bold">{children}</h6>;
            default:
              return <h3 className="text-lg font-bold">{children}</h3>;
          }
        },

        link: ({ url, children }) => {
          return <Link url={url ?? "#"}>{children}</Link>;
        },

        paragraph: ({ children }) => {
          return <p className="leading-7 text-slate-900">{children}</p>;
        },

        image: ({ image }) => {
          return (
            <img
              className="h-auto max-w-lg overflow-hidden rounded-md"
              src={image.url}
              alt={image.alternativeText ?? undefined}
              width={image.width}
              height={image.height}
            />
          );
        },

        list: ({ children, format }) => {
          if (format === "ordered") {
            return (
              <ol className="list-inside list-decimal space-y-2 text-gray-500">
                {children}
              </ol>
            );
          }
          return (
            <ul className="list-inside list-disc space-y-2 text-slate-800">
              {children}
            </ul>
          );
        },
        "list-item": ({ children }) => {
          return <li className="leading-relaxed tracking-wide">{children}</li>;
        },
        quote: ({ children }) => {
          return (
            <blockquote className="my-4 border-s-4 border-natgeo-yellow-300 bg-natgeo-yellow-50 p-4">
              <p className="text-xl font-medium italic leading-relaxed tracking-wide text-gray-900">
                "{children}"
              </p>
            </blockquote>
          );
        },
      }}
      modifiers={{
        bold: ({ children }) => {
          return <b className="font-bold">{children}</b>;
        },
        italic: ({ children }) => {
          return <i className="italic">{children}</i>;
        },
        underline: ({ children }) => {
          return <span className="underline">{children}</span>;
        },
        strikethrough: ({ children }) => {
          return <s className="line-through">{children}</s>;
        },
      }}
    />
  );
}

export default StrapiBlocksRenderer;

function Link(props: { url: string; children: React.ReactNode }) {
  const { children, url } = props;
  return (
    <a className={cn("text-blue-700 font-medium hover:underline")} href={url}>
      {children}
    </a>
  );
}
