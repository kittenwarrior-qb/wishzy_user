"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter, Search, X } from "lucide-react";
import { useState, useEffect } from "react";

export interface FilterParams {
  courseName?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  level?: string;
  sortBy?: "newest" | "price_asc" | "price_desc" | "popular";
  orderDate?: number;
}

interface FilterSectionProps {
  onFilterChange: (filters: FilterParams) => void;
  initialFilters?: FilterParams;
}

const FilterSection = ({
  onFilterChange,
  initialFilters = {},
}: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterParams>(initialFilters);
  const [searchTerm, setSearchTerm] = useState(initialFilters.courseName || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, courseName: searchTerm });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filters, onFilterChange]);

  const handleFilterChange = (
    key: keyof FilterParams,
    value: string | number | undefined
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    setSearchTerm("");
    onFilterChange(clearedFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Desktop Filters */}
      <nav className="flex flex-col md:flex-row justify-between gap-4">
        <div className="hidden md:flex gap-3 flex-wrap">
          <Select
            onValueChange={(value) =>
              handleFilterChange("rating", value ? Number(value) : undefined)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lượt đánh giá" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="4.5">Từ 4.5 sao trở lên</SelectItem>
              <SelectItem value="4.0">Từ 4.0 sao trở lên</SelectItem>
              <SelectItem value="3.5">Từ 3.5 sao trở lên</SelectItem>
              <SelectItem value="3.0">Từ 3.0 sao trở lên</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange("level", value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Độ khó" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Beginner">Dễ</SelectItem>
              <SelectItem value="Intermediate">Trung bình</SelectItem>
              <SelectItem value="Advanced">Khó</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Giá từ"
              className="w-24"
              onChange={(e) =>
                handleFilterChange(
                  "minPrice",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Đến"
              className="w-24"
              onChange={(e) =>
                handleFilterChange(
                  "maxPrice",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          <Button variant="outline" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Xóa bộ lọc
          </Button>
        </div>

        {/* Mobile Filter */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <ListFilter className="mr-2 w-4 h-4" /> Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Bộ lọc khóa học</SheetTitle>
                <SheetDescription>
                  Chọn điều kiện lọc phù hợp với bạn
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label>Đánh giá</Label>
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange(
                        "rating",
                        value ? Number(value) : undefined
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức đánh giá" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="4.5">Từ 4.5 sao trở lên</SelectItem>
                      <SelectItem value="4.0">Từ 4.0 sao trở lên</SelectItem>
                      <SelectItem value="3.5">Từ 3.5 sao trở lên</SelectItem>
                      <SelectItem value="3.0">Từ 3.0 sao trở lên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Độ khó</Label>
                  <Select
                    onValueChange={(value) =>
                      handleFilterChange("level", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn độ khó" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Beginner">Dễ</SelectItem>
                      <SelectItem value="Intermediate">Trung bình</SelectItem>
                      <SelectItem value="Advanced">Khó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Khoảng giá</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Từ"
                      onChange={(e) =>
                        handleFilterChange(
                          "minPrice",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Đến"
                      onChange={(e) =>
                        handleFilterChange(
                          "maxPrice",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
                <SheetClose asChild>
                  <Button>Áp dụng</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <Select onValueChange={(value) => handleFilterChange("sortBy", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="popular">Phổ biến nhất</SelectItem>
            <SelectItem value="price_asc">Giá thấp đến cao</SelectItem>
            <SelectItem value="price_desc">Giá cao đến thấp</SelectItem>
          </SelectContent>
        </Select>
      </nav>
    </div>
  );
};

export default FilterSection;
