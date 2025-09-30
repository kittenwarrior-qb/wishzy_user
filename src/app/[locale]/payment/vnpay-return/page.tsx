'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaymentService, VNPayVerifyResult } from '@/services/payment.service';

export default function VNPayReturnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useMemo(() => (pathname?.split('/')?.[1] || 'vi'), [pathname]);

  const [result, setResult] = useState<VNPayVerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(searchParams?.toString());
        const verify = await PaymentService.verifyReturn(params);
        setResult(verify);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGoMyCourses = () => router.push(`/${locale}/my-courses`);
  const onGoHome = () => router.push(`/${locale}`);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-xl p-8 text-center">
        {loading && (
          <>
            <div className="animate-pulse h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
            <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          </>
        )}

        {!loading && error && (
          <>
            <h1 className="text-2xl font-semibold text-red-600 mb-2">Xác thực thất bại</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={onGoHome}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Về trang chủ
            </button>
          </>
        )}

        {!loading && !error && result && (
          <>
            {result.isSuccess && result.vnp_ResponseCode === '00' ? (
              <>
                <h1 className="text-2xl font-semibold text-green-600 mb-2">Thanh toán thành công</h1>
                <p className="text-gray-600 mb-6">Bạn đã được ghi nhận thanh toán. Khóa học sẽ được mở khóa cho tài khoản của bạn.</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={onGoMyCourses}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Vào khóa học của tôi
                  </button>
                  <button
                    onClick={onGoHome}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
                  >
                    Về trang chủ
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold text-red-600 mb-2">Thanh toán thất bại</h1>
                <p className="text-gray-600 mb-6">{result.message || 'VNPay trả về trạng thái thất bại.'}</p>
                <button
                  onClick={onGoHome}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Về trang chủ
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
