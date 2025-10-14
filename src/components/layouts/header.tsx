'use client';

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Mic,
  Search,
  Menu,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useOnClickOutside } from "@/hooks/useOnclickOutside";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import CartComponent from "@/components/shared/CartComponent"; 
import AuthComponent from "@/components/shared/AuthComponent"; 
import Link from "next/link";

const navigationItems = [
    { label: "Tiểu học", id: "tieu-hoc" }, { label: "THPT", id: "thpt" },
    { label: "THCS", id: "thcs" }, { label: "ĐGNL", id: "dgnl" },
    { label: "Luyện đề", id: "luyen-de" }, { label: "Thi thử", id: "thi-thu" },
    { label: "Trắc nghiệm", id: "trac-nghiem" }, { label: "Tài liệu", id: "tai-lieu" },
    { label: "Lớp 1", id: "lop1" }, { label: "Lớp 2", id: "lop2" },
    { label: "Lớp 3", id: "lop3" }, { label: "Lớp 4", id: "lop4" },
    { label: "Lớp 5", id: "lop5" }, { label: "Lớp 6", id: "lop6" },
    { label: "Lớp 7", id: "lop7" }, { label: "Lớp 8", id: "lop8" },
];
const subjects = [
    { name: "Toán" }, { name: "Lý" }, { name: "Hóa" }, { name: "Văn" }, { name: "Anh" },
];
const testItems = [
    { name: "Đề thi Toán" }, { name: "Đề thi Lý" }, { name: "Đề thi Hóa" }, { name: "Đề thi Văn" }, { name: "Đề thi Anh" },
];

interface SearchBarProps {
    isSearchActive: boolean;
    onSearchFocus: () => void;
    onSearchBlur: () => void;
    variant: "sticky" | "normal";
    activeDropdown?: string | null;
}
const SearchBar: React.FC<SearchBarProps> = ({
    isSearchActive,
    onSearchFocus,
    onSearchBlur,
    variant,
    activeDropdown,
}) => {
    const stickyClasses = "flex-1 h-[48px] px-4";
    const normalClasses = `w-[70%] h-[48px] px-5 transition-opacity duration-300 ${
        activeDropdown ? "opacity-0 invisible" : "opacity-100 visible"
    }`;

    return (
        <div
            className={`flex items-center justify-between py-0 bg-[#383838] rounded-[50px] border-2 transition-colors ${
                isSearchActive
                ? "border-white"
                : "border-transparent hover:border-zinc-600"
            } ${variant === "sticky" ? stickyClasses : normalClasses}`}
        >
            <div className="flex items-center gap-[33px] flex-1 min-w-0">
                <Button variant="ghost" className="h-auto gap-[9px] px-0 hover:bg-transparent hidden sm:inline-flex">
                    <span className="font-normal text-[#ffffff] text-sm">Tất cả</span>
                    <ChevronDown className="w-2.5 h-2.5 text-[#ffffff]" />
                </Button>
                <div className="w-px h-6 bg-zinc-600 hidden sm:block" />
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Search className="w-4 h-4 text-[#ffffff] flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học, tài liệu,..."
                        className="w-full h-full bg-transparent text-sm text-white placeholder:text-[#cccccc] focus:outline-none"
                        onFocus={onSearchFocus}
                        onBlur={onSearchBlur}
                    />
                </div>
            </div>
            <Button variant="ghost" size="icon" className="w-6 h-6 p-0 hover:bg-transparent">
                <Mic className="w-6 h-6 text-[#ffffff]" />
            </Button>
        </div>
    );
};

