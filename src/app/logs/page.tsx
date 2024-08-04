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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Logs() {
  const [shortUrl, setShortUrl] = useState("");
  const [clickLogs, setClickLogs] = useState([]);

  const fetchLogs = async () => {
    const shortCode = shortUrl.split("/").pop();
    const response = await fetch(`/api/logs/${shortCode}`);
    const data = await response.json();
    setClickLogs(data);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>查看紀錄</CardTitle>
          <CardDescription>進入了縮網址的使用者的資訊</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="shortUrl">完整的短網址</Label>
              <Input
                id="shortUrl"
                type="url"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
                placeholder="輸入短網址"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full" onClick={fetchLogs}>
            查看紀錄
          </Button>
        </CardFooter>
      </Card>
      {clickLogs.length > 0 && (
        <div className="mt-5">
          <Table>
            <TableBody>
              {clickLogs.map((log: any) => (
                <TableRow key={log.id}>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
