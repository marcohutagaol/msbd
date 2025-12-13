"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Filter, Building2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import { useState } from "react";

export default function AttendanceHeader() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [departemen, setDepartemen] = useState<string>("Front Office Department");
  const [divisi, setDivisi] = useState<string>("semua");

  
  const dataDepartemen = {
    "Front Office Department": ["Receptionist", "Reservation Staff"],
    "Housekeeping Department": ["Room Attendant", "Laundry Staff"],
    "Food & Beverage Department": ["Waiter/Waitress", "Kitchen Staff"],
    "Accounting & Administration Department": ["Finance Staff", "HR Staff"],
  };

  const divisiList = dataDepartemen[departemen as keyof typeof dataDepartemen];

  return (
    <Card className="rounded-lg md:rounded-2xl border border-slate-200 shadow-sm bg-white p-4 md:p-6 px-5 md:px-7 flex flex-col gap-3 md:gap-5">
      {/* === HEADER TITLE === */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-xl font-semibold text-slate-800">
            Absensi Departemen
          </h1>
          <div className="flex items-center mt-1 text-sm text-slate-500">
            <Building2 className="w-4 h-4 mr-2 text-slate-400" />
            <span className="font-medium text-slate-700 ml-1 truncate">
              {departemen}
            </span>
          </div>
        </div>

        {/* === FILTER SECTION === */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Filter Departemen */}
          <Select
            value={departemen}
            onValueChange={(val) => {
              setDepartemen(val);
              setDivisi("semua");
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px] md:w-[250px] h-9 text-sm border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:ring-1 focus:ring-slate-300">
              <SelectValue placeholder="Pilih Departemen" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-200 shadow-md rounded-xl max-h-[300px] overflow-y-auto">
              {Object.keys(dataDepartemen).map((dept) => (
                <SelectItem
                  key={dept}
                  value={dept}
                  className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-800 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-800"
                >
                  <span className="truncate">{dept}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter Divisi */}
          <Select value={divisi} onValueChange={setDivisi}>
            <SelectTrigger className="w-full sm:w-[150px] md:w-[200px] h-9 text-sm border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:ring-1 focus:ring-slate-300">
              <SelectValue placeholder="Pilih Divisi" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-200 shadow-md rounded-xl max-h-[300px] overflow-y-auto">
              <SelectItem
                value="semua"
                className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-800 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-800"
              >
                Semua Divisi
              </SelectItem>
              {divisiList.map((div) => (
                <SelectItem
                  key={div}
                  value={div}
                  className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-800 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-800"
                >
                  {div}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter Tanggal */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-9 border-slate-300 bg-slate-50 hover:bg-slate-50 text-sm text-slate-700! flex items-center gap-2 focus:ring-1 focus:ring-slate-300 justify-start sm:justify-center"
              >
                <CalendarDays className="w-4 h-4 text-slate-500!" />
                <span className="truncate text-left">
                  {date
                    ? date.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Pilih Tanggal"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white shadow-md border border-slate-200 rounded-xl">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Tombol Terapkan */}
          <Button
            variant="default"
            className="w-full sm:w-auto h-9 px-3 bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2 shadow-sm rounded-lg justify-center"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Terapkan</span>
            <span className="sm:hidden">Filter</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}