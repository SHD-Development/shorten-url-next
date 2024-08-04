"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import Link from "next/link";
export default function Create() {
  const [longUrl, setLongUrl] = useState("");
  const [clickLogs, setClickLogs] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });
    const data = await response.json();
    toast.custom(
      <div className="bg-white text-black rounded-lg px-3 py-1">
        縮網址：{window.location.origin}/{data.shortCode}&nbsp;
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/${data.shortCode}`
            );
          }}
        >
          Copy
        </Button>
      </div>
    );
    toast.success("成功創建！");
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>縮網址系統</CardTitle>
            <CardDescription>輸入長網址即可</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="longUrl">長網址</Label>
                <Input
                  id="longUrl"
                  type="url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="輸入長網址"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" className="">
              創建
            </Button>
            <Link href="/logs">
              <Button variant="outline" className="">
                紀錄
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
