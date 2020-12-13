// setDataSubmit({
        //     tinhthanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
        //     quanhuyen: value.quanhuyen ? value.quanhuyen : '',
        //     phuongxa: value.quanhuyen ? value.quanhuyen : '',
        //     thon : value.thon ? value.thon : '',
        //     id_giadinh: value.id_giadinh ? value.id_giadinh : '',
        //     hotencha: value.hotencha ? value.hotencha : '',
        //     hotenme: value.hotenme ? value.hotenme : '',
        //     nguoinuoiduong: value.nguoinuoiduong ? value.nguoinuoiduong : '',
        //     sodienthoai: value.sodienthoai ? value.sodienthoai : '',
        //     diachi: value.diachi ? value.diachi : '',
        //     id_treem: value.id_treem ? value.id_treem : '',
        //     hoten : value.hoten ? value.hoten : '',
        //     ngaysinh : value.ngaysinh ? value.ngaysinh : '',
        //     dantoc : value.dantoc ? value.dantoc : '',
        //     gioitinh : value.gioitinh ? value.gioitinh : '',
        //     lophoccaonhat : value.lophoccaonhat ? value.lophoccaonhat : '',
        //     tinhtranghoctap : value.tinhtranghoctap ? value.tinhtranghoctap : '',
        //     ghichu : value.ghichu ? value.ghichu : '',
        //     id_hoancanh : hoancanh,
        //     id_trogiup : trogiup,
        // })


    // const [dataSubmit, setDataSubmit] = React.useState({
    //     tinhthanhpho: '',
    //     quanhuyen: '',
    //     phuongxa: '',
    //     thon : '',
    //     hoten: '',
    //     nguoinuoi: '',
    //     id_giadinh: '',
    //     thungrac: '',
    //     dantoc: '',
    //     gioitinh: '',
    // });

    // dataSubmit = {
    //     fieldSelected: dataSelected,
    //     valueForm: values
    // }










//     const Excel = require('exceljs');

// // Create workbook & add worksheet
// const workbook = new Excel.Workbook();
// const worksheet = workbook.addWorksheet('ExampleSheet');

// // add column headers
// worksheet.columns = [
//   { header: 'Package', key: 'package_name' },
//   { header: 'Author', key: 'author_name' }
// ];

// // Add row using key mapping to columns
// worksheet.addRow(
//   { package_name: "ABC", author_name: "Author 1" },
//   { package_name: "XYZ", author_name: "Author 2" }
// );

// // Add rows as Array values
// worksheet
//   .addRow(["BCD", "Author Name 3"]);

// // Add rows using both the above of rows
// const rows = [
//   ["FGH", "Author Name 4"],
//   { package_name: "PQR", author_name: "Author 5" }
// ];


// worksheet
//   .addRows(rows);

// // save workbook to disk
// workbook
//   .xlsx
//   .writeFile('sample.xlsx')
//   .then(() => {
//     console.log("saved");
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
