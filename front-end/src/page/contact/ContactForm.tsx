import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '../../components/ui/InputField';
import Textarea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';
import { ContactFormData, ContactFormErrors } from '../../types/Contact';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('contact.errors.firstName');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('contact.errors.lastName');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.email.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.email.invalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.message');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          title: t('contact.emailTitle'),
          message: formData.message
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert(t('contact.submitFailed'));
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="bg-gray-100 rounded-2xl p-8 shadow-sm">
        {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>{t('contact.successMessage')}</p>
            </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
                label={t('contact.firstName')}
                name="firstName"
                placeholder={t('contact.firstName')}
                value={formData.firstName}
                onChange={handleChange}
                required
                error={errors.firstName}
            />

            <InputField
                label={t('contact.lastName')}
                name="lastName"
                placeholder={t('contact.lastName')}
                value={formData.lastName}
                onChange={handleChange}
                required
                error={errors.lastName}
            />
          </div>

          <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
              className="mt-4"
          />

          <Textarea
              label={t('contact.message')}
              name="message"
              placeholder={t('contact.messagePlaceholder')}
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              error={errors.message}
              className="mt-4"
          />

          <Button type="submit" className="mt-6 py-3 px-16" disabled={isSubmitting}>
            {isSubmitting ? t('contact.submitting') : t('contact.submit')}
          </Button>
        </form>
      </div>
  );
};

export default ContactForm;
