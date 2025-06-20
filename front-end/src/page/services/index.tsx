import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.consultation.title'),
      description: t('services.consultation.description'),
      icon: '💧',
    },
    {
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      icon: '🔧',
    },
    {
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      icon: '🛠️',
    },
    {
      title: t('services.support.title'),
      description: t('services.support.description'),
      icon: '📞',
    },
  ];

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
        <Header />

        <main className="flex-grow max-w-6xl mx-auto px-8 py-20 text-gray-900">
          <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-700 tracking-wide">
            {t('services.pageTitle')}
          </h1>

          <p className="text-xl max-w-3xl mx-auto mb-16 text-center leading-relaxed text-blue-900/90">
            {t('services.pageDescription')}
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
