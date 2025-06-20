import React from 'react';
import { PersonalInfo } from '../../types/ChechOut';
import InputField from '../../components/ui/InputField';
import { useTranslation } from 'react-i18next';

interface PersonalInfoFormProps {
    personalInfo: PersonalInfo;
    onPersonalInfoChange: (field: keyof PersonalInfo, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
                                                               personalInfo,
                                                               onPersonalInfoChange,
                                                           }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{t('personal.title')}</h2>

                <InputField
                    label={t('personal.name')}
                    placeholder={t('personal.namePlaceholder')}
                    value={personalInfo.name}
                    onChange={(e) => onPersonalInfoChange('name', e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label={t('personal.email')}
                        placeholder={t('personal.emailPlaceholder')}
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => onPersonalInfoChange('email', e.target.value)}
                    />

                    <InputField
                        label={t('personal.phone')}
                        placeholder={t('personal.phonePlaceholder')}
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => onPersonalInfoChange('phone', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
