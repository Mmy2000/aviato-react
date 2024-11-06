import React from "react";

export default function Heading({name} ) {
  return (
    <div className="flex w-full relative">
      <h1 className="text-xl text-gray-900 dark:text-gray-200 w-full font-bold capitalize border-b border-b-gray-300 pb-2 heading-underline">
        {name}
      </h1>
    </div>
  );
}