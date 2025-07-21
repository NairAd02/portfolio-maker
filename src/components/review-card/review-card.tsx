import { Review } from "@/lib/types/reviews";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MessageSquareCode, Star } from "lucide-react";
import AvatarContainer from "../ui/avatar-container";
import { principalPlaceHolder } from "@/lib/place-holders";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <Card className="border-0 hover:scale-105 transition-transform duration-300 shadow-lg h-full border-t-12 border-t-primary/40 hover:border-t-primary border-b-4 border-b-primary/40 hover:border-b-primary">
      <CardHeader>
        <div className="p-2 w-10 rounded-lg bg-primary">
          <MessageSquareCode className="text-white w-6 h-6" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full p-6">
        <div className="space-y-1">
          <div className="flex mb-4">
            {[...Array(review.grade)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-slate-600 mb-6">{review.review}</p>
        </div>
        <div className="flex items-center space-x-3">
          <AvatarContainer
            fallback={review.user.username.charAt(0)}
            image={review.user.avatar || principalPlaceHolder}
          />
          <div>
            <p className="font-semibold text-slate-900">
              {review.user.username}
            </p>
            <p className="text-sm text-slate-600">{review.user.specialty}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
