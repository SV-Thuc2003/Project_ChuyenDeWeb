import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";
import MapSection from "./MapSection";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow mt-5">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
                {t("contact.title")}
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <ContactForm />
                </div>

                <div>
                  <ContactDetails />
                </div>
              </div>
            </div>
          </section>

          <section className="pb-16">
            <div className="container mx-auto px-4">
              <MapSection />
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
};

export default ContactPage;
