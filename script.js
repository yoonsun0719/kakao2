var page=1;
getList();
$("#txtQuery").on("keydown",function(e){
    if(e.keyCode==13){
        page=1;
        getList();
    }
});
$("#btnSearch").on("click",function(){
    page=1;
    getList();
});
$("#selSize").on("change",function(){
    page=1;
    getList();
});
$("#btnPre").on("click",function(){
    page--;
    getList();
});
$("#btnNext").on("click",function(){
    page++;
    getList();
});
function getList(){
    var query=$("#txtQuery").val();
    var size=$("#selSize").val();
    $.ajax({ /*api 호출하는 에이작*/
        type:"get",
        url:url,
        headers:{"Authorization": "KakaoAK 296843c37a5753ce7961fe40ba389811"},
        data:{"query":query,"size":size,"page":page},
        datatype:"json",/*받는 형태 json*/
        success:function(data){
            var temp=Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data));

            var lastPage=Math.ceil(data.meta.pageable_count/size);
            $("#spanPage").html(page+"/"+lastPage);
            if(page==1){
                $("btnPre").attr("disabled",true);
            }else{
                $("#btnPre").attr("disabled",false);
            }
            if(page==lastPage){
                $("btnNext").attr("disabled",true);
            }else{
                $("btnNext").attr("disabled",true);
            }
        } 
    });
}