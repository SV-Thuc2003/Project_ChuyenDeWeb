import React from "react";

interface Policy {
  icon: string;
  content: React.ReactNode;
}

const policies: Policy[] = [
  {
    icon: "https://cdnv2.tgdd.vn/pim/cdn/images/202411/icon%20lap%20dat155918.png",
    content: <><b>Lắp đặt miễn phí</b> lúc giao hàng</>,
  },
  {
    icon: "https://cdnv2.tgdd.vn/pim/cdn/images/202410/Exchange150303.png",
    content: (
      <>
        Hư gì đổi nấy <b>12 tháng</b> tận nhà (miễn phí tháng đầu){" "}
        <button
          onClick={() => alert("Xem chi tiết chính sách")}
          className="text-blue-600 underline"
        >
          Xem chi tiết
        </button>
      </>
    ),
  },
  {
    icon: "https://cdnv2.tgdd.vn/pim/cdn/images/202410/icon%20bao%20hanh170837.png",
    content: <>Bảo hành <b>chính hãng 3 năm</b>, có người đến tận nhà</>,
  },
];

const PolicyList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Water Purifire Shop cam kết</h2>
      <ul className="policy__list">
        {policies.map((policy, index) => (
          <li key={index} className="flex items-start mb-4">
            <div className="pl-icon mr-4">
              <img src={policy.icon} alt="chính sách bảo hành" className="w-10 h-10" />
            </div>
            <div className="pl-txt text-sm text-gray-700">{policy.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyList;
