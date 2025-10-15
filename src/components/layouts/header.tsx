'use client';

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Menu,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";

import { useOnClickOutside } from "@/hooks/useOnclickOutside";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import CartComponent from "@/components/shared/CartComponent"; 
import AuthComponent from "@/components/shared/AuthComponent"; 
import SearchComponent from "@/components/shared/SearchComponent";
import Link from "next/link";
import { Grade } from "@/types/schema/grade.schema";
import { GradeService } from "@/services/grade.service";

interface NavigationItem {
    label: string;
    id: string;
}

const subjects = [
    { name: "Toán" }, { name: "Lý" }, { name: "Hóa" }, { name: "Văn" }, { name: "Anh" },
];
const testItems = [
    { name: "Đề thi Toán" }, { name: "Đề thi Lý" }, { name: "Đề thi Hóa" }, { name: "Đề thi Văn" }, { name: "Đề thi Anh" },
];

interface DropdownContentProps {
    hiddenItems: NavigationItem[];
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
    // Navigation states
    const [grades, setGrades] = useState<Grade[]>([]);
    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
    const [visibleItems, setVisibleItems] = useState<NavigationItem[]>([]);
    const [hiddenItems, setHiddenItems] = useState<NavigationItem[]>([]);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [showStickyHeader, setShowStickyHeader] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    const isScrolled = useScrollPosition(100);

    // Fetch grades and transform to navigation items
    const fetchGrades = useCallback(async () => {
        try {
            const data = await GradeService.getGrades();
            setGrades(data.grades || []);
            
            // Transform grades to navigation items
            const navItems: NavigationItem[] = data.grades?.map((grade: Grade) => ({
                label: grade.gradeName,
                id: grade.slug || grade._id, // Use slug if available, fallback to _id
            })) || [];
            
            setNavigationItems(navItems);
        } catch (error) {
            console.error("fetchGrades error:", error);
            setGrades([]);
            setNavigationItems([]);
        }
    }, []);

    // Initial load - fetch grades
    useEffect(() => {
        fetchGrades();
    }, [fetchGrades]);

    useOnClickOutside(headerRef, () => {
        setActiveDropdown(null);
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
            const visible: NavigationItem[] = [];
            const hidden: NavigationItem[] = [];
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
    }, [isScrolled, navigationItems]);

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
                                        <SearchComponent
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
                                    <SearchComponent
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
                                <SearchComponent
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