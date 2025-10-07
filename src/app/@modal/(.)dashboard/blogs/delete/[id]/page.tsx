import BlogDeleteContainer from "@/sections/blogs/delete/blog-delete-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteBlogPage({ params }: Props) {
  const { id } = await params;
  return (
    <ModalWrapper>
      <BlogDeleteContainer id={id} />
    </ModalWrapper>
  );
}
