export default (thon, phuongXa, quanHuyen, tinh, letter) => {
    let result = `${thon} - ${phuongXa} - ${quanHuyen} - ${tinh}`;

    result = result.slice(0, letter);
    result = result + '...';

    return result;
}