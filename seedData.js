import express from 'express';
import * as  dotenvn from 'dotenv';
import { OutputType, print } from './src/helpers/print.js';
import connect from './src/database/database.js';

import { accountModel, accountInfoModel, bookingModel, roomModel, utilitieModel, contactModel } from './src/models/index.js';

const app = express();
app.use(express.json());
dotenvn.config();

connect()
    .then(async() => {
        const accountAdmin = [
            {
                name: 'admin',
                role: 'admin',
            }

        ]

    let isExistAccount = await accountModel.insertMany(accountAdmin);
    if (isExistAccount) {
            print( 'Insert account success', OutputType.SUCCESS);
    } else {
        print( 'Insert account fail', OutputType.ERROR);
    }
    })
    .then (async() => {
        const myRoom = [
            {
                roomNumber: '101',
                type: 'SuperiorDoubleOrTwin',
                acreage: 32,
                beadType: 'Double',
                capacity: '02 Người lớn',
                description:'Phòng nghỉ Stellar - Superior Double Or Twin mang đến sự ấm cúng bởi nét duyên dáng của lịch sử và những tiện nghi hiện đại nhất. Với sàn nhà kết hợp gỗ và gạch ốp, giường đôi thoải mái và đồ nội thất trang nhã, tất cả tạo nên sự cân bằng giữa “cổ điển” và “hiện đại”',
                price: 1000000,
            },
            {
                roomNumber: '102',
                type: 'SuperiorDoubleOrTwin',
                acreage: 32,
                beadType: 'Double',
                capacity: '02 Người lớn',
                description:'Phòng nghỉ Stellar - Superior Double Or Twin mang đến sự ấm cúng bởi nét duyên dáng của lịch sử và những tiện nghi hiện đại nhất. Với sàn nhà kết hợp gỗ và gạch ốp, giường đôi thoải mái và đồ nội thất trang nhã, tất cả tạo nên sự cân bằng giữa “cổ điển” và “hiện đại”',
                price: 1000000,
            },
            {
                roomNumber: '103',
                type: 'DeluxeDouble',
                acreage: 25,
                beadType: 'Double',
                capacity: '02 Người lớn',
                view: 'Thhành phố',
                description:'Phòng nghỉ Stellar - Deluxe Double, căn phòng ấm áp này mang lại sự hoàn hảo trong kỳ nghỉ tại Sài Gòn. Không gian làm việc kết nối với các tiện nghi phòng nghỉ, cùng giường ngủ với bộ chăn lông vũ êm ái, chất liệu cao cấp cùng dịch vụ phục vụ phòng tận nơi mang lại sự thoải mái và thư giãn tối đa.',
                price: 1200000,
            },
            {
                roomNumber: '104',
                type: 'ExecutiveCityView',
                acreage: 40,
                beadType: 'Single',
                capacity: '02 Người lớn',
                view: 'Thành phố',
                description:'Với hai cửa sổ lớn cho quang cảnh tuyệt vời nhìn ra thành phố, Phòng Executive City View mang lại cho quý khách một không gian thoáng đãng, rộng mở. được trang trí bằng sàn gỗ kết hợp gạch, những món đồ nội thất phảng phất phong cách Đông Dương kết hợp những tiện nghi hiện đại tạo nên một tổng thể hài hoà, đương đại mà quý khách có thể trải nghiệm để cảm nhận nét đẹp Sài Gòn chuẩn xác nhất',
                price: 1500000,
            },
            {
                roomNumber: '105',
                type: 'SuiteGarden',
                acreage: 40,
                beadType: 'Double',
                capacity: '02 Người lớn',
                view: 'Thành phố',
                description:'Phòng Suite Garden được phối hợp phong cách hiện đại với cảm hứng từ cây xanh, rộng rãi, hoàn hảo cho các kì nghỉ cuối tuần hay chuyến khám phá của quý khách. Ban công rộng và được sắp xếp để quý khách luôn cảm nhận được không khí trong lành, gió nhẹ lay và bóng mát từ các tán cây. Loại phòng nghỉ này đáp ứng đầy đủ nhu cầu ngắm nhìn đường phố, tận hưởng những giây phút đắm mình trong bồn tắm bể sục.',
                price: 2000000,
            }]
        let isExistRoom = await roomModel.insertMany(myRoom);
        if (isExistRoom) {
            print('Insert room success', OutputType.SUCCESS);
        } else {
            print('Insert room fail', OutputType.ERROR);
        }
            }
    )
    .then(async() => {
        {
            const myUtilitie = [
                {
                    name: 'NHÀ HÀNG BUFFET',
                    description:'Tọa lạc tầng 5, với góc nhìn đẹp hướng ra đại lộ Nguyễn Huệ, Stellar Hotel nổi bật với hơn 60 món ăn của đồng bằng sông Cửu Long được chế biến tỉ mỉ của gồm mì, bánh khọt, gỏi cuốn, đậu hũ, chè, hột vịt lộn và nước mát cũng như các món hải sản nướng. Ngoài ra, thực khách còn được thưởng thức các buổi trình diễn nhạc cụ truyền thống trong khi thưởng thức bữa ăn.\n Giờ mở cửa: \nBữa sáng: từ 6 giờ sáng đến 9 giờ sang hàng ngày.\n Ăn trưa: từ 11 giờ sáng đến 2 giờ chiều hàng ngày. \nBữa tối: từ 6 giờ tối đến 9 giờ 30 chiều hàng phục. '
                },
                {   name: 'STELLAR BAR',
                    description:'Stellar Hotel mang không khí của câu lạc bộ biển. Thường xuyên thu hút người nước ngoài ăn mặc bảnh bao và người dân địa phương đến đây giải trí thư giãn. Quán bar trên tầng thượng này được trang bị rất nhiều cây nhiệt đới, trang trí nội thất theo tông màu đen trắng. Sàn nhảy rộng và quầy bar đầy đủ dự trữ trên boong chính phục vụ đầy và nhiệt tình các khách hàng đến đây.\n Với một cái nhìn tuyệt đẹp của trung tâm Sài Gòn. Chill Skybar là một trong những hộp đêm nổi tiếng nhất trong thành phố. Ở đây bạn sẽ chứng kiến một Sài Gòn cực kì đẹp với thưởng thức nhạc dance hay hip hop sôi động đầy hấp dẫn. Nhưng đồ uống ở đây là rất tốn kém, chi phí của một cocktail gần 20$. Bù vào đó đừng bỏ lở giờ hạnh phúc tuyệt vời 17:30 đến 20:00, các loại thức ăn và đồ uống sẽ được giảm một nửa giá'
                },
                {
                    name : 'Hồ Bơi Tràn Bờ Trên Cao',
                    description:'Hồ bơi tràn bờ dài 24m toạ lạc tại tầng cao nhất của Stellar như nối dài vô tận theo dòng sông Sài Gòn, tạo nên một không gian riêng tư và biệt lập giữa long đô thị nhiệt đới. Thư giãn trong làn nước xanh mát, bạn sẽ tìm thấy cảm giác thú vị như chỉ dành cho riêng mình khi chọn một ly cocktail yêu thích và nhìn ngắm một Sài Gòn li ti chuyển động trong tầm mắt.'
                },
                {
                    name: 'PHÒNG TẬP GYM',
                    description:'Phòng tập thể thao hiện đại mở cánh cửa bừng sáng đón chào ngày mới với những thiết bị tập luyện thể thao hiện đại và góc nhìn phủ khắp Sài Gòn từ trên cao. Dành một chút thời gian tập luyện cho cơ thể mỗi sớm, bạn sẽ có cả một ngày tràn đầy năng lượng để làm việc và tận hưởng chuyến đi khám phá thành phố.'
                },
                {
                    name: 'SPA STELLAR',
                    description:'Hòa mình vào không gian an lành, bạn sẽ được trải nghiệm những phương pháp chăm sóc tinh tế của Stellar Spa, từ hồ massage chân đến phòng trị liệu thiết kế tỉ mỉ. Tại đây, những bí mật trong nghệ thuật massage truyền thống Việt Nam sẽ được khám phá như một cuộc phiêu lưu trong Sài Gòn xưa. Hãy để những liệu pháp chăm sóc hiện đại và toàn diện đưa bạn vào trạng thái thư thái, cùng với nụ cười chân thành của nhân viên đón bạn về nhà. Đến với  Stellar Spa và trải nghiệm cảm giác nghỉ ngơi trọn vẹn nhất trong không gian thiết kế độc đáo tại Khách sạn  Stellar.'
                }
            ]
        }
    })