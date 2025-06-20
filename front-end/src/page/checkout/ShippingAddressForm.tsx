import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShippingAddress } from '../../types/ChechOut';
import { useTranslation } from 'react-i18next';

interface ShippingAddressFormProps {
    shippingAddress: ShippingAddress;
    onShippingAddressChange: (field: keyof ShippingAddress, value: string) => void;
    onShippingFeeChange: (fee: number) => void;
}

const GHN_TOKEN = '68b20e88-40bb-11f0-a826-7e1a8402b405';

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
                                                                     shippingAddress,
                                                                     onShippingAddressChange,
                                                                     onShippingFeeChange,
                                                                 }) => {
    const { t } = useTranslation();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string>('');

    useEffect(() => {
        axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {}, {
            headers: { Token: GHN_TOKEN },
        }).then((res) => setProvinces(res.data.data));
    }, []);

    useEffect(() => {
        if (!selectedProvinceId) return;
        axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            province_id: selectedProvinceId,
        }, {
            headers: { Token: GHN_TOKEN },
        }).then((res) => setDistricts(res.data.data));
    }, [selectedProvinceId]);

    useEffect(() => {
        if (!selectedDistrictId) return;
        axios.post('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
            district_id: selectedDistrictId,
        }, {
            headers: { Token: GHN_TOKEN },
        }).then((res) => setWards(res.data.data));
    }, [selectedDistrictId]);

    useEffect(() => {
        if (selectedProvinceId !== null) {
            const selected = provinces.find(p => p.ProvinceID === selectedProvinceId);
            if (selected) {
                onShippingAddressChange('city', selected.ProvinceName);
                onShippingAddressChange('provinceId', selected.ProvinceID.toString());
            }
        }
    }, [selectedProvinceId]);

    useEffect(() => {
        if (selectedDistrictId !== null) {
            const selected = districts.find(d => d.DistrictID === selectedDistrictId);
            if (selected) {
                onShippingAddressChange('district', selected.DistrictName);
                onShippingAddressChange('districtId', selected.DistrictID.toString());
            }
        }
    }, [selectedDistrictId]);

    useEffect(() => {
        if (selectedWardCode) {
            const ward = wards.find(w => w.WardCode === selectedWardCode);
            if (ward) {
                onShippingAddressChange('ward', ward.WardName);
                onShippingAddressChange('wardCode', ward.WardCode);
            }
        }
    }, [selectedWardCode]);

    useEffect(() => {
        if (shippingAddress.districtId && shippingAddress.wardCode) {
            axios.post('/api/shipping/fee', shippingAddress)
                .then(res => onShippingFeeChange(res.data.total))
                .catch(err => {
                    console.error("❌ GHN API lỗi:", err);
                    onShippingFeeChange(0);
                });
        }
    }, [shippingAddress.districtId, shippingAddress.wardCode]);

    return (
        <div className="mb-6">
            <div className="p-6 border border-gray-300 rounded-lg space-y-4 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-4">{t('shipping.title')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <option value="">{t('shipping.selectProvince')}</option>
                        {provinces.map((province) => (
                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                {province.ProvinceName}
                            </option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded"
                        value={selectedDistrictId ?? ''}
                        onChange={(e) => setSelectedDistrictId(parseInt(e.target.value))}
                        disabled={!selectedProvinceId}
                    >
                        <option value="">{t('shipping.selectDistrict')}</option>
                        {districts.map((district) => (
                            <option key={district.DistrictID} value={district.DistrictID}>
                                {district.DistrictName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="p-2 border rounded"
                        value={selectedWardCode}
                        onChange={(e) => setSelectedWardCode(e.target.value)}
                        disabled={wards.length === 0}
                    >
                        <option value="">{t('shipping.selectWard')}</option>
                        {wards.map((ward) => (
                            <option key={ward.WardCode} value={ward.WardCode}>
                                {ward.WardName}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder={t('shipping.addressPlaceholder')}
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
