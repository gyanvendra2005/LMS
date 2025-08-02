"use client"
import React, { useState, useEffect } from 'react'
import pic from '@/public/next.svg'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from 'next-auth/react';

const CourseCard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  // Simulate loading delay
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 w-full max-w-sm">
        <Skeleton className="h-[112px] w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[50%]" />
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden rounded-lg mb-4 bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transform hover:scale-[1.015] transition-all duration-300 w-full max-w-sm">
      <img
        src="https://media.istockphoto.com/id/2123151544/photo/businessman-holding-e-learning-on-global-technology-network-knowledge-sharing-skill.jpg?s=1024x1024&w=is&k=20&c=3nAHaVxPFZOGtxUNkVnxxcb5IptnxenI3cfZKAWxJSE="
        alt="Course Preview"
        className="w-full h-28  rounded-lg "
      />

      <CardContent className="p-2 pt-0">
        <CardHeader className="text-center mb-1 px-0">
          <CardTitle className="text-md font-semibold text-gray-900 dark:text-white">
            Web Development Bootcamp
          </CardTitle>
          <CardDescription className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Master HTML, CSS & JS in 12 weeks.
          </CardDescription>
        </CardHeader>

        <div className="flex items-center justify-start space-x-2 text-xs mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={session?.user?.image ?? "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{session?.user?.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <span className="text-gray-700 dark:text-gray-300">{session?.user?.name ?? "Instructor"}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-semibold text-base text-gray-900 dark:text-white">
            $199
          </span>
          <span className="text-xs">12 Weeks</span>
        </div>

        <CardAction className="flex justify-center">
          <button className="px-4 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition duration-200">
            Enroll
          </button>
        </CardAction>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

