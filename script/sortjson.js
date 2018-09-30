/**
 * Created with PyCharm.
 * User: jennyzhang
 * Date: 16-12-7
 * Time: 下午3:33
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function () {
    //对json进行降序排序函数
    var colId="age"
    var desc = function(x,y)
    {
        return (x[mod_type] < y[mod_type]) ? 1 : -1
    }
    //对json进行升序排序函数
    var asc = function(x,y)
    {
        return (x[mod_type] > y[mod_type]) ? 1 : -1
    }
    var arr2 = [
        {name:"kitty", age:12},
        {name:"sonny", age:9},
        {name:"jake", age:13},
        {name:"fun", age:24}
    ];
    document.writeln("按age进行升序排序：<br>");
    arr2.sort(asc); //升序排序
    document.writeln(JSON.stringify(arr2));


    document.writeln("<br>按age进行降序排序：<br>");
    arr2.sort(desc); //降序排序
    document.writeln(JSON.stringify(arr2));

});
