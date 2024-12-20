import React, { useState } from 'react';
import '../styles/apps/ImageConverter.css'

function ImageConverter() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [outputFormat, setOutputFormat] = useState('jpeg');
    const [convertedImage, setConvertedImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(true);
    const [imageEffect, setImageEffect] = useState('normal');

    const fileInputRef = React.useRef(null);

    const handleImageChange = (event) => setSelectedImage(event.target.files[0]);
    const handleOutputFormatChange = (event) => setOutputFormat(event.target.value);
    const handleImageEffectChange = (event) => setImageEffect(event.target.value);

    const convertImage = () => {
        setProgress(0);
        if (selectedImage) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedImage);
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);

                    if (imageEffect === 'black-and-white') {
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const pixels = imageData.data;
                        for (let i = 0; i < pixels.length; i += 4) {
                            const gray = Math.round((pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11));
                            pixels[i] = gray;
                            pixels[i + 1] = gray;
                            pixels[i + 2] = gray;
                        }
                        ctx.putImageData(imageData, 0, 0);
                    } else if (imageEffect === 'inverted') {
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const pixels = imageData.data;
                        for (let i = 0; i < pixels.length; i += 4) {
                            pixels[i] = 255 - pixels[i];
                            pixels[i + 1] = 255 - pixels[i + 1];
                            pixels[i + 2] = 255 - pixels[i + 2];
                        }
                        ctx.putImageData(imageData, 0, 0);
                    }

                    const intervalId = setInterval(() => {
                        setProgress((prev) => {
                            if (prev < 100) {
                                return Math.min(prev + 50, 100);
                            }
                            clearInterval(intervalId);
                            return prev;
                        });
                    }, 200);

                    canvas.toBlob((blob) => {
                        const newImage = new File([blob], `image.${outputFormat}`, {
                            type: `image/${outputFormat}`,
                        });
                        setConvertedImage(newImage);
                        setDownloadButtonDisabled(false);
                    }, `image/${outputFormat}`);
                };
            };
        }
    };

    const downloadImage = () => {
        if (convertedImage) {
            const url = URL.createObjectURL(convertedImage);
            const a = document.createElement('a');
            a.href = url;
            a.download = `image.${outputFormat}`;
            a.click();
            URL.revokeObjectURL(url);
            setConvertedImage(null);
            setSelectedImage(null);
            setProgress(0);
            setDownloadButtonDisabled(true);
        }
    };

    const handleDragOver = (event) => event.preventDefault();
    const handleDrop = (event) => {
        event.preventDefault();
        setSelectedImage(event.dataTransfer.files[0]);
    };


    return (
        <section id='img-conv'>
            <div className='container'>
                <h1>Image Converter</h1>
                <p>All image instances are securely deleted immediately after the download is complete.</p>
                <div
                    className='dropZone'
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    <p className='textAbovePlus'>Drag and Drop / Add Image Here</p>
                    {selectedImage ? (
                        <p>Selected image: {selectedImage.name}</p>
                    ) : (
                        <div className='addImageIcon'>+</div>
                    )}
                    <input
                        type="file"
                        accept=".jpeg, .jpg, .png, .gif, .webp, .svg, .tiff, .bmp, .heic"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                <div>
                    <label className='label' htmlFor="format-select">
                        Format:
                    </label>
                    <select
                        id="format-select"
                        className='select'
                        value={outputFormat}
                        onChange={handleOutputFormatChange}
                    >
                        <option value="jpeg">JPEG</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                        <option value="gif">GIF</option>
                        <option value="webp">WebP</option>
                        <option value="svg">SVG</option>
                        <option value="tiff">TIFF</option>
                        <option value="bmp">BMP</option>
                        <option value="heic">HEIC</option>
                    </select>
                </div>
                <div>
                    <label className='label' htmlFor="effect-select">
                        Image Effect:
                    </label>
                    <select
                        className='select'
                        id="effect-select"
                        value={imageEffect}
                        onChange={handleImageEffectChange}
                    >
                        <option value="normal">Normal</option>
                        <option value="black-and-white">Black & White</option>
                        <option value="inverted">Inverted</option>
                    </select>
                </div>
                <button
                    className="button"
                    onClick={convertImage}>
                    Convert Image
                </button>
                <div className="progressBar">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {progress}%
                    </div>
                </div>

                <button
                    className={`button ${downloadButtonDisabled ? 'button-disabled' : ''}`}
                    onClick={downloadImage}
                    disabled={downloadButtonDisabled}>
                    Download Image
                </button>
            </div>
        </section>
    );
}

export default ImageConverter;