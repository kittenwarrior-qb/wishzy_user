"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { gsap } from "gsap";
import { Grade } from "@/types/schema/grade.schema";
import { Subject } from "@/types/schema/subject.schema";
import { GradeService } from "@/services/grade.service";
import { SubjectService } from "@/services/subject.service";

interface DiscoverDropdownProps {
  children: React.ReactNode;
}

export const DiscoverDropdown = ({ children }: DiscoverDropdownProps) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch grades on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GradeService.getGrades();
        setGrades(data?.grades || []);
      } catch (error) {
        console.error("Error loading grades:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch subjects when hovering over a grade
  useEffect(() => {
    if (hoveredGrade) {
      const fetchSubjects = async () => {
        try {
          const data = await SubjectService.getSubjectsByGrade(hoveredGrade);
          setSubjects(data?.subjects || []);
        } catch (error) {
          console.error("Error loading subjects:", error);
          setSubjects([]);
        }
      };
      fetchSubjects();
    } else {
      setSubjects([]);
    }
  }, [hoveredGrade]);

  useEffect(() => {
    if (dropdownRef.current && isOpen) {
      gsap.fromTo(
        dropdownRef.current,
        {
          opacity: 0,
          y: -10,
          scale: 0.98,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredGrade(null);
    }, 200);
  }, []);

  const handleGradeHover = (gradeId: string) => {
    setHoveredGrade(gradeId);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {children}

      {/* Dropdown Content */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-[600px] mt-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          style={{ opacity: 0 }}
        >
          <div className="flex">
            {/* Left side - Grades */}
            <div className="w-1/2 border-r border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-[14px] p-3 mt-2 text-gray-500">
                Lớp học
              </p>
              <div className="">
                {grades.map((grade) => (
                  <div
                    key={grade._id}
                    onMouseEnter={() => handleGradeHover(grade._id)}
                    className={`flex items-center justify-between p-3 transition-all duration-200 cursor-pointer text-[14px] ${
                      hoveredGrade === grade._id
                        ? "bg-[#ffe5d6] text-[#f76d1d]"
                        : "text-base-content hover:text-[#f76d1d] hover:bg-[#ffe5d6]"
                    }`}
                  >
                    <Link
                      href={`/courses?gradeId=${grade._id}`}
                      className="flex items-center gap-2 flex-1"
                    >
                      <span>{grade.gradeName}</span>
                    </Link>
                    <ChevronRight size={12} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Subjects */}
            <div className="w-1/2">
              {hoveredGrade && subjects.length > 0 ? (
                <>
                  <h3 className="font-semibold text-sm p-3 mt-2 text-gray-500">
                    Môn học
                  </h3>
                  <div className="">
                    {subjects.map((subject) => (
                      <Link
                        key={subject._id}
                        href={`/courses?subjectId=${subject._id}`}
                        className="flex items-center justify-between p-3 text-base-content hover:text-[#f76d1d] hover:bg-[#ffe5d6] transition-all duration-200 group text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span>{subject.subjectName}</span>
                        </div>
                        <ChevronRight
                          size={12}
                          className="text-muted-foreground"
                        />
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="">
                  <h3 className="font-semibold text-sm p-3 mt-2 text-gray-500">
                    Môn học
                  </h3>
                  <p className="text-sm text-muted-foreground p-3">
                    Không có môn học nào
                  </p>
                </div>
              )}
            </div>
          </div>

          {grades.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Khám phá khóa học</h3>
              <p className="text-muted-foreground text-sm">
                Đang tải danh sách lớp học...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
