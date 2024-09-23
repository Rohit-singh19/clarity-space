import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const RecentlyVisited = () => {
  // Create a variable that stores the doc data, including dummy data with banner img URL
  const carouselItems = useMemo(() => {
    return Array.from({ length: 10 })
      .map((_, i) => i)
      .map((item) => {
        return {
          docId: item.toString(),
          title: `Item ${item + 1}`,
          banner:
            "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww",
          description: `Description ${item}`,

          createdAt: new Date("2024-09-21"),
          updatedAt: new Date("2024-09-20"),
          icon: "📁",
          parent: `Parent ${item}`,
        };
      });
  }, []);

  return (
    <div className="my-1">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent className="-ml-1">
          {carouselItems.map((doc) => (
            <CarouselItem
              key={doc.docId}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 group"
            >
              <Link href={`/docs/${doc.docId}`}>
                <Card className="border border-slate-200 group-hover:border-slate-400 rounded-xl overflow-hidden">
                  <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                    <Image
                      src={doc.banner}
                      alt={doc.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover "
                    />

                    <div className="absolute p-2 pt-4 bg-white bottom-0 left-0 right-0 h-[70%] flex flex-col justify-between flex-1">
                      <p className="text-lg font-medium absolute -top-4 left-2">
                        {doc.icon}
                      </p>
                      <p className="text-sm font-medium mt-1">{doc.title}</p>
                      <p className="text-sm text-slate-500">
                        {formatDate(doc.updatedAt)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecentlyVisited;