interface DropdownContentProps {
    hiddenItems: typeof navigationItems;
    activeId: string;
}
const DropdownContent = ({ hiddenItems, activeId }: DropdownContentProps) => {
    if (activeId === "more") {
        return (
            <div className="py-2 min-w-[200px] mx-auto">
            {hiddenItems.map((item) => (
                <button key={item.id} className="w-full px-4 py-2 text-left hover:bg-[#333] transition-colors">
                    <span className="font-normal text-white text-sm">{item.label}</span>
                </button>
            ))}
            </div>
        );
    }
    // Dựa trên code bạn cung cấp, ta có thể rút gọn
    const gradeMap = {
        "tieu-hoc": ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"],
        "thcs": ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
        "thpt": ["Lớp 10", "Lớp 11", "Lớp 12"],
    };
    const grades = gradeMap[activeId as keyof typeof gradeMap] || [];
    
    if (grades.length > 0) {
        return (
            <div className="w-full">
                <div className="flex w-full max-w-5xl mx-auto px-10 py-6">
                    <div className="w-1/2 pr-8">
                        <h3 className="text-[#ffa500] font-medium text-lg mb-4">Lớp học</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {grades.map((grade) => (
                                <button key={grade} className="text-left px-3 py-2 text-[#cccccc] hover:text-white hover:bg-[#333] rounded transition-colors">{grade}</button>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2 pl-8">
                        <h3 className="text-[#ffa500] font-medium text-lg mb-4">Môn học</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {subjects.map((subject) => (
                                <button key={subject.name} className="text-left px-3 py-2 text-[#cccccc] hover:text-white hover:bg-[#333] rounded transition-colors">{subject.name}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (activeId === 'thi-thu' || activeId === 'luyen-de') {
        return (
            <div className="w-full">
                <div className="flex w-full max-w-5xl mx-auto px-10 py-6">
                    <div className="w-full">
                        <h3 className="text-[#ffa500] font-medium text-lg mb-4">Đề thi và luyện tập</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {testItems.map((test) => (
                                <button key={test.name} className="text-left px-4 py-3 text-[#cccccc] hover:text-white hover:bg-[#333] rounded transition-colors">{test.name}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    // Fallback cho các trường hợp còn lại
    return (
        <div className="w-full">
            <div className="flex w-full max-w-5xl mx-auto px-10 py-6">
                <div className="w-full text-center">
                    <p className="text-[#cccccc]">Nội dung đang được cập nhật...</p>
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    const [visibleItems, setVisibleItems] = useState<typeof navigationItems>([]);
    const [hiddenItems, setHiddenItems] = useState<typeof navigationItems>([]);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [showStickyHeader, setShowStickyHeader] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    const isScrolled = useScrollPosition(100);

    useOnClickOutside(headerRef, () => {
        setActiveDropdown(null);
        setIsSearchActive(false);
    });
    
    useEffect(() => {
        if (isScrolled) {
            setShowStickyHeader(true);
        } else {
            setShowStickyHeader(false);
        }
    }, [isScrolled]);

    useEffect(() => {
        if (isScrolled) return;
        const calculateVisibleItems = () => {
            if (!navRef.current || !headerRef.current) return;
            const rightSection = headerRef.current.querySelector(".right-section") as HTMLElement;
            if (!rightSection) return;
            const containerRect = headerRef.current.getBoundingClientRect();
            const rightSectionRect = rightSection.getBoundingClientRect();
            const navStartX = navRef.current.getBoundingClientRect().left - containerRect.left;
            const availableWidth = rightSectionRect.left - navStartX - 20;

            let currentWidth = 0;
            const visible: typeof navigationItems = [];
            const hidden: typeof navigationItems = [];
            const moreButtonWidth = 80;

            for (let i = 0; i < navigationItems.length; i++) {
                const item = navigationItems[i];
                const itemWidth = item.label.length * 9 + 70;
                const needsMoreButton = navigationItems.length - (i + 1) > 0;
                const requiredWidth = currentWidth + itemWidth + (needsMoreButton ? moreButtonWidth : 0);
                if (requiredWidth <= availableWidth) {
                    visible.push(item);
                    currentWidth += itemWidth;
                } else {
                    hidden.push(...navigationItems.slice(i));
                    break;
                }
            }
            setVisibleItems(visible);
            setHiddenItems(hidden);
        };

        calculateVisibleItems();
        window.addEventListener("resize", calculateVisibleItems);
        return () => window.removeEventListener("resize", calculateVisibleItems);
    }, [isScrolled]);

    const handleNavClick = (id: string) => {
        if (isScrolled) return;
        setActiveDropdown((prev) => (prev === id ? null : id));
    };

    const isOverlayVisible = activeDropdown !== null;
    const headerHeight = isScrolled ? 60 : 100;

    return (
        <>
            <div className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOverlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

            {isScrolled && <div style={{ height: `${headerHeight}px` }} />}

            <div
                ref={headerRef}
                className={`w-full bg-[#191919] z-50 transition-transform duration-300 ease-in-out ${
                    isScrolled ? "fixed top-0 left-0 shadow-lg" : "relative"
                } ${showStickyHeader ? 'translate-y-0' : isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <div className="flex w-full flex-col items-center px-4 sm:px-[35px]">
                    <div className="w-full max-w-[2400px]">
                        <header className="flex h-[60px] items-center w-full gap-x-10">
                            <div className="flex items-center gap-[7px] flex-shrink-0">
                                <Link href="/">
                                    <Image alt="Wishzy logo" src="/logo/logo_white.png" width={100} height={45} />
                                </Link>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="hidden xl:flex items-center h-full">
                                    {isScrolled ? (
                                        <SearchBar
                                            isSearchActive={isSearchActive}
                                            onSearchFocus={() => setIsSearchActive(true)}
                                            onSearchBlur={() => setIsSearchActive(false)}
                                            variant="sticky"
                                        />
                                    ) : (
                                        <nav className="flex items-center gap-[20px] h-full" ref={navRef}>
                                            {visibleItems.map((item) => (
                                                <div key={item.id} className="relative h-full flex items-center group mt-2">
                                                    <Button variant="ghost" className={`h-full gap-[5px] px-2 rounded-none hover:bg-transparent whitespace-nowrap border-b-2 transition-colors duration-300 ${activeDropdown === item.id ? "border-[#ffa500]" : "border-transparent"}`} onClick={() => handleNavClick(item.id)}>
                                                        <span className="font-normal text-[#cccccc] text-sm tracking-[0] leading-[21px] transition-colors group-hover:text-white">{item.label}</span>
                                                        <ChevronDown className={`w-3 h-3 text-[#cccccc] transition-transform duration-300 group-hover:text-white ${activeDropdown === item.id ? "rotate-180" : "rotate-0"}`} />
                                                    </Button>
                                                </div>
                                            ))}
                                            {hiddenItems.length > 0 && (
                                                <div className="relative h-full flex items-center group">
                                                    <Button variant="ghost" className={`h-full gap-[5px] px-2 rounded-none hover:bg-transparent border-b-2 transition-colors duration-300 mt-2 ${activeDropdown === "more" ? "border-[#ffa500]" : "border-transparent"}`} onClick={() => handleNavClick("more")}>
                                                        <span className="font-normal text-[#cccccc] text-sm tracking-[0] leading-[21px] transition-colors group-hover:text-white ">Khác</span>
                                                        <ChevronDown className={`w-3 h-3 text-[#cccccc] transition-transform duration-300 group-hover:text-white ${activeDropdown === "more" ? "rotate-180" : "rotate-0"}`} />
                                                    </Button>
                                                </div>
                                            )}
                                        </nav>
                                    )}
                                </div>
                                
                                {/* Mobile & Tablet (< 1280px) */}
                                <div className="xl:hidden flex-1 flex justify-center">
                                    <SearchBar
                                        isSearchActive={isSearchActive}
                                        onSearchFocus={() => setIsSearchActive(true)}
                                        onSearchBlur={() => setIsSearchActive(false)}
                                        variant="sticky"
                                    />
                                </div>
                            </div>
                            
                            <div className="inline-flex items-center gap-5 flex-shrink-0 right-section">
                                <div className="hidden xl:flex items-center gap-5">
                                    {!isScrolled && (
                                        <Button variant="ghost" className="h-10 px-0 rounded-[15px] hover:bg-transparent hover:text-white transition-colors">
                                            <span className="font-normal text-[#cccccc] text-sm leading-[21px]">Chính sách</span>
                                        </Button>
                                    )}
                                    <div className="flex items-center gap-[13px]">
                                        <CartComponent />
                                        <AuthComponent />
                                    </div>
                                    <Button className="w-[200px] h-10 px-[11px] py-0 bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-black text-base leading-6 transition-colors">
                                        Khám phá khóa học
                                    </Button>
                                </div>

                                <div className="xl:hidden flex items-center">
                                    <Button variant="ghost" size="icon" className="w-9 h-9 p-0 rounded-full hover:bg-[#333] transition-colors">
                                        <Menu className="w-5 h-5 text-[#cccccc]" />
                                    </Button>
                                </div>
                            </div>
                        </header>

                        {!isScrolled && (
                            <div className="hidden xl:flex w-full pb-2.5">
                                <SearchBar
                                    isSearchActive={isSearchActive}
                                    onSearchFocus={() => setIsSearchActive(true)}
                                    onSearchBlur={() => setIsSearchActive(false)}
                                    variant="normal"
                                    activeDropdown={activeDropdown}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {!isScrolled && (
                    <div className={`absolute top-[60px] left-0 w-full bg-[#191919] rounded-b-2xl border-t border-zinc-700 transition-all duration-200 ease-in-out hidden xl:block ${
                        activeDropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
                    }`}>
                        {activeDropdown && (
                            <DropdownContent hiddenItems={hiddenItems} activeId={activeDropdown} />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;