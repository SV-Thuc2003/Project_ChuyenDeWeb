import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow max-w-5xl mx-auto px-6 py-16 text-gray-800">
          <h1 className="text-5xl font-bold mb-10 text-center text-blue-700">
            {t("aboutUs.title")}
          </h1>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">{t("aboutUs.mission.title")}</h2>
            <p className="text-xl leading-relaxed mb-4">{t("aboutUs.mission.text1")}</p>
            <p className="text-xl leading-relaxed">{t("aboutUs.mission.text2")}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">{t("aboutUs.values.title")}</h2>
            <ul className="list-disc list-inside space-y-2 text-xl leading-relaxed">
              <li><strong>{t("aboutUs.values.quality.label")}:</strong> {t("aboutUs.values.quality.desc")}</li>
              <li><strong>{t("aboutUs.values.reputation.label")}:</strong> {t("aboutUs.values.reputation.desc")}</li>
              <li><strong>{t("aboutUs.values.innovation.label")}:</strong> {t("aboutUs.values.innovation.desc")}</li>
              <li><strong>{t("aboutUs.values.sustainability.label")}:</strong> {t("aboutUs.values.sustainability.desc")}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">{t("aboutUs.products.title")}</h2>
            <p className="text-xl leading-relaxed mb-4">{t("aboutUs.products.intro")}</p>
            <ul className="list-disc list-inside space-y-2 text-xl leading-relaxed">
              <li><strong>{t("aboutUs.products.ro.label")}:</strong> {t("aboutUs.products.ro.desc")}</li>
              <li><strong>{t("aboutUs.products.nano.label")}:</strong> {t("aboutUs.products.nano.desc")}</li>
              <li><strong>{t("aboutUs.products.electrolyzed.label")}:</strong> {t("aboutUs.products.electrolyzed.desc")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">{t("aboutUs.whyUs.title")}</h2>
            <p className="text-xl leading-relaxed mb-4">{t("aboutUs.whyUs.intro")}</p>
            <ul className="list-disc list-inside space-y-2 text-xl leading-relaxed">
              <li>{t("aboutUs.whyUs.point1")}</li>
              <li>{t("aboutUs.whyUs.point2")}</li>
              <li>{t("aboutUs.whyUs.point3")}</li>
              <li>{t("aboutUs.whyUs.point4")}</li>
            </ul>
            <p className="mt-6 text-xl leading-relaxed">{t("aboutUs.whyUs.final")}</p>
          </section>
        </main>

        <Footer />
      </div>
  );
};

export default AboutUs;
