import { memo } from "react";
import "./UploadImages.scss";

const UploadImages = memo(({ images, onUpload }) => {
    return (
        <div className="upload-images">
            <input type="file" multiple onChange={onUpload} />
            <div className="preview">
                {images.map((img, idx) => (
                    <img src={img} alt={`Uploaded ${idx}`} key={idx} />
                ))}
            </div>
        </div>
    );
});

export default UploadImages;
