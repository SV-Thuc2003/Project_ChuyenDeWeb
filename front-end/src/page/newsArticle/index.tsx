import React from 'react';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

type NewsArticle = {
  id: number;
  title: string;
  date: string;
  summary: string;
};

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Máy lọc nước công nghệ mới giúp tăng hiệu quả lọc',
    date: '2025-05-01',
    summary:
      'Công nghệ lọc nước mới với màng lọc siêu nhỏ giúp loại bỏ tạp chất hiệu quả hơn và giữ lại khoáng chất cần thiết cho cơ thể.',
  },
  {
    id: 2,
    title: 'Hướng dẫn bảo trì máy lọc nước đúng cách',
    date: '2025-04-20',
    summary:
      'Bài viết hướng dẫn các bước bảo trì định kỳ giúp máy lọc nước hoạt động bền bỉ, tiết kiệm chi phí sửa chữa.',
  },
  {
    id: 3,
    title: 'Lợi ích của nước tinh khiết đối với sức khỏe gia đình',
    date: '2025-04-10',
    summary:
      'Nước tinh khiết không chỉ giúp ngăn ngừa bệnh tật mà còn nâng cao sức đề kháng và cải thiện chất lượng cuộc sống.',
  },
];

const News: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-blue-700">
          Tin Tức Mới Nhất
        </h1>

        <div className="space-y-10">
          {newsArticles.map(({ id, title, date, summary }) => (
            <article
              key={id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-800">{title}</h2>
              <time
                className="block mb-4 text-sm text-gray-500"
                dateTime={date}
              >
                {new Date(date).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
