import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { trucksAPI } from "../services/api";
import { toast } from "react-hot-toast";
import { Truck } from "lucide-react";
import Loader from "../components/Loader";

export default function MyTrucks() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchTrucks = async (page = 1) => {
    setLoading(true);
    try {
      const res = await trucksAPI.getMyTrucks({ page, limit: 12 });
      if (res.data.success) {
        setTrucks(res.data.data);
        setPagination(res.data.pagination);
      } else {
        toast.error("فشل تحميل الشاحنات");
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل الشاحنات.");
      toast.error("خطأ في جلب الشاحنات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* الهيدر العلوي */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Truck className="w-8 h-8 text-blue-600" />
            شاحناتي
          </h1>

          {/* عدّاد + لودر مصغّر أثناء التحميل */}
          <div className="flex items-center gap-4">
            {!loading && (
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow">
                إجمالي: {pagination.total}
              </span>
            )}
            {loading && <Loader />}
          </div>
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <div className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* الجدول */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم اللوحة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المقاول
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المصنع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم كارت المصنع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم كارت الجهاز
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      البوابة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ الإنشاء
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trucks.map((truck) => (
                    <tr key={truck._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="bg-blue-50 p-2 rounded-lg mr-3">
                            <Truck className="w-4 h-4 text-blue-600" />
                          </div> */}
                          <div className="text-sm font-medium text-gray-900">
                            {truck.plateNumber}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {truck.contractor?.name || truck.contractorId || "غير محدد"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {truck.factory?.name || truck.factoryId || "غير محدد"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {truck.factoryCardNumber || "غير متوفر"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {truck.deviceCardNumber || "غير متوفر"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {truck.gateId?.name || "غير محدد"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {truck.createdAt
                          ? new Date(truck.createdAt).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                          : "غير متوفر"
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* لا توجد بيانات */}
        {!loading && !error && trucks.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl shadow-lg mt-6">
            <div className="flex flex-col items-center gap-4">
              <Truck className="w-16 h-16 text-gray-300" />
              <p className="text-gray-600 text-lg">
                لا توجد شاحنات مسجلة حتى الآن.
              </p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={pagination.page === pagination.pages}
              onClick={() => fetchTrucks(pagination.page + 1)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              التالي
            </button>

            <span className="text-gray-700 font-medium">
              الصفحة {pagination.page} من {pagination.pages}
            </span>

            <button
              disabled={pagination.page === 1}
              onClick={() => fetchTrucks(pagination.page - 1)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              السابق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}