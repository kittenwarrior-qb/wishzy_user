"use client";

import { useState } from "react";
import { CreditCard, Smartphone, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Payment {
  date: string;
  description: string;
  amount: number;
  status: string;
  method: string;
}

export default function ProfilePayments() {
  const payments: Payment[] = [
    { date: "2025-08-01", description: "React Basics Course", amount: 490000, status: "Đã thanh toán", method: "Thẻ tín dụng" },
    { date: "2025-07-15", description: "JavaScript Advanced", amount: 590000, status: "Đã thanh toán", method: "Momo" },
    { date: "2025-06-20", description: "Next.js Mastery", amount: 750000, status: "Đang xử lý", method: "Chuyển khoản" },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Thẻ tín dụng":
        return <CreditCard size={18} className="text-blue-600" />;
      case "Momo":
        return <Smartphone size={18} className="text-purple-600" />;
      case "Chuyển khoản":
        return <CreditCard size={18} className="text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Đã thanh toán") {
      return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">Đã thanh toán</span>;
    } else if (status === "Đang xử lý") {
      return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">Đang xử lý</span>;
    } else {
      return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold">{status}</span>;
    }
  };

  const openModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Thanh toán</h1>
      <p >Xem lịch sử giao dịch, phương thức thanh toán và hóa đơn của bạn.</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] shadow-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 uppercase text-sm tracking-wider">
            <tr>
              <th className="p-3 text-left">Ngày</th>
              <th className="p-3 text-left">Khóa học</th>
              <th className="p-3 text-left">Số tiền</th>
              <th className="p-3 text-left">Hình thức</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Hóa đơn</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {payments.map((payment, idx) => (
              <tr key={idx} className="hover:bg-amber-50 transition-colors">
                <td className="p-3">{payment.date}</td>
                <td className="p-3 font-medium">{payment.description}</td>
                <td className="p-3 font-semibold ">
                  {payment.amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </td>
                <td className="p-3 flex items-center gap-2">
                  {getMethodIcon(payment.method)}
                  <span>{payment.method}</span>
                </td>
                <td className="p-3">{getStatusBadge(payment.status)}</td>
                <td className="p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-blue-50"
                    onClick={() => openModal(payment)}
                  >
                    <FileText size={16} /> Xem
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-11/12 md:w-2/3 p-6 relative shadow-xl border-2 border-blue-200">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hóa đơn chi tiết</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p><strong>Khóa học:</strong> {selectedPayment.description}</p>
                <p><strong>Ngày:</strong> {selectedPayment.date}</p>
                <p><strong>Số tiền:</strong> {selectedPayment.amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
              </div>
              <div className="space-y-2">
                <p><strong>Hình thức thanh toán:</strong> {selectedPayment.method}</p>
                <p><strong>Trạng thái:</strong> {selectedPayment.status}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="default" onClick={closeModal}>Đóng</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
