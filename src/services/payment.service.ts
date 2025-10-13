const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getApiBase = () => {
  const base = (apiUrl || '').replace(/\/+$/, '');
  if (!base) {
    throw new Error(
      'Thiếu biến môi trường NEXT_PUBLIC_API_URL. Hãy tạo .env.local và đặt NEXT_PUBLIC_API_URL=http://localhost:8000 (có thể kèm /api) rồi khởi động lại dev server.',
    );
  }
  return /\/api$/i.test(base) ? base : `${base}/api`;
};

const buildUrl = (path: string, qs?: string) => {
  const apiBase = getApiBase();
  const safePath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBase}${safePath}${qs ? `?${qs}` : ''}`;
};

export interface VNPayVerifyResult {
  isSuccess: boolean;
  vnp_ResponseCode?: string;
  message?: string;
  [key: string]: unknown;
}

export const PaymentService = {
  createVNPayPayment: async (
    params: { courseId?: string; courseIds?: string[]; courseSlug?: string; orderInfo?: string },
    token: string,
  ) => {
    const url = buildUrl('/payment/create');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Tạo VNPay thất bại (${res.status}): ${text}`);
    }
    return res.json() as Promise<{ success: boolean; paymentUrl: string; orderId: string; txnRef: string }>;
  },

  verifyReturn: async (searchParams: URLSearchParams): Promise<VNPayVerifyResult> => {
    const url = buildUrl('/payment/verify', searchParams.toString());
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Xác thực VNPay trả về thất bại (${res.status}): ${text}`);
    }
    return res.json() as Promise<VNPayVerifyResult>;
  },
};
