'use client'

import React from "react";

const Header = () => {
    return(
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Beauty salon chi nhánh 1</h1>
                    <div className="flex items-center mt-3">
                        <div className="flex text-yellow-400">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <span className="ml-2 text-gray-600">5.0 ★★★★ (927 đánh giá)</span>
                    </div>
                    <div className="flex items-center mt-4 text-gray-600">
                        <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                        <p>Số 5 đường Phan Đăng Lưu, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh</p>
                    </div>
                    <div className="flex mt-6 space-x-4">
                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center">
                            <i className="fas fa-directions mr-2"></i> Chỉ đường
                        </button>
                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center">
                            <i className="fas fa-phone mr-2"></i> Gọi điện
                        </button>
                        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center">
                            <i className="fas fa-share-alt mr-2"></i> Chia sẻ
                        </button>
                    </div>
                </div>
    );
}
export default Header;