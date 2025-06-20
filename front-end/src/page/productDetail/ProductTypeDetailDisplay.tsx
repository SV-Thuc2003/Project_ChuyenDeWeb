import React from "react";
import { useTranslation } from "react-i18next";
import {
    ProductType,
    WaterPurifierDetail,
    FilterCartridgeDetail,
    NonElectricPurifierDetail,
    PrefilterHousingDetail,
} from "../../types/ProductDetail";

interface Props {
    productType: ProductType;
    detail:
        | WaterPurifierDetail
        | FilterCartridgeDetail
        | NonElectricPurifierDetail
        | PrefilterHousingDetail;
}

const ProductTypeDetailDisplay: React.FC<Props> = ({ productType, detail }) => {
    const { t } = useTranslation();

    const renderRow = (labelKey: string, value: any) => {
        if (value === undefined || value === null || value === "") return null;
        return (
            <p>
                <strong>{t(labelKey)}:</strong> {value}
            </p>
        );
    };

    const sectionTitle = (titleKey: string) => (
        <h2 className="text-xl font-semibold mb-4">{t(titleKey)}</h2>
    );

    switch (productType) {
        case "WATER_PURIFIER":
            const water = detail as WaterPurifierDetail;
            return (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    {sectionTitle("productDetail.specs")}
                    {renderRow("productDetail.stageNumber", water.stageNumber)}
                    {renderRow("productDetail.technology", water.technology)}
                    {renderRow("productDetail.modelName", water.modelName)}
                    {renderRow("productDetail.type", water.type)}
                    {renderRow("productDetail.hotColdSupport", water.hotColdSupport)}
                    {renderRow("productDetail.tankCapacity", water.tankCapacity)}
                    {renderRow("productDetail.capacityLPerHour", water.capacityLPerHour)}
                    {renderRow("productDetail.powerConsumption", water.powerConsumption)}
                    {renderRow("productDetail.dimensions", water.dimensions)}
                    {renderRow("productDetail.weightKg", water.weightKg)}
                    {renderRow("productDetail.voltage", water.voltage)}
                    {renderRow("productDetail.origin", water.origin)}
                    {renderRow("productDetail.warranty", water.warranty)}
                    {renderRow("productDetail.suitableUses", water.suitableUses)}
                    {renderRow("productDetail.material", water.material)}
                    {renderRow("productDetail.additionalInfo", water.additionalInfo)}
                </div>
            );

        case "FILTER_CARTRIDGE":
            const filter = detail as FilterCartridgeDetail;
            return (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    {sectionTitle("productDetail.cartridgeSpecs")}
                    {renderRow("productDetail.stageNumber", filter.stageNumber)}
                    {renderRow("productDetail.type", filter.type)}
                    {renderRow("productDetail.material", filter.material)}
                    {renderRow("productDetail.filterSizeMicron", filter.filterSizeMicron)}
                    {renderRow("productDetail.lifespanLiters", filter.lifespanLiters)}
                    {renderRow("productDetail.lifespanMonths", filter.lifespanMonths)}
                    {renderRow("productDetail.functions", filter.functions)}
                    {renderRow("productDetail.brandOrigin", filter.brandOrigin)}
                    {renderRow("productDetail.manufactureOrigin", filter.manufactureOrigin)}
                    {renderRow("productDetail.warranty", filter.warranty)}
                    {renderRow("productDetail.additionalInfo", filter.additionalInfo)}
                </div>
            );

        case "NON_ELECTRIC_PURIFIER":
            const nonElec = detail as NonElectricPurifierDetail;
            return (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    {sectionTitle("productDetail.nonElectricSpecs")}
                    {renderRow("productDetail.filtrationStages", nonElec.filtrationStages)}
                    {renderRow("productDetail.filterLevels", nonElec.filterLevels)}
                    {renderRow("productDetail.filterLifespanMonths", nonElec.filterLifespanMonths)}
                    {renderRow("productDetail.technology", nonElec.technology)}
                    {renderRow("productDetail.functions", nonElec.functions)}
                    {renderRow("productDetail.workingPressureMpa", nonElec.workingPressureMpa)}
                    {renderRow("productDetail.flowRateLPerMin", nonElec.flowRateLPerMin)}
                    {renderRow("productDetail.tankCapacity", nonElec.tankCapacity)}
                    {renderRow("productDetail.capacityLPerHour", nonElec.capacityLPerHour)}
                    {renderRow("productDetail.features", nonElec.features)}
                    {renderRow("productDetail.material", nonElec.material)}
                    {renderRow("productDetail.dimensions", nonElec.dimensions)}
                    {renderRow("productDetail.weightKg", nonElec.weightKg)}
                    {renderRow("productDetail.brandOrigin", nonElec.brandOrigin)}
                    {renderRow("productDetail.manufactureOrigin", nonElec.manufactureOrigin)}
                    {renderRow("productDetail.launchYear", nonElec.launchYear)}
                    {renderRow("productDetail.warranty", nonElec.warranty)}
                    {renderRow("productDetail.additionalInfo", nonElec.additionalInfo)}
                </div>
            );

        case "PREFILTER_HOUSING":
            const prefilter = detail as PrefilterHousingDetail;
            return (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    {sectionTitle("productDetail.prefilterSpecs")}
                    {renderRow("productDetail.cupCount", prefilter.cupCount)}
                    {renderRow("productDetail.filterMaterials", prefilter.filterMaterials)}
                    {renderRow("productDetail.housingMaterial", prefilter.housingMaterial)}
                    {renderRow("productDetail.filterCapacity", prefilter.filterCapacity)}
                    {renderRow("productDetail.functions", prefilter.functions)}
                    {renderRow("productDetail.filterLifespan", prefilter.filterLifespan)}
                    {renderRow("productDetail.dimensions", prefilter.dimensions)}
                    {renderRow("productDetail.weightKg", prefilter.weightKg)}
                    {renderRow("productDetail.brandOrigin", prefilter.brandOrigin)}
                    {renderRow("productDetail.manufactureOrigin", prefilter.manufactureOrigin)}
                    {renderRow("productDetail.launchYear", prefilter.launchYear)}
                    {renderRow("productDetail.warranty", prefilter.warranty)}
                    {renderRow("productDetail.additionalInfo", prefilter.additionalInfo)}
                </div>
            );

        default:
            return <div>{t("productDetail.noData")}</div>;
    }
};

export default ProductTypeDetailDisplay;
