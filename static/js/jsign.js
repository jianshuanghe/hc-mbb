$(function(){
    /*$('.sign-name').on('mousedown',function(){
       $('.sign-name').remove(); 
    })*/
    get_WH();       
    function get_WH(){
        var signBxH = $('.esign-bx').height();
        // console.log(signBxH, '宽度1');
        var signBxW = $('.esign-sign').width();
        // console.log(signBxW, '高度1');
        //初始化插件 
        //设置canvas宽度和高度 
        var dHeight = signBxH;  
        var dWidth = signBxW;
        $("#SignTb").jSignature({height:dHeight,width:dWidth, signatureLine:true});//初始化调整手写屏大小
        $("#SignBb").jSignature({height:dHeight,width:dWidth, signatureLine:true});//初始化调整手写屏大小 
  
    }; 
    // 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》
    //投保存签名 page1
    $('#OkTb').click(function(){
        var $sigdiv = $("#SignTb"); 
        var datapairT1 = $sigdiv.jSignature("getData", "svgbase64") 
        sessionStorage['signImgTB'] =  datapairT1;
        if (datapairT1[1].length<=312) {
        } else {
            window.location.href='SignFigure'
        }
    })
    //清除图片
    $('#ClearTb').click(function(){
        var $sigdiv = $("#SignTb");  
        $sigdiv.jSignature("reset");  
        $("#images img").remove(); 
        sessionStorage.removeItem('signImgTB'); // 清空本页
    })
    // ---------------------------------------------------------------
    
    // 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》
    //被投保存签名page1
    $('#OkBb').click(function(){
        var $sigdiv = $("#SignBb"); 
        var datapairB1 = $sigdiv.jSignature("getData", "svgbase64") 
        sessionStorage['signImgBB'] =  datapairB1;
        var name = sessionStorage.getItem('signName');
        if (datapairB1[1].length<=312) {
        } else {
            if (name === 'BB') {
                window.location.href='SignFigure'
            };
            if (name === 'BBD') {
                window.location.href='MessageSign'
            };
        }
    })
    //清除图片
    $('#ClearBb').click(function(){
        var $sigdiv = $("#SignBb");  
        $sigdiv.jSignature("reset");  
        $("#images img").remove();
        sessionStorage.removeItem('signImgBB'); // 清空本页
    })
    // ---------------------------------------------------------------
});

