"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import CourseListCard from "@/components/shared/course-list-card";
import { CourseService, GetCourseListParams } from "@/services/course.service";
import { GradeService } from "@/services/grade.service";
import { SubjectService } from "@/services/subject.service";
import { CourseList } from "@/types/schema/course.schema";
import { Grade } from "@/types/schema/grade.schema";
import { Subject } from "@/types/schema/subject.schema";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Filter } from "lucide-react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = (pathname?.split('/')?.[1] || 'vi');
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingAllSubjects, setLoadingAllSubjects] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'popular'>('newest');

  const initialSearchTerm = searchParams.get('q') || '';
  const gradeParam = searchParams.get('grade') || '';
  const searchMode = gradeParam ? 'grade' : 'all';

  const fetchCourses = useCallback(async (params: GetCourseListParams) => {
    try {
      setLoading(true);
      setError(null);

      const response = await CourseService.getCourseList(params);

      if (response.courses) {
        setCourses(response.courses || []);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
          setCurrentPage(response.pagination.currentPage);
          setTotalItems(response.pagination.totalItems);
        }
      } else {
        setError("Không thể tải danh sách khóa học");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const buildQueryParams = useCallback(() => {
    const params: GetCourseListParams = {
      page: currentPage,
      limit: 12,
    };

    // Add sortBy parameter
    if (sortBy) {
      params.sortBy = sortBy;
    }

    // Add courseName filter
    if (courseName && courseName.trim()) {
      params.courseName = courseName.trim();
    }

    // Process price ranges - merge multiple ranges into min/max
    if (selectedPriceRanges.length > 0) {
      let minPrice: number | undefined;
      let maxPrice: number | undefined;
      let hasFree = false;
      
      selectedPriceRanges.forEach(priceRange => {
        if (priceRange === 'free') {
          hasFree = true;
        } else if (priceRange.includes('-')) {
          const [minStr, maxStr] = priceRange.split('-');
          // Parse and convert to VND (thousands)
          // e.g., "0-99" means 0 to 99,000 VND, "100-199" means 100,000 to 199,000 VND
          const min = parseInt(minStr.replace(/\./g, ''), 10) * 1000;
          const max = parseInt(maxStr.replace(/\./g, ''), 10) * 1000;
          
          if (!isNaN(min) && !isNaN(max)) {
            minPrice = minPrice === undefined ? min : Math.min(minPrice, min);
            maxPrice = maxPrice === undefined ? max : Math.max(maxPrice || 0, max);
          }
        }
      });
      
      // If free is selected alone, set price to 0
      // If free is selected with other ranges, include free in the range (start from 0)
      if (hasFree) {
        if (minPrice === undefined) {
          // Only free selected
          params.minPrice = 0;
          params.maxPrice = 0;
        } else {
          // Free + other ranges: expand range to include 0
          params.minPrice = 0;
          if (maxPrice !== undefined) {
            params.maxPrice = maxPrice;
          }
        }
      } else {
        // Only set price params if we have valid ranges
        if (minPrice !== undefined) {
          params.minPrice = minPrice;
        }
        if (maxPrice !== undefined && maxPrice > 0) {
          params.maxPrice = maxPrice;
        }
      }
    }

    // Add subjects filter (array will be properly handled by service)
    if (selectedSubjects.length > 0) {
      params.subjects = selectedSubjects;
    }

    // Add grade filter
    if (gradeParam && gradeParam.trim()) {
      params.grade = gradeParam.trim();
    }

    return params;
  }, [currentPage, courseName, selectedPriceRanges, sortBy, selectedSubjects, gradeParam]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const applyFilters = useCallback(() => {
    // Check if in grade mode and no subjects available
    if (searchMode === 'grade' && !loadingSubjects && subjects.length === 0) {
      setCourses([]);
      setLoading(false);
      setTotalItems(0);
      setTotalPages(1);
      setCurrentPage(1);
      return;
    }
    
    setCurrentPage(1);
    const params = buildQueryParams();
    fetchCourses({ ...params, page: 1 });
  }, [buildQueryParams, fetchCourses, searchMode, loadingSubjects, subjects.length]);

  // Initial fetch when component mounts or when grade/subjects are ready
  useEffect(() => {
    // Skip initial fetch if in grade mode and subjects are still loading or empty
    if (searchMode === 'grade') {
      if (loadingSubjects) {
        return; // Wait for subjects to load
      }
      if (subjects.length === 0) {
        // No subjects available, set empty state
        setCourses([]);
        setLoading(false);
        setTotalItems(0);
        setTotalPages(1);
        setCurrentPage(1);
        return;
      }
    }

    // Initial fetch with current params
    const params = buildQueryParams();
    fetchCourses({ ...params, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMode, loadingSubjects, subjects.length, grades.length]);

  // Auto-apply filters when they change (with debounce for courseName)
  useEffect(() => {
    // Skip if initial load hasn't happened yet
    if (searchMode === 'grade' && (loadingSubjects || subjects.length === 0)) {
      return;
    }

    const timer = setTimeout(() => {
      const params = buildQueryParams();
      fetchCourses({ ...params, page: 1 });
      setCurrentPage(1);
    }, courseName ? 500 : 0); // Debounce only for courseName changes
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseName, selectedSubjects, selectedPriceRanges, sortBy, searchMode, loadingSubjects, subjects.length]);

  // Apply filters when page changes (without resetting page)
  useEffect(() => {
    // Skip if this is initial load
    if (currentPage === 1) {
      return;
    }

    // Don't fetch if in grade mode and no subjects
    if (searchMode === 'grade' && subjects.length === 0) {
      return;
    }

    const params = buildQueryParams();
    fetchCourses(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchMode, subjects.length]);

  // Initialize with search term from URL
  useEffect(() => {
    if (initialSearchTerm) {
      setCourseName(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  // Fetch grades for navigation
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await GradeService.getGrades();
        if (response.grades) {
          setGrades(response.grades);
        }
      } catch (error) {
        console.error('Failed to fetch grades:', error);
      }
    };
    
    fetchGrades();
  }, []);

  useEffect(() => {
    const fetchAllSubjects = async () => {
      if (!gradeParam && grades.length > 0) {
        setLoadingAllSubjects(true);
        try {
          const response = await SubjectService.getSubjects({
            limit: 100,
            status: true
          });
          
          if (response.subjects) {
            setAllSubjects(response.subjects);
          }
        } catch (error) {
          console.error('Failed to fetch all subjects:', error);
        } finally {
          setLoadingAllSubjects(false);
        }
      } else {
        setAllSubjects([]);
      }
    };

    fetchAllSubjects();
  }, [gradeParam, grades.length]);

  // Fetch subjects based on selected grade
  useEffect(() => {
    const fetchSubjects = async () => {
      if (gradeParam && grades.length > 0) {
        setLoadingSubjects(true);
        setSubjects([]);
        setSelectedSubjects([]);
        // Clear courses immediately when switching grades
        setCourses([]);
        setLoading(true);
        
        try {
          const currentGrade = grades.find(g => g.gradeName === gradeParam || g._id === gradeParam);
          const gradeId = currentGrade?._id || gradeParam;
          
          const response = await SubjectService.getSubjects({
            grade: gradeId,
            limit: 100,
            status: true
          });
          
          if (response.subjects && response.subjects.length > 0) {
            setSubjects(response.subjects);
          } else {
            setSubjects([]);
            // If no subjects, immediately set empty course state
            setCourses([]);
            setLoading(false);
            setTotalItems(0);
            setTotalPages(1);
            setCurrentPage(1);
          }
        } catch (error) {
          console.error('Failed to fetch subjects for grade:', error);
          setSubjects([]);
          setCourses([]);
          setLoading(false);
          setTotalItems(0);
          setTotalPages(1);
          setCurrentPage(1);
        } finally {
          setLoadingSubjects(false);
        }
      } else if (!gradeParam) {
        setSubjects([]);
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [gradeParam, grades]);

  // Use only real subjects from API, no fallback data
  const displaySubjects = subjects.map(subject => ({ 
    id: subject._id, 
    label: subject.subjectName 
  }));

  const priceRanges = [
    { id: "free", label: "Miễn phí" },
    { id: "0-99", label: "0-99.000" },
    { id: "100-199", label: "100.000-199.000" },
    { id: "200-299", label: "200.000-299.000" },
    { id: "300-399", label: "300.000-399.000" },
  ];

  const clearFilters = () => {
    setCourseName('');
    setSelectedSubjects([]);
    setSelectedPriceRanges([]);
    setSortBy('newest');
    setCurrentPage(1);
  };


  const handlePriceRangeChange = (rangeId: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges(prev => [...prev, rangeId]); // Allow multiple price ranges
    } else {
      setSelectedPriceRanges(prev => prev.filter(id => id !== rangeId));
    }
  };

  const handleGradeFilter = (gradeNameOrId: string) => {
    // Update URL with grade filter using Next.js router
    const params = new URLSearchParams();
    if (courseName) {
      params.set('q', courseName);
    }
    if (gradeNameOrId) {
      params.set('grade', gradeNameOrId);
    }
    router.push(`/${locale}/search?${params.toString()}`);
  };

  const handleSubjectButtonClick = (subjectId: string) => {
    // Toggle subject in selectedSubjects
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(prev => prev.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects(prev => [...prev, subjectId]);
    }
  };

  return (
    <div className="min-h-[650px] py-8 px-4 xl:px-0">
      <div className="max-w-[2400px] mx-auto">
        <Breadcrumb className="mb-6 px-[35px]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {searchMode === 'grade' ? `${gradeParam}` : 'Tìm kiếm khóa học'}
            </BreadcrumbItem>
            {initialSearchTerm && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{initialSearchTerm}</BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search Bar */}
        <div className="mb-6 px-[35px]">
          <Input
            placeholder={searchMode === 'grade' ? `Tìm kiếm trong lớp ${gradeParam}...` : "Tìm kiếm khóa học..."}
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="max-w-md"
          />
        </div>

        {grades.length > 0 && (
          <div className="mb-6 px-[35px]">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/${locale}/search${courseName ? `?q=${encodeURIComponent(courseName)}` : ''}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !gradeParam
                    ? 'bg-[#FFF5ED] text-black '
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 '
                }`}
              >
                Tất cả lớp
              </Link>
              {grades.map((grade) => {
                const isActive = grade.gradeName === gradeParam || grade._id === gradeParam;
                return (
                  <Link
                    key={grade._id}
                    href={`/${locale}/search?grade=${encodeURIComponent(grade.gradeName)}${courseName ? `&q=${encodeURIComponent(courseName)}` : ''}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FFF5ED] text-black '
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 '
                    }`}
                  >
                    {grade.gradeName}
                  </Link>
                );
              })}
              
            </div>
          </div>
        )}

        <div className="flex items-center justify-between w-full mb-7 px-[35px]">
          <span
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-3 h-auto px-0 hover:bg-transparent cursor-pointer"
          >
            <Filter className="w-5 h-5 text-black" />
            <span className="font-semibold text-black text-base">
              {showFilters ? 'Ẩn lọc' : 'Hiện lọc'}
            </span>
          </span>

          <Select value={sortBy} onValueChange={(value: 'newest' | 'price_asc' | 'price_desc' | 'popular') => setSortBy(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="price_asc">Giá thấp đến cao</SelectItem>
              <SelectItem value="price_desc">Giá cao đến thấp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start gap-16 w-full">
          {showFilters && (
            <aside className="flex flex-col gap-6 flex-shrink-0 w-64 pl-[35px]">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <X className="w-5 h-5 cursor-pointer" onClick={clearFilters} />
                <span
                  className="font-medium text-black text-sm cursor-pointer"
                  onClick={clearFilters}
                >
                  Bỏ tất cả
                </span>
              </div>

              {/* Grade Filter Buttons */}
              {!gradeParam && grades.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium text-black text-sm">
                    Lớp học
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {grades.map((grade) => (
                      <button
                        key={grade._id}
                        onClick={() => handleGradeFilter(grade.gradeName)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          gradeParam === grade.gradeName || gradeParam === grade._id
                            ? 'bg-[#FFF5ED] text-black border border-orange-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                        }`}
                      >
                        {grade.gradeName}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Subject Filter */}
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-black text-sm">
                  Môn học {searchMode === 'grade' && `(${gradeParam})`}
                </h3>

                {searchMode === 'grade' ? (
                  // Grade mode: show subjects with buttons
                  loadingSubjects ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
                      Đang tải môn học...
                    </div>
                  ) : displaySubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {displaySubjects.map((subject) => (
                        <button
                          key={subject.id}
                          onClick={() => handleSubjectButtonClick(subject.id)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            selectedSubjects.includes(subject.id)
                              ? 'bg-[#FFF5ED] text-black border border-orange-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                          }`}
                        >
                          {subject.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Không có môn học nào trong lớp này
                    </p>
                  )
                ) : (
                  // All mode: show all subjects with buttons
                  loadingAllSubjects ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
                      Đang tải môn học...
                    </div>
                  ) : allSubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {allSubjects.map((subject) => (
                        <button
                          key={subject._id}
                          onClick={() => handleSubjectButtonClick(subject._id)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            selectedSubjects.includes(subject._id)
                              ? 'bg-[#FFF5ED] text-black border border-orange-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                          }`}
                        >
                          {subject.subjectName}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Không có môn học nào
                    </p>
                  )
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-black text-sm">
                  Giá
                </h3>

                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center gap-2">
                    <Checkbox
                      id={range.id}
                      checked={selectedPriceRanges.includes(range.id)}
                      onCheckedChange={(checked) => handlePriceRangeChange(range.id, checked as boolean)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={range.id}
                      className="text-black text-sm cursor-pointer"
                    >
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </aside>
          )}

          <main className="flex flex-col gap-8">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <span>Đang tải khóa học...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={applyFilters}>
                  Thử lại
                </Button>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {searchMode === 'grade' 
                    ? `Không có khóa học nào trong lớp ${gradeParam}`
                    : 'Không tìm thấy khóa học nào phù hợp'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="px-[35px]">
                  <p className="text-sm text-gray-600">
                    {searchMode === 'grade' 
                      ? `Tìm thấy ${totalItems} khóa học trong ${gradeParam} (trang ${currentPage}/${totalPages})`
                      : `Tìm thấy ${totalItems} khóa học (trang ${currentPage}/${totalPages})`
                    }
                  </p>
                </div>

                <CourseListCard courses={courses} loading={loading} showFilters={showFilters} />

                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 px-[35px]">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Trước
                    </Button>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Sau
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;