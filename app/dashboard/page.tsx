"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#F5EFE0] rounded-xl p-6 shadow-sm border border-[#F28C38]/20">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">Welcome to your Hand Line Portal</h1>
          <p className="text-[#5A5A5A] mt-1">Your industrial safety glove management centre</p>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className="flex justify-center">
        <Card className="w-full max-w-md border-l-4 border-l-[#F28C38]">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-[#F28C38]" />
            </div>
            <CardTitle className="text-xl">User Portal Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              We're working hard to bring you a comprehensive dashboard experience. 
              Stay tuned for exciting new features!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
