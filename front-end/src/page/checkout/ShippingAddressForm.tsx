// ✅ GHN Dropdown ShippingAddressForm with full API logic
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShippingAddress } from '../../types/ChechOut';

interface ShippingAddressFormProps {
    shippingAddress: ShippingAddress;
    onShippingAddressChange: (field: keyof ShippingAddress, value: string) => void;
    onShippingFeeChange: (fee: number) => void;
}

// GHN token cố định (test)
const GHN_TOKEN = '68b20e88-40bb-11f0-a826-7e1a8402b405';

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
                                                                     shippingAddress,
                                                                     onShippingAddressChange,
                                                                     onShippingFeeChange,
                                                                 }) => {
    const [provinces, setProvinces] = useState<{ ProvinceID: number; ProvinceName: string }[]>([]);
    const [districts, setDistricts] = useState<{ DistrictID: number; DistrictName: string }[]>([]);
    const [wards, setWards] = useState<{ WardCode: string; WardName: string }[]>([]);

    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string>('');

    // ✅ Load tỉnh
    useEffect(() => {
        axios
            .post('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {}, {
                headers: { Token: GHN_TOKEN },
            })
            .then((res) => setProvinces(res.data.data));
    }, []);

    // ✅ Load quận theo tỉnh
    useEffect(() => {
        if (!selectedProvinceId) return;
        axios
            .post('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                province_id: selectedProvinceId,
            }, {
                headers: { Token: GHN_TOKEN },
            })
            .then((res) => setDistricts(res.data.data));
    }, [selectedProvinceId]);

    // ✅ Load phường theo quận
    useEffect(() => {
        if (!selectedDistrictId) return;
        axios
            .post('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                district_id: selectedDistrictId,
            }, {
                headers: { Token: GHN_TOKEN },
            })
            .then((res) => setWards(res.data.data));
    }, [selectedDistrictId]);

    // ✅ Khi chọn tỉnh → cập nhật city & provinceId
    useEffect(() => {
        if (selectedProvinceId !== null) {
            const selected = provinces.find((p) => p.ProvinceID === selectedProvinceId);
            if (selected) {
                onShippingAddressChange('city', selected.ProvinceName);
                onShippingAddressChange('provinceId', selected.ProvinceID.toString());
            }
        }
    }, [selectedProvinceId]);

    // ✅ Khi chọn quận → cập nhật district & districtId
    useEffect(() => {
        if (selectedDistrictId !== null) {
            const selected = districts.find((d) => d.DistrictID === selectedDistrictId);
            if (selected) {
                onShippingAddressChange('district', selected.DistrictName);
                onShippingAddressChange('districtId', selected.DistrictID.toString());
            }
        }
    }, [selectedDistrictId]);

    // ✅ Khi chọn phường → cập nhật ward & wardCode
    useEffect(() => {
        if (selectedWardCode) {
            const ward = wards.find((w) => w.WardCode === selectedWardCode);
            if (ward) {
                onShippingAddressChange('ward', ward.WardName);
                onShippingAddressChange('wardCode', ward.WardCode);
            }
        }
    }, [selectedWardCode]);

    // ✅ Gọi API tính phí GHN sau khi đủ districtId và wardCode
    useEffect(() => {
        if (shippingAddress.districtId && shippingAddress.wardCode) {
            axios
                .post('/api/shipping/fee', {
                    ...shippingAddress,
                })
                .then((res) => {
                    console.log("✅ GHN API response:", res.data); // log lại để kiểm tra
                    const fee = res.data.total; // ✅ ĐÚNG: lấy từ field 'total'
                    onShippingFeeChange(fee);
                })
                .catch((err) => {
                    console.error("❌ GHN API lỗi:", err);
                    onShippingFeeChange(0);
                });
        }
    }, [shippingAddress.districtId, shippingAddress.wardCode]);



    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Địa chỉ giao hàng</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tỉnh/Thành */}
                    <select
                        className="p-2 border rounded"
                        value={selectedProvinceId ?? ''}
                        onChange={(e) => {
                            const id = parseInt(e.target.value);
                            setSelectedProvinceId(id);
                            setDistricts([]);
                            setWards([]);
                            setSelectedDistrictId(null);
                            setSelectedWardCode('');
                        }}
                    >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                {province.ProvinceName}
                            </option>
                        ))}
                    </select>

                    {/* Quận/Huyện */}
                    <select
                        className="p-2 border rounded"
                        value={selectedDistrictId ?? ''}
                        onChange={(e) => setSelectedDistrictId(parseInt(e.target.value))}
                        disabled={!selectedProvinceId}
                    >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district) => (
                            <option key={district.DistrictID} value={district.DistrictID}>
                                {district.DistrictName}
                            </option>
                        ))}
                    </select>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phường/Xã */}
                    <select
                        className="p-2 border rounded"
                        value={selectedWardCode}
                        onChange={(e) => setSelectedWardCode(e.target.value)}
                        disabled={wards.length === 0}
                    >
                        <option value="">Chọn phường/xã</option>
                        {wards.map((ward) => (
                            <option key={ward.WardCode} value={ward.WardCode}>
                                {ward.WardName}
                            </option>
                        ))}
                    </select>

                    {/* Số nhà */}
                    <input
                        type="text"
                        placeholder="Số nhà, tên đường"
                        className="p-2 border rounded"
                        value={shippingAddress.address}
                        onChange={(e) => onShippingAddressChange('address', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShippingAddressForm;
