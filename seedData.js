import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import connect from './src/database/database.js';
import { printDebug, OutputTypeDebug } from './src/helpers/printDebug.js';
import { typeRoomModel, roomModel, utilitiesModel, userModel } from './src/models/index.js';
import { TYPE_ROOMS, DESCRIPTION_ROOM, TYPE_BED } from './src/global/constants.js';

const app = express();
app.use(express.json());
dotenv.config();

connect()
    .then(async () => {
        let password = 'Admin1234';
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const myUser = [
            {
                username: 'admin',
                password: hashPassword,
                email: 'Stellar@gmail.com',
                phoneNumber: '0123456789',
                role: process.env.ADMIN,
            },
        ];
        let isExist = await userModel.insertMany(myUser);
        if (isExist) {
            printDebug('Insert User Admin success', OutputTypeDebug.SUCCESS);
        } else {
            printDebug('Insert  User Admin fail', OutputTypeDebug.ERROR);
        }
    })
    .then(async () => {
        const myTypeRooms = [
            {
                name: TYPE_ROOMS.SUPERIOR_DOUBLE_OR_TWIN_ROOM,
                image: [
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1693904007/SuperiorDoubleOrTwin_2_klza9q.jpg',
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1692245732/nj3uq7t8uaztrdqfjse7.jpg',
                ],
                description: DESCRIPTION_ROOM.SUPERIOR_DOUBLE_OR_TWIN_ROOM,
            },
            {
                name: TYPE_ROOMS.DELUXE_DOUBLE_ROOM,
                image: [
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1692245598/bmvoulbuynr2t7f2f8ki.jpg',
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1692245598/it7t47jabgxhfrfcfbes.jpg',
                ],
                description: DESCRIPTION_ROOM.DELUXE_DOUBLE_ROOM,
            },
            {
                name: TYPE_ROOMS.EXECUTIVE_CITY_VIEW_ROOM,
                image: [
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1693905165/ExecutiveCityView1_hynorn.jpg',
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1693905219/ExecutiveCityView2_hvky2w.jpg',
                ],
                description: DESCRIPTION_ROOM.EXECUTIVE_CITY_VIEW_ROOM,
            },
            {
                name: TYPE_ROOMS.SUITE_GARDEN_ROOM,
                image: [
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1692245784/gizoohtni0ifi2lr3ebm.jpg',
                    'https://res.cloudinary.com/drzp9tafy/image/upload/v1693905330/Suite_Garden2_wp6a6j.jpg',
                ],
                description: DESCRIPTION_ROOM.SUITE_GARDEN_ROOM,
            },
        ];

        let isExist = await typeRoomModel.insertMany(myTypeRooms);
        if (isExist) {
            printDebug('Insert Type rooms success', OutputTypeDebug.SUCCESS);
        } else {
            printDebug('Insert Type rooms fail', OutputTypeDebug.ERROR);
        }
    })
    .then(async () => {
        let isExistingTypeRoom = await typeRoomModel.findOne({ name: TYPE_ROOMS.SUPERIOR_DOUBLE_OR_TWIN_ROOM });

        const myRooms_SDoTR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 101,
                acreage: 23,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 102,
                acreage: 20,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 103,
                acreage: 23,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 104,
                acreage: 23,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 105,
                acreage: 23,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 106,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 107,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 108,
                acreage: 25,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 109,
                acreage: 25,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 110,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 111,
                acreage: 25,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 112,
                acreage: 25,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 114,
                acreage: 25,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '300000',
            },
            
        ];

        isExistingTypeRoom = await typeRoomModel.findOne({ name: TYPE_ROOMS.DELUXE_DOUBLE_ROOM });

        const myRooms_DDR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 201,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 202,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 203,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 204,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 205,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 206,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 207,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 208,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 209,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 210,
                acreage: 33,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 211,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 212,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 214,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 215,
                acreage: 33,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 116,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 117,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            } ,
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 118,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            } ,
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 119,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 120,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 121,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 122,
                acreage: 33,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 123,
                acreage: 33,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 124,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '300000',
            }
            
        ];

        isExistingTypeRoom = await typeRoomModel.findOne({ name: TYPE_ROOMS.EXECUTIVE_CITY_VIEW_ROOM });

        const myRooms_ECVR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 301,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 302,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 303,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 304,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 305,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 306,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '450000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 307,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 308,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 309,
                acreage: 35,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 310,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 311,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 312,
                acreage: 35,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 314,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 315,
                acreage: 35,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 316,
                acreage: 35,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '400000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 317,
                acreage: 35,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '450000',
            },
        ];

        isExistingTypeRoom = await typeRoomModel.findOne({ name: TYPE_ROOMS.SUITE_GARDEN_ROOM });

        const myRooms_SGR = [
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 401,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 402,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 403,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 404,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 405,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 406,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 407,
                acreage: 33,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 408,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 409,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 410,
                acreage: 33,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 411,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 412,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 414,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 415,
                acreage: 30,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 416,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 417,
                acreage: 30,
                typeBed: TYPE_BED.DOUBLE_BED,
                view: 'Hướng Lanmark 81',
                prices: '250000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 418,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
            {
                typeRoom: isExistingTypeRoom._id,
                roomNumber: 419,
                acreage: 33,
                typeBed: TYPE_BED.SINGLE_BED,
                view: 'Hướng sông Sài Gòn',
                prices: '350000',
            },
        ];

        const myRoom = [...myRooms_SDoTR, ...myRooms_DDR, ...myRooms_ECVR, ...myRooms_SGR];

        let isExist = await roomModel.insertMany(myRoom);
        if (isExist) {
            printDebug('Insert Rooms success', OutputTypeDebug.SUCCESS);
        } else {
            printDebug('Insert Rooms fail', OutputTypeDebug.ERROR);
        }
    })

    .then(async () => {
        const myUtilities = [
            {
                name: 'Nhà Hàng Buffers',
                description: `Nơi hoàn hảo để tận hưởng sự sang trọng và thoải mái tuyệt đỉnh!\nTọa lạc tầng 5, với góc nhìn đẹp hướng ra đại lộ Nguyễn Huệ, Stellar Hotel nổi bật với hơn 60 món ăn của đồng bằng sông Cửu Long được chế biến tỉ mỉ của gồm mì, bánh khọt, gỏi cuốn, đậu hũ, chè, hột vịt lộn và nước mát cũng như các món hải sản nướng. Ngoài ra, thực khách còn được thưởng thức các buổi trình diễn nhạc cụ truyền thống trong khi thưởng thức bữa ăn.\nGiờ mở cửa: Bữa sáng: từ 6 giờ sáng đến 9 giờ sang hàng ngày.\nĂn trưa: từ 11 giờ sáng đến 2 giờ chiều hàng ngày.\nBữa tối: từ 6 giờ tối đến 9 giờ 30 chiều hàng phục.`,
                type: 'Restaurant',
            },
            {
                name: 'Stellar Bar',
                description: `Stellar Hotel mang không khí của câu lạc bộ biển. Thường xuyên thu hút người nước ngoài ăn mặc bảnh bao và người dân địa phương đến đây giải trí thư giãn. Quán bar trên tầng thượng này được trang bị rất nhiều cây nhiệt đới, trang trí nội thất theo tông màu đen trắng. Sàn nhảy rộng và quầy bar đầy đủ dự trữ trên boong chính phục vụ đầy và nhiệt tình các khách hàng đến đây.\nVới một cái nhìn tuyệt đẹp của trung tâm Sài Gòn. Chill Skybar là một trong những hộp đêm nổi tiếng nhất trong thành phố. Ở đây bạn sẽ chứng kiến một Sài Gòn cực kì đẹp với thưởng thức nhạc dance hay hip hop sôi động đầy hấp dẫn. Nhưng đồ uống ở đây là rất tốn kém, chi phí của một cocktail gần 20$. Bù vào đó đừng bỏ lở giờ hạnh phúc tuyệt vời 17:30 đến 20:00, các loại thức ăn và đồ uống sẽ được giảm một nửa giá.`,
                type: 'Restaurant',
            },
            {
                name: 'Hồ Bơi Tràn Bờ Trên Cao',
                description:
                    'Hồ bơi tràn bờ dài 24m toạ lạc tại tầng cao nhất của Stellar như nối dài vô tận theo dòng sông Sài Gòn, tạo nên một không gian riêng tư và biệt lập giữa long đô thị nhiệt đới. Thư giãn trong làn nước xanh mát, bạn sẽ tìm thấy cảm giác thú vị như chỉ dành cho riêng mình khi chọn một ly cocktail yêu thích và nhìn ngắm một Sài Gòn li ti chuyển động trong tầm mắt.',
                type: 'Utilities',
            },
            {
                name: 'Phòng Tập Thể Thao',
                description:
                    'Phòng tập thể thao hiện đại mở cánh cửa bừng sáng đón chào ngày mới với những thiết bị tập luyện thể thao hiện đại và góc nhìn phủ khắp Sài Gòn từ trên cao. Dành một chút thời gian tập luyện cho cơ thể mỗi sớm, bạn sẽ có cả một ngày tràn đầy năng lượng để làm việc và tận hưởng chuyến đi khám phá thành phố.',
                type: 'Utilities',
            },
            {
                name: 'Stellar Spa',
                description: `Hòa mình vào không gian an lành, bạn sẽ được trải nghiệm những phương pháp chăm sóc tinh tế của Stellar Spa, từ hồ massage chân đến phòng trị liệu thiết kế tỉ mỉ. Tại đây, những bí mật trong nghệ thuật massage truyền thống Việt Nam sẽ được khám phá như một cuộc phiêu lưu trong Sài Gòn xưa. Hãy để những liệu pháp chăm sóc hiện đại và toàn diện đưa bạn vào trạng thái thư thái, cùng với nụ cười chân thành của nhân viên đón bạn về nhà. Đến với  Stellar Spa và trải nghiệm cảm giác nghỉ ngơi trọn vẹn`,
                type: 'Utilities',
            },
        ];

        let isExist = await utilitiesModel.insertMany(myUtilities);
        if (isExist) {
            printDebug('Insert Utilities success', OutputTypeDebug.SUCCESS);
        } else {
            printDebug('Insert Utilities fail', OutputTypeDebug.ERROR);
        }
    })
    .catch((error) => {
        printDebug(`Init database failed: \n ${error}`, OutputTypeDebug.ERROR);
    });
