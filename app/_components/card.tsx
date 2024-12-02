"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { JSONContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    content: JSONContent;
    images: string[];
    price: number;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    price: number;
    content: JSONContent;
    link: string;
    images: string[];
  } | null>(null);

  const handleOpenModal = (
    title: string,
    price: number,
    content: JSONContent,
    link: string,
    images: string[]
  ) => {
    setModalContent({ title, price, content, link, images });
    setOpenModal(true);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10",
        className
      )}
    >
      {items.map((item, idx) => {
        return (
          <div
            key={item.link}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gold blur-md dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card
              onClick={() =>
                handleOpenModal(
                  item.title,
                  item.price,
                  item.content,
                  item.link,
                  item.images
                )
              }
            >
              <Image
                src={item.images[0]}
                alt={`affiche de ${item.title}`}
                width={250}
                height={200}
                className="mx-auto object-cover object-center rounded-2xl max-w-full max-h-[250px]"
              />

              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                <div className="text-center font-bold text-lg">
                  {item.price}
                  <span className="text-xs"> €</span>
                </div>
                <EditorCardContent content={item.content} />
                <Link
                  href={item.link}
                  className="w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full" variant={"secondary"}>
                    Commmander
                  </Button>
                </Link>
              </CardDescription>
            </Card>
          </div>
        );
      })}
      {openModal && modalContent && (
        <Modal
          title={modalContent.title}
          images={modalContent.images}
          price={modalContent.price}
          content={modalContent.content}
          link={modalContent.link}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

const EditorCardContent = ({ content }: { content: JSONContent }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    content,
    extensions: [StarterKit],
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-dark line-clamp-3 overflow-hidden text-ellipsis",
      },
    },
  });

  if (!isClient) {
    return null; // Do not render editor until client-side
  }

  return (
    <div className="py-10">{editor && <EditorContent editor={editor} />}</div>
  );
};

export const Card = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    className={cn(
      "rounded-2xl h-full w-full p-4 overflow-hidden bg-white/80 dark:bg-black border border-transparent relative z-20",
      className
    )}
    onClick={onClick}
  >
    <div className="relative z-50">
      <div className="p-4">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h4
    className={cn(
      "text-primary/90 uppercase font-bold mx-auto text-center text-3xl tracking-wide mt-4",
      className
    )}
  >
    {children}
  </h4>
);

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "py-8 mx-auto tracking-wide leading-relaxed text-base text-secondary",
      className
    )}
  >
    <div className="line-clamp-4 text-justify">{children}</div>
  </div>
);

const Modal = ({
  title,
  price,
  content,
  link,
  images,
  onClose,
}: {
  title: string;
  price: number;
  content: JSONContent;
  link: string;
  images: string[];
  onClose: () => void;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    content: content,
    extensions: [StarterKit],
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose dark:prose-dark",
      },
    },
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed); // Toggle zoom state on image click
  };

  const handleClose = () => {
    setIsZoomed(false); // Reset zoom state when closing modal
    onClose();
  };

  // Styles for the image, zoomed or not
  const imageStyles = isZoomed
    ? "max-h-[80vh] max-w-full object-contain cursor-zoom-out"
    : "max-h-[250px] w-auto object-cover cursor-zoom-in";

  if (!isClient) {
    return null; // Do not render modal until client-side
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-lg">
      <div className="relative bg-white dark:bg-neutral-900 p-6 rounded-xl max-w-lg w-full">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white bg-black p-3 rounded-full flex items-center justify-center z-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div onClick={handleImageClick}>
          <Image
            src={images[0]}
            alt={`Image de ${title}`}
            width={500}
            height={500}
            className={imageStyles}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold my-4">{title}</h2>
          <div className="text-primary font-bold text-lg">
            {price} €
          </div>
        </div>
        <div className="py-4 text-primary-light mb-4">
          {editor && <EditorContent editor={editor} />}
        </div>
        <div>
          <Link
            href={link}
            className="w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Button className="w-full" variant={"secondary"}>
              Commander
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
