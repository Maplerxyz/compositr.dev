import React from "react";

export default function CenterBox(props: {children?: React.ReactNode | React.ReactNode[]}) {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-6 shadow shadow-xl rounded-xl justify-center text-center bg-hex-323232">
        {props.children}
      </div>
    </div>
  );
}
