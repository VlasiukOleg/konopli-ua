"use client";

import { CircularProgress } from "@heroui/react";

export const Loader: React.FC = () => {
  return (
    <section className="py-5 flex items-center justify-center min-h-96">
      <CircularProgress label="Loading..." />
    </section>
  );
};

export default Loader;
