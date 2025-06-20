import React from 'react';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

const services = [
  {
    title: 'Tư vấn chọn máy lọc nước',
    description:
      'Chúng tôi hỗ trợ bạn chọn lựa sản phẩm phù hợp với nhu cầu và nguồn nước tại nhà.',
    icon: '💧',
  },
  {
    title: 'Lắp đặt chuyên nghiệp',
    description:
      'Đội ngũ kỹ thuật viên giàu kinh nghiệm sẽ lắp đặt nhanh chóng và đúng kỹ thuật.',
    icon: '🔧',
  },
  {
    title: 'Bảo trì và bảo dưỡng',
    description:
      'Dịch vụ bảo trì định kỳ giúp máy hoạt động bền bỉ và hiệu quả lâu dài.',
    icon: '🛠️',
  },
  {
    title: 'Hỗ trợ kỹ thuật 24/7',
    description:
      'Luôn sẵn sàng hỗ trợ bạn khi gặp sự cố hoặc thắc mắc về sản phẩm.',
    icon: '📞',
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-8 py-20 text-gray-900">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-700 tracking-wide">
          Dịch Vụ Tại WaterPurifierShop
        </h1>

        <p className="text-xl max-w-3xl mx-auto mb-16 text-center leading-relaxed text-blue-900/90">
          Chúng tôi không chỉ cung cấp máy lọc nước chất lượng mà còn mang đến dịch vụ
          chăm sóc khách hàng tận tâm, giúp bạn có trải nghiệm tốt nhất và nguồn nước an toàn
          cho gia đình.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map(({ title, description, icon }) => (
            <div
              key={title}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center
                transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="bg-blue-100 text-blue-700 rounded-full w-20 h-20 flex items-center justify-center text-5xl mb-6 select-none">
                {icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-base leading-relaxed text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
