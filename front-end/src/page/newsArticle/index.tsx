import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

type NewsArticle = {
  id: number;
  title: string;
  date: string;
  summary: string;
};

const News: React.FC = () => {
  const { t, i18n } = useTranslation();

  const newsArticles: NewsArticle[] = t("news.articles", { returnObjects: true });

  return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-extrabold mb-12 text-center text-blue-700">
            {t("news.title")}
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
                    {new Date(date).toLocaleDateString(i18n.language, {
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
