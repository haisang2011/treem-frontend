export default (tenCha, tenMe, tenNguoiNuoi) => {
    let result = '';

    if(tenCha){
        result += tenCha;
    }

    if(tenMe){
        if(result){
            result += ', ' + tenMe;
        }else{
            result += tenMe;
        }   
    }

    if(tenNguoiNuoi){
        if(result){
            result += ', ' + tenNguoiNuoi;
        }else{
            result += tenNguoiNuoi;
        }   
    }

    return result;
}