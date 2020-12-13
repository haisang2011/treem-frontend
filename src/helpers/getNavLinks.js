const ROLE_CITY = 1;
const ROLE_WARD = 2;

export const navLinks = [
    {
        title : "Hệ thống",
        dropdown : [
            {
                subTitle : "Quản trị người dùng",
                subPath : '/quantringuoidung',
                role : ROLE_CITY,
            },
            {
                subTitle : "Quản trị địa phương",
                subPath : '/quantridiaphuong',
                role : ROLE_WARD
            },
            {
                subTitle : "Nhật ký hoạt động",
                subPath : '/nhatkyhoatdong'
            },
            {
                subTitle : "Đăng xuất",
                subPath : '/logout'
            }
        ]
    },
    {
        title : "Quản lý hồ sơ trẻ em",
        dropdown : [
            {
                subTitle : "Nhập liệu trẻ em khác GĐ",
                notHref : true,
                role : ROLE_WARD
            },
            {
                subTitle : "Nhập liệu trẻ em cùng GĐ",
                notHref : true,
                role : ROLE_WARD
            },
            {
                subTitle : "Tìm kiếm thông tin trẻ em",
                subPath : '/quanlytreem'
            },
        ]
    },
    {
        title : "Hoàn cảnh đặc biệt",
        path : '/hoancanhdacbiet'
    },
    {
        title : "Nguy cơ rơi HCĐB",
        path : '/nguycohoancanhdacbiet'
    },
    {
        title : "Hoàn cảnh khác",
        path : "/hoancanhkhac"
    },
    {
        title : "Hình thức trợ giúp",
        path : "/hinhthuctrogiup"
    },
    {
        title : "Khai thác trẻ em",
        dropdown : [
            {
                subTitle : "Danh sách trẻ em",
                subPath : '/khaithactreem'
            },
            {
                subTitle : "Danh sách trẻ em bình thường",
                subPath : '/khaithactreembinhthuong'
            },
            {
                subTitle : "Danh sách trẻ em theo đối tượng",
                subPath : '/khaithactreemdoituong'
            },
            {
                subTitle : "Danh sách hộ gia đình",
                subPath : '/khaithachogiadinh'
            },
            {
                subTitle : "Tổng hợp báo cáo",
                subPath : '/tonghopbaocao'
            },
        ]
    },
    {
        title : "Trợ giúp",
        path : "/trogiup"
    }
]