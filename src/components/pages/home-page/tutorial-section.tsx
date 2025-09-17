import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TutorialSection = () => {
  const steps = [
    {
      number: "01",
      title: "Đăng ký tài khoản",
      description:
        "Bắt đầu hành trình học tập của bạn bằng cách đăng ký một tài khoản miễn phí.",
    },
    {
      number: "02",
      title: "Chọn khóa học",
      description:
        "Duyệt hàng trăm khóa học theo lĩnh vực, trình độ và mục tiêu nghề nghiệp.",
    },
    {
      number: "03",
      title: "Bắt đầu học tập",
      description:
        "Xem bài giảng, kiểm tra kiến thức với tài liệu chất lượng, trên mọi thiết bị.",
    },
    {
      number: "04",
      title: "Nhận chứng chỉ",
      description:
        "Kết thúc khóa học và nhận chứng chỉ từ Wishzy để phát triển kỹ năng.",
    },
  ];

  return (
    <section className="flex flex-col w-full items-center justify-center gap-6 py-12 px-4">
      <h2 className="font-semibold text-2xl md:text-3xl text-center">
        Học tập dễ dàng tại Wishzy
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="flex flex-col items-start gap-6 px-6 py-8 bg-[#f2f5fa] border-none shadow-none rounded-xl"
          >
            <CardContent className="p-0 flex flex-col gap-6 w-full">
              <div className="flex items-center justify-center w-20 h-20 bg-[#ffd7b0] rounded-full text-2xl font-bold text-white">
                {step.number}
              </div>

              <h3 className="font-bold text-lg">{step.title}</h3>

              <p className="text-base italic">{step.description}</p>

              <a
                href="#"
                className="text-base font-medium underline hover:no-underline"
              >
                Tìm hiểu thêm
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TutorialSection;
