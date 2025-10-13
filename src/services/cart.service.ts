const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Helper: build API base that works whether NEXT_PUBLIC_API_URL includes '/api' or not
const getApiBase = () => {
  const base = (apiUrl || '').replace(/\/+$/, '');
  if (!base) {
    throw new Error(
      'Thiếu biến môi trường NEXT_PUBLIC_API_URL. Hãy tạo .env.local và đặt NEXT_PUBLIC_API_URL=http://localhost:8000 (có thể kèm /api) rồi khởi động lại dev server.',
    );
  }
  // Nếu base đã kết thúc bằng '/api' thì dùng luôn, nếu không thì thêm '/api'
  return /\/api$/i.test(base) ? base : `${base}/api`;
};

const buildUrl = (path: string, qs?: string) => {
  const apiBase = getApiBase();
  const safePath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBase}${safePath}${qs ? `?${qs}` : ''}`;
};

// Types for Cart Service
export interface Course {
  _id: string;
  courseName: string;
  price: number;
  thumbnail: string;
  slug: string;
  level: string;
  numberOfStudents: number;
  totalDuration: number;
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  subject: {
    _id: string;
    subjectName: string;
    slug: string;
  };
  grade: {
    _id: string;
    gradeName: string;
  };
}

export interface ApiResponse<T> {
  msg: string;
  data?: T;
  courses?: T;
  course?: T;
}

export type GetCourseListParams = {
  page?: number;
  limit?: number;
  courseName?: string;
  minPrice?: number;
  maxPrice?: number;
};

// Cart Service following team convention
export const CartService = {
  // Lấy tất cả khóa học cho cart
  getCourseList: async (params?: GetCourseListParams): Promise<ApiResponse<Course[]>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.courseName) searchParams.append('courseName', params.courseName);
    if (params?.minPrice) searchParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());

    const url = buildUrl('/course', searchParams.toString());
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Failed to fetch courses (${response.status}): ${text}`);
    }
    
    return response.json();
  },

  // Lấy chi tiết khóa học theo slug
  getCourseBySlug: async (slug: string): Promise<ApiResponse<Course>> => {
    const response = await fetch(buildUrl(`/course/${slug}`), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Failed to fetch course details (${response.status}): ${text}`);
    }
    
    return response.json();
  },

  // Lấy khóa học hot
  getHotCourses: async (): Promise<ApiResponse<Course[]>> => {
    const response = await fetch(buildUrl('/course/hot-course'), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Failed to fetch hot courses (${response.status}): ${text}`);
    }
    
    return response.json();
  },
};
