"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import FilterSection, { FilterParams } from "@/components/pages/search-page/filter-section";
import CourseCard from "@/components/shared/course-card";
import { CourseService, GetCourseListParams } from "@/services/course.service";
import { CourseList } from "@/types/schema/course.schema";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<FilterParams>({});

  // Get initial search term from URL
  const initialSearchTerm = searchParams.get('q') || '';

  const fetchCourses = useCallback(async (params: GetCourseListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await CourseService.getCourseList(params);
      
      if (response.courses) {
        setCourses(response.courses || []);
        // Backend trả về pagination object
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

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: FilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    const params: GetCourseListParams = {
      ...newFilters,
      page: 1,
      limit: 12,
    };
    
    fetchCourses(params);
  }, [fetchCourses]);

  // Handle pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    
    const params: GetCourseListParams = {
      ...filters,
      page,
      limit: 12,
    };
    
    fetchCourses(params);
  }, [filters, fetchCourses]);

  // Initial load
  useEffect(() => {
    const initialFilters: FilterParams = {
      courseName: initialSearchTerm,
    };
    
    setFilters(initialFilters);
    
    const params: GetCourseListParams = {
      ...initialFilters,
      page: 1,
      limit: 12,
    };
    
    fetchCourses(params);
  }, [initialSearchTerm, fetchCourses]);

  return (
    <div className="min-h-[650px] py-8 px-4 xl:px-0">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Tìm kiếm khóa học</BreadcrumbItem>
            {initialSearchTerm && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{initialSearchTerm}</BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <FilterSection 
          onFilterChange={handleFilterChange}
          initialFilters={{ courseName: initialSearchTerm }}
        />

        {/* Results */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Đang tải khóa học...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => fetchCourses({ page: 1, limit: 12 })}>
                Thử lại
              </Button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy khóa học nào phù hợp</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Tìm thấy {totalItems} khóa học (trang {currentPage}/{totalPages})
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default SearchPage;