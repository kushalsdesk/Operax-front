import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <p>This is the Collecion of {params.slug}</p>
    </div>
  );
};

export default page;
