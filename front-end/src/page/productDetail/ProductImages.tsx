
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductImagesProps {
  imageUrls: string[];
  thumbnailUrl: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ imageUrls, thumbnailUrl }) => {
  const detailImages = imageUrls.filter((url) => url !== thumbnailUrl);
  const allImages = detailImages.length > 0 ? detailImages : [thumbnailUrl];

  const [selectedImage, setSelectedImage] = useState<string>(allImages[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const updatedImages = imageUrls.filter((url) => url !== thumbnailUrl);
    const initialImage = updatedImages.length > 0 ? updatedImages[0] : thumbnailUrl;
    setSelectedImage(initialImage);
  }, [thumbnailUrl, imageUrls]);

  const openFullscreen = (clickedIndex: number) => {
    setStartIndex(clickedIndex);
    setIsFullscreen(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    initialSlide: startIndex,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand' as const,
  };

  return (
    <>
      {/* Hình ảnh chính */}
      <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded shadow">
        <img
          src={selectedImage}
          alt="Ảnh sản phẩm"
          className="w-full max-h-[500px] object-contain cursor-zoom-in"
          onClick={() => openFullscreen(allImages.indexOf(selectedImage))}
        />

        {/* Thumbnail nhỏ */}
        <div className="flex gap-2 overflow-x-auto">
          {allImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Ảnh chi tiết ${idx + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover border cursor-pointer rounded transition duration-200 ${
                img === selectedImage ? 'ring-2 ring-blue-500' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen slider */}
      {isFullscreen && (
        <div className="fixed top-0 left-0 z-[10000] w-full h-full bg-black bg-opacity-95 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 text-white text-lg font-semibold hover:underline"
          >
            Đóng
          </button>
          <div className="w-full max-w-4xl px-4">
            <Slider {...sliderSettings}>
              {allImages.map((img, index) => (
                <div key={index} className="flex items-center justify-center h-[90vh]">
                  <img src={img} alt={`slide-${index}`} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImages;

