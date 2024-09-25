"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { keyFeatures } from "@/lib/dummy";
import React from "react";

const KeyFeatures = () => {
  return (
    <>
      <div>
        <h2 className=" text-6xl font-extrabold pb-5 text-center">Key Features</h2>
        <div className=" flex items-center flex-wrap gap-4 justify-center">
          {keyFeatures.map((feature: any, index: any) => (
            <Card key={index} className=" w-[40%] h-max flex flex-col items-center justify-center">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 mx-auto text-blue-800" />
                <CardTitle className=" text-center">{feature.title}</CardTitle>
                <CardContent>
                    {feature.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default KeyFeatures;
