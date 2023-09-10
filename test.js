const data = [
    {
        id: 'home-s8-photoLibrariy-1',
        image: 's',
    },
    {
        id: 'home-s8-photoLibrariy-2',
        image: 'ss',
    },
    {
        id: 'home-s8-photoLibrariy-3',
        image: 'ssss',
    },
    {
        id: 'home-s8-photoLibrariy-4',
        image: 'ssss',
    },
    {
        id: 'home-s8-photoLibrariy-5',
        image: 'ssss',
    },
];

// Tìm index của selectedId trong mảng
const selectedIndex = 2 + 1;

if (selectedIndex !== -1) {
    const updatedData = [...data];
    const length = updatedData.length;

    // Tạo một biến trung gian để lưu trữ ID đã cập nhật
    const updatedIds = [];

    // Duyệt qua các phần tử của mảng và cập nhật lại ID
    for (let i = 0; i < length; i++) {
        const newIndex = (i + selectedIndex) % length;
        const updatedItem = { ...updatedData[i], id: `home-s8-photoLibrariy-${i + 1}` };
        updatedData[newIndex] = updatedItem;
    }

    console.log(updatedData);
} else {
    console.log(`Không tìm thấy ID: ${selectedId} trong mảng data`);
}
