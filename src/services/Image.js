
export function saveImageToLocalStorage(imageUrl, localStorageKey) {
    console.log(imageUrl);
    fetch(imageUrl)
        .then((response) => response.blob()) // Lấy dữ liệu hình ảnh dưới dạng Blob
        .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result; // Dữ liệu hình ảnh dạng Base64
                localStorage.setItem(localStorageKey, base64data); // Lưu vào localStorage
                console.log(base64data);
            };
            reader.readAsDataURL(blob); // Chuyển blob thành Base64
        })
        .catch((error) => {
            console.error("Error fetching image:", error);
        });
}



