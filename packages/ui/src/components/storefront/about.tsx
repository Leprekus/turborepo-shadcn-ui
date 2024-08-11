import React, { ReactNode } from "react";
import Heading from "./heading";
import { Button } from "../ui/button";
import { AboutPayload } from "@ui/types";

interface AboutProps {
  payload: AboutPayload;
  Link: ReactNode;
  Image: ReactNode;
}
export default function About({ payload, Image, Link }: AboutProps) {
  return (
    <div className="flex flex-col items-center gap-y-10 lg:flex-row lg:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 lg:w-2/3">
        <Heading
          title="RODRIGO ROMERO"
          className="text-black font-medium md:text-5xl lg:text-7xl p-0"
        />
        <div className="flex flex-col text-justify gap-4 items-center lg:items-start">
          <div className="relative h-96 w-80 lg:h-[450px] lg:w-[400px]">
            {Image}
          </div>
          <p className="text-gray-700 text-sm">
            <span className="text-gray-400">LANGUAGE:</span> SPANISH <br />
            <span className="text-gray-400">NATIONALITY:</span> SALVADOREAN
            <br />
            <span className="text-gray-400">COUNTRY OF RESIDENCE:</span> CANADA
            <br />
          </p>
        </div>
      </div>
      <div className="lg:w-1/3 text-justify">
        <Button asChild className="w-full text-lg py-5 uppercase">
          {Link}
        </Button>

        <div className="space-y-7 tracking-tight text-sm pt-20">
          {payload.description.split("\n\n").map((paragraph, index) => (
            <p key={index}>
              {paragraph.split("\n").map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  {lineIndex < paragraph.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
