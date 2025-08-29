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
import { ListFilter, ShieldQuestionMark, Unlink2 } from "lucide-react";

const FilterSection = () => {
  return (
    <nav className="mt-4 mb-6 flex justify-between">
      <div className="hidden md:flex gap-3">
        <Button variant={"outline"}>
          <ShieldQuestionMark />
          Bài học
        </Button>
        <Button variant={"outline"}>
          <Unlink2 /> Bài kiểm tra
        </Button>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lượt đánh giá" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="light">Từ 4.5 sao trở lên</SelectItem>
            <SelectItem value="dark">Từ 4.0 sao trở lên</SelectItem>
            <SelectItem value="system">Từ 3.5 sao trở lên</SelectItem>
            <SelectItem value="system">Từ 3.0 sao trở lên</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Độ khó" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="light">Tất cả</SelectItem>
            <SelectItem value="dark">Dễ</SelectItem>
            <SelectItem value="system">Trung bình</SelectItem>
            <SelectItem value="system">Khó</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex">
              <ListFilter className="mr-1" /> Tất cả bộ lọc
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Bộ lọc</SheetTitle>
              <SheetDescription>
                Chọn điều kiện lọc mà bạn muốn
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Name</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Lọc theo" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="new">Mới nhất</SelectItem>
          <SelectItem value="low">Giá thấp đến cao</SelectItem>
          <SelectItem value="high">Giá cao đến thấp</SelectItem>
          <SelectItem value="sell">Lượt mua nhiều nhất</SelectItem>
        </SelectContent>
      </Select>
    </nav>
  );
};

export default FilterSection;
