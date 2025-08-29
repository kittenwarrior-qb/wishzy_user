import FilterSection from "@/components/pages/search-page/filter-section";
import CourseCard from "@/components/shared/course-card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CourseList } from "@/types/schema/course.schema";

const courses: CourseList[] = [
  {
    _id: "c1",
    courseName: "Lập trình JavaScript cơ bản",
    price: 499000,
    status: true,
    rating: 4.5,
    description:
      "Khóa học giúp bạn nắm vững các khái niệm cơ bản về JavaScript.",
    thumbnail: "",
    numberOfStudents: 250,
    level: "Beginner",
    totalDuration: 3600,
    subject: {
      subjectName: "Lập trình Web",
      slug: "lap-trinh-web",
    },
    grade: {
      gradeName: "Cơ bản",
    },
    createdBy: {
      email: "teacher1@example.com",
      fullName: "Nguyễn Văn A",
    },
    createdAt: "2024-08-20T10:30:00.000Z",
    updatedAt: "2024-08-22T12:00:00.000Z",
    slug: "lap-trinh-javascript-co-ban",
  },
  {
    _id: "c2",
    courseName: "Phân tích dữ liệu với Python",
    price: 799000,
    status: true,
    rating: 4.8,
    description:
      "Tìm hiểu cách sử dụng Python cho phân tích và trực quan hóa dữ liệu.",
    thumbnail: "",
    numberOfStudents: 180,
    level: "Intermediate",
    totalDuration: 5400,
    subject: {
      subjectName: "Khoa học dữ liệu",
      slug: "khoa-hoc-du-lieu",
    },
    grade: {
      gradeName: "Trung cấp",
    },
    createdBy: {
      email: "teacher2@example.com",
      fullName: "Trần Thị B",
    },
    createdAt: "2024-08-21T14:00:00.000Z",
    updatedAt: "2024-08-23T09:15:00.000Z",
    slug: "phan-tich-du-lieu-voi-python",
  },
  {
    _id: "c3",
    courseName: "Thiết kế giao diện với Figma",
    price: 399000,
    status: false,
    rating: 4.2,
    description: "Khóa học hướng dẫn sử dụng Figma để thiết kế UI/UX.",
    thumbnail: "",
    numberOfStudents: 90,
    level: "Beginner",
    totalDuration: 2700,
    subject: {
      subjectName: "Thiết kế",
      slug: "thiet-ke",
    },
    grade: {
      gradeName: "Cơ bản",
    },
    createdBy: {
      email: "designer@example.com",
      fullName: "Lê Văn C",
    },
    createdAt: "2024-08-22T08:45:00.000Z",
    updatedAt: "2024-08-23T10:00:00.000Z",
    slug: "thiet-ke-giao-dien-voi-figma",
  },
  {
    _id: "c4",
    courseName: "Thiết kế giao diện với Figma",
    price: 399000,
    status: false,
    rating: 4.2,
    description: "Khóa học hướng dẫn sử dụng Figma để thiết kế UI/UX.",
    thumbnail: "",
    numberOfStudents: 90,
    level: "Beginner",
    totalDuration: 2700,
    subject: {
      subjectName: "Thiết kế",
      slug: "thiet-ke",
    },
    grade: {
      gradeName: "Cơ bản",
    },
    createdBy: {
      email: "designer@example.com",
      fullName: "Lê Văn C",
    },
    createdAt: "2024-08-22T08:45:00.000Z",
    updatedAt: "2024-08-23T10:00:00.000Z",
    slug: "thiet-ke-giao-dien-voi-figma",
  },
];

const SearchPage = () => {
  return (
    <div className="min-h-[650px] py-8 px-4 xl:px-0">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Tìm kiếm sản phẩm</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Keyword</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <div>
            <FilterSection />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <div key={course._id} className="mx-auto">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
