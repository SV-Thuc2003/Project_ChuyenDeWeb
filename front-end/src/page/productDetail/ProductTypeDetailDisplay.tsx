import React from "react";
import {
//   ProductDetail,
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
  switch (productType) {
    case "WATER_PURIFIER":
      const water = detail as WaterPurifierDetail;
      return (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h2>
          <p><strong>Số cấp lọc:</strong> {water.stageNumber}</p>
          <p><strong>Công nghệ:</strong> {water.technology}</p>
          {water.modelName && <p><strong>Mã sản phẩm:</strong> {water.modelName}</p>}
          {water.type && <p><strong>Loại:</strong> {water.type}</p>}
          {water.hotColdSupport && <p><strong>Hỗ trợ nóng/lạnh:</strong> {water.hotColdSupport}</p>}
          {water.tankCapacity && <p><strong>Dung tích bình:</strong> {water.tankCapacity}</p>}
          {water.capacityLPerHour && <p><strong>Công suất lọc (L/h):</strong> {water.capacityLPerHour}</p>}
          {water.powerConsumption && <p><strong>Công suất tiêu thụ:</strong> {water.powerConsumption}</p>}
          {water.dimensions && <p><strong>Kích thước:</strong> {water.dimensions}</p>}
          {water.weightKg !== undefined && water.weightKg !== null && <p><strong>Trọng lượng (kg):</strong> {water.weightKg}</p>}
          {water.voltage && <p><strong>Điện áp:</strong> {water.voltage}</p>}
          {water.origin && <p><strong>Nơi sản xuất:</strong> {water.origin}</p>}
          {water.warranty && <p><strong>Thời gian bảo hành:</strong> {water.warranty}</p>}
          {water.suitableUses && <p><strong>Mục đích sử dụng:</strong> {water.suitableUses}</p>}
          {water.material && <p><strong>Chất liệu:</strong> {water.material}</p>}
          {water.additionalInfo && <p><strong>Thông tin thêm:</strong> {water.additionalInfo}</p>}
        </div>
      );

    case "FILTER_CARTRIDGE":
      const filter = detail as FilterCartridgeDetail;
      return (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Thông số Lõi lọc</h2>
          <p><strong>Số cấp lọc:</strong> {filter.stageNumber}</p>
          <p><strong>Loại:</strong> {filter.type}</p>
          <p><strong>Chất liệu:</strong> {filter.material}</p>
          <p><strong>Kích thước lọc (Micron):</strong> {filter.filterSizeMicron}</p>
          {filter.lifespanLiters !== null && <p><strong>Tuổi thọ (L):</strong> {filter.lifespanLiters}</p>}
          {filter.lifespanMonths !== null && <p><strong>Tuổi thọ (Tháng):</strong> {filter.lifespanMonths}</p>}
          <p><strong>Chức năng:</strong> {filter.functions}</p>
          <p><strong>Thương hiệu:</strong> {filter.brandOrigin}</p>
          <p><strong>Nơi sản xuất:</strong> {filter.manufactureOrigin}</p>
          {filter.warranty && <p><strong>Bảo hành:</strong> {filter.warranty}</p>}
          {filter.additionalInfo && <p><strong>Thông tin thêm:</strong> {filter.additionalInfo}</p>}
        </div>
      );

    case "NON_ELECTRIC_PURIFIER":
      const nonElec = detail as NonElectricPurifierDetail;
      return (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Thông số Máy lọc không điện</h2>
          <p><strong>Số cấp lọc:</strong> {nonElec.filtrationStages}</p>
          <p><strong>Cấp lọc:</strong> {nonElec.filterLevels}</p>
          <p><strong>Tuổi thọ bộ lọc (Tháng):</strong> {nonElec.filterLifespanMonths}</p>
          <p><strong>Công nghệ:</strong> {nonElec.technology}</p>
          <p><strong>Chức năng:</strong> {nonElec.functions}</p>
          <p><strong>Áp lực làm việc (Mpa):</strong> {nonElec.workingPressureMpa}</p>
          <p><strong>Lưu lượng (L/phút):</strong> {nonElec.flowRateLPerMin}</p>
          {nonElec.tankCapacity !== null && <p><strong>Dung tích bình:</strong> {nonElec.tankCapacity}</p>}
          <p><strong>Công suất lọc (L/h):</strong> {nonElec.capacityLPerHour}</p>
          <p><strong>Tính năng:</strong> {nonElec.features}</p>
          <p><strong>Chất liệu:</strong> {nonElec.material}</p>
          <p><strong>Kích thước:</strong> {nonElec.dimensions}</p>
          <p><strong>Trọng lượng (kg):</strong> {nonElec.weightKg}</p>
          <p><strong>Thương hiệu:</strong> {nonElec.brandOrigin}</p>
          <p><strong>Nơi sản xuất:</strong> {nonElec.manufactureOrigin}</p>
          <p><strong>Năm ra mắt:</strong> {nonElec.launchYear}</p>
          {nonElec.warranty && <p><strong>Bảo hành:</strong> {nonElec.warranty}</p>}
          {nonElec.additionalInfo && <p><strong>Thông tin thêm:</strong> {nonElec.additionalInfo}</p>}
        </div>
      );

    case "PREFILTER_HOUSING":
      const prefilter = detail as PrefilterHousingDetail;
      return (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Thông số Vỏ lọc thô</h2>
          <p><strong>Số cốc:</strong> {prefilter.cupCount}</p>
          <p><strong>Chất liệu lõi lọc:</strong> {prefilter.filterMaterials}</p>
          <p><strong>Chất liệu vỏ:</strong> {prefilter.housingMaterial}</p>
          <p><strong>Dung tích lọc:</strong> {prefilter.filterCapacity}</p>
          <p><strong>Chức năng:</strong> {prefilter.functions}</p>
          <p><strong>Tuổi thọ bộ lọc:</strong> {prefilter.filterLifespan}</p>
          <p><strong>Kích thước:</strong> {prefilter.dimensions}</p>
          <p><strong>Trọng lượng (kg):</strong> {prefilter.weightKg}</p>
          <p><strong>Thương hiệu:</strong> {prefilter.brandOrigin}</p>
          <p><strong>Nơi sản xuất:</strong> {prefilter.manufactureOrigin}</p>
          <p><strong>Năm ra mắt:</strong> {prefilter.launchYear}</p>
          {prefilter.warranty && <p><strong>Bảo hành:</strong> {prefilter.warranty}</p>}
          {prefilter.additionalInfo && <p><strong>Thông tin thêm:</strong> {prefilter.additionalInfo}</p>}
        </div>
      );

    default:
      return <div>Thông tin chi tiết không có.</div>;
  }
};

export default ProductTypeDetailDisplay;
