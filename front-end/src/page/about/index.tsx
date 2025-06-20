import React from 'react';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

const AboutUs: React.FC = () => {
  
 return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-5xl font-bold mb-10 text-center text-blue-700">
          Giới Thiệu Về Công Ty Water Purifier Shop
        </h1>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Sứ mệnh của chúng tôi</h2>
          <p className="text-xl leading-relaxed mb-4">
            Công ty Water Purifier Shop được thành lập với sứ mệnh mang đến nguồn nước sạch, an toàn và
            tinh khiết cho mọi gia đình Việt Nam. Chúng tôi hiểu rằng nước sạch không chỉ là nhu cầu thiết yếu,
            mà còn là yếu tố quyết định sức khỏe và chất lượng cuộc sống.
          </p>
          <p className="text-xl leading-relaxed">
            Với công nghệ lọc nước tiên tiến, thân thiện với môi trường và đội ngũ kỹ sư giàu kinh nghiệm,
            chúng tôi cam kết cung cấp những sản phẩm chất lượng nhất, đáp ứng được cả những yêu cầu khắt khe nhất.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Giá trị cốt lõi</h2>
          <ul className="list-disc list-inside space-y-2 text-xl leading-relaxed">
            <li><strong>Chất lượng:</strong> Cam kết sản phẩm đạt chuẩn quốc tế, an toàn tuyệt đối với sức khỏe.</li>
            <li><strong>Uy tín:</strong> Luôn đặt lợi ích khách hàng lên hàng đầu trong mọi hoạt động kinh doanh.</li>
            <li><strong>Đổi mới:</strong> Liên tục nghiên cứu, cải tiến công nghệ nhằm mang lại trải nghiệm tốt nhất.</li>
            <li><strong>Bền vững:</strong> Hướng tới các giải pháp thân thiện với môi trường và phát triển lâu dài.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Sản phẩm nổi bật</h2>
          <p className="text-xl leading-relaxed mb-4">
            Chúng tôi cung cấp đa dạng các dòng máy lọc nước phù hợp với từng nhu cầu sử dụng:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xl leading-relaxed">
            <li><strong>Máy lọc nước RO:</strong> Công nghệ thẩm thấu ngược loại bỏ hoàn toàn tạp chất, vi khuẩn, kim loại nặng.</li>
            <li><strong>Máy lọc nước Nano:</strong> Giữ lại khoáng chất tự nhiên cần thiết, an toàn cho sức khỏe.</li>
            <li><strong>Máy lọc nước điện giải:</strong> Giúp cân bằng độ pH, hỗ trợ nâng cao sức đề kháng.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Tại sao chọn chúng tôi?</h2>
          <p className="text-xl leading-relaxed mb-4">
            Bên cạnh chất lượng sản phẩm vượt trội, Máy Lọc Nước ABC còn nổi bật với các dịch vụ sau:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xl leading-relaxed">
            <li>Hỗ trợ tư vấn miễn phí để chọn máy lọc nước phù hợp với từng gia đình.</li>
            <li>Dịch vụ bảo trì và bảo hành tận nơi nhanh chóng, chu đáo.</li>
            <li>Giao hàng tận nhà và lắp đặt miễn phí trong khu vực nội thành.</li>
            <li>Chính sách đổi trả linh hoạt và minh bạch.</li>
          </ul>
          <p className="mt-6 text-xl leading-relaxed">
            Hãy để chúng tôi cùng bạn bảo vệ nguồn nước và nâng cao sức khỏe cho cả gia đình.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
