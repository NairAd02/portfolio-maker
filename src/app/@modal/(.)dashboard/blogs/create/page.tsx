import BlogCreateFormContainer from "@/sections/blogs/form/create/blog-create-form-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

export default function CreateBlogPage() {
  return (
    <ModalWrapper>
      <BlogCreateFormContainer />
    </ModalWrapper>
  );
}
