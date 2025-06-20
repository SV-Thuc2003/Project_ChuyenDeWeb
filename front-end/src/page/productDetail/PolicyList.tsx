import React from "react";
import { useTranslation } from "react-i18next";

interface Policy {
    icon: string;
    contentKey: string;
}

const policies: Policy[] = [
    {
        icon: "https://cdnv2.tgdd.vn/pim/cdn/images/202411/icon%20lap%20dat155918.png",
        contentKey: "product.policy.installation",
    },
    {
        icon: "https://cdnv2.tgdd.vn/pim/cdn/images/202410/Exchange150303.png",
        contentKey: "product.policy.exchange",
    },
    {
        icon: "https://cdnv2.tgdd.vn/pim/cdn/images/202410/icon%20bao%20hanh170837.png",
        contentKey: "product.policy.warranty",
    },
];

const PolicyList: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">{t("product.policy.title")}</h2>
            <ul className="policy__list">
                {policies.map((policy, index) => (
                    <li key={index} className="flex items-start mb-4">
                        <div className="pl-icon mr-4">
                            <img src={policy.icon} alt="policy icon" className="w-10 h-10" />
                        </div>
                        <div className="pl-txt text-sm text-gray-700">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <span
                                dangerouslySetInnerHTML={{ __html: t(policy.contentKey) }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PolicyList;
