// 白板管理
var bmsboard = function () {
    var common = function(){
        // 撤销/重做状态改变
        this.teduBoard.on(TEduBoard.EVENT.TEB_OPERATE_CANUNDO_STATUS_CHANGED, (data) => {
            console.log('======================:  ', 'TEB_OPERATE_CANUNDO_STATUS_CHANGED');
        });
        
        this.teduBoard.on(TEduBoard.EVENT.TEB_OPERATE_CANREDO_STATUS_CHANGED, (data) => {
            console.log('======================:  ', 'TEB_OPERATE_CANREDO_STATUS_CHANGED');
        });

        // 新增白板
        this.teduBoard.on(TEduBoard.EVENT.TEB_ADDBOARD, (boardId, fid) => {
            console.log('======================:  ', 'TEB_ADDBOARD');
            proBoardData();
        });

        this.teduBoard.on(TEduBoard.EVENT.TEB_SYNCDATA, (data) => {
            console.log('======================:  ', 'TEB_SYNCDATA');
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_INIT, () => {
            this.bmsim.speakstatus('', this.room.roomspeak);
            console.log('======================:  ', 'TEB_INIT');
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_ERROR, (code, msg) => {
            console.log('======================:  ', 'TEB_ERROR', ' code:', code, ' msg:', msg);
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_WARNING, (code, msg) => {
            console.log('======================:  ', 'TEB_WARNING');
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_IMAGE_STATUS_CHANGED, (code, data) => {
            console.log('======================:  ', 'TEB_IMAGE_STATUS_CHANGED');
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_DELETEBOARD, (boardId, fid) => {
            console.log('======================:  ', 'TEB_DELETEBOARD');
            proBoardData();
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_GOTOBOARD, () => {
            console.log('======================:  ', 'TEB_GOTOBOARD');
            proBoardData();
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_ADDH5PPTFILE, () => {
            console.log('======================:  ', 'TEB_ADDH5PPTFILE');
            proBoardData();
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_ADDFILE, () => {
            console.log('======================:  ', 'TEB_ADDFILE');
            proBoardData();
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_DELETEFILE, () => {
            console.log('======================:  ', 'TEB_DELETEFILE');
            proBoardData();
        });

        this.teduBoard.on(TEduBoard.EVENT.TEB_FILEUPLOADSTATUS, (code, info) => {
            console.log('======================:  ', 'TEB_FILEUPLOADSTATUS');
        });

        this.teduBoard.on(TEduBoard.EVENT.TEB_SWITCHFILE, () => {
            console.log('======================:  ', 'TEB_SWITCHFILE');
            proBoardData();
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_SETBACKGROUNDIMAGE, (fileName, fileUrl, userData) => {
            console.log('======================:  ', 'TEB_SETBACKGROUNDIMAGE');
        });
        this.teduBoard.on(TEduBoard.EVENT.TEB_FILEUPLOADPROGRESS, (code, data) => {
            console.log('======================:  ', 'TEB_FILEUPLOADPROGRESS');
        });
    };
    
    // 设置全局背景色
    var setGlobalColor = function(color) {
        this.teduBoard.setGlobalBackgroundColor(color);
    };

    // 设置当前页背景色
    var setBgColor = function(color) {
      this.teduBoard.setBackgroundColor(color);
    };

    // 设置涂鸦颜色
    var setColor = function(color) {
      this.teduBoard.setBrushColor(color);
    };

    // 设置涂鸦类型
    var setType = function(type) {
      this.teduBoard.setToolType(type);
    };

    // 设置涂鸦粗细
    var setThin = function(num) {
      this.teduBoard.setBrushThin(num);
    };

    // 清空当前页涂鸦(保留背景色/图片)
    var clearDraws = function() {
      this.teduBoard.clear();
    };

    // 清空当前页涂鸦 + 背景色/图片
    var clear = function() {
      this.teduBoard.clear(true);
    };

    // 清除全局背景色
    var clearGlobal = function() {
      this.teduBoard.clearGlobalBgColor();
    };

    // 回退
    var revert = function() {
      this.teduBoard.undo();
    };

    // 恢复
    var process = function() {
      this.teduBoard.redo();
    };

    // 动画上一步
    var prevStep = function() {
      this.teduBoard.prevStep();
    };

    // 动画下一步
    var nextStep = function() {
      this.teduBoard.nextStep();
    };

    /**
     * 上一页
     */
    var prevBoard = function() {
      this.teduBoard.prevBoard();
    };

    /**
     * 下一页
     */
    var nextBoard = function() {
      this.teduBoard.nextBoard();
    };

    /**
     * 新增一页
     */
    var addBoard = function() {
      this.teduBoard.addBoard();
    };

    /**
     * 删除当前页
     */
    var deleteBoard = function() {
      this.teduBoard.deleteBoard();
    };
    
    var liveboard = function(){
        var _this = this;
        
        $(document).on("click",".showoption",function(){
            if($(this).next('.choose-drop-down').css('display')=='none'){
                $('.choose-drop-down').css('display', 'none');
                $(this).next('.choose-drop-down').css('display', 'block');
            }else{
                $('.choose-drop-down').css('display', 'none');
            }
        });
        
        $(document).on("click",".prevBoard",function(){
            prevBoard();
        });
        
        $(document).on("click",".nextBoard",function(){
            nextBoard();
        });
        
        $(document).on("click",".addBoard",function(){
            addBoard();
        });
        
        $(document).on("click",".deleteBoard",function(){
            deleteBoard();
        });
        
        $(document).on("click",".tool-bgcolor li",function(){
            var color = $(this).find('span').attr('class');
            $('.tool-bgcolor .choose-state span').attr('class', color);
            setColor($(this).attr('data-type'));
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".paint-brush li",function(){
            setType('line');
            setThin($(this).attr('data-type'));
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".graphical-size li",function(){
            setThin($(this).attr('data-type'));
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".graphicalul li",function(){
            if ($(this).index()==0) {
                setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_RECT);
            } else if ($(this).index()==1) {
                setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_RECT_SOLID);
            } else if ($(this).index()==2) {
                setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_OVAL);
            } else if ($(this).index()==3) {
                setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_OVAL_SOLID);
            }
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".eraser",function(){
            setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_ERASER);
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".recselect",function(){
            setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_RECT_SELECT);
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".pointselect",function(){
            setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_POINT_SELECT);
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".straight-line",function(){
            setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_LINE);
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".cleardraw",function(){
            clearDraws();
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".boardtext",function(){
            setType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_TEXT);
            _this.teduBoard.setTextSize(600);
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".clears",function(){
            clear();
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".revert",function(){
            revert();
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".process",function(){
            process();
            $('.choose-drop-down').css('display', 'none');
        });
        
        $(document).on("click",".filebtn",function(){
            var id = $(this).attr('data-id');
            var status = $(this).attr('data-status');
            var url = $(this).attr('data-url');
            if (_this.fileload == true) {
                _this.bmsim.toast('文件正在加载，请稍后');
            } else {
               if (status == 0 || status == 2) {
                   _this.fileload = true;
                   $('#fileSelector').attr('data-id', id);
                   $('#fileSelector').val(url);
                   $('#fileSelector').change();
               } else if (status == 1) {
                   
               }
            }
        });
        
        $(document).on("click",".uploadbtn",function(){
            if (_this.fileload == true) {
                _this.bmsim.toast('文件正在加载，请稍后');
            } else {
                $('#fileSelector').click();
            }
        });
        
        $(document).on("change","#fileSelector",function(){
            var id = $(this).attr('data-id');
            if ($(this).val() != '') {
                var file = document.getElementById('fileSelector').files[0];
                _this.bmsim.toast('文件正在加载，请稍后');
                _this.teduBoard.addFile({
                    data: file,
                }, (total, data) => {
                    console.log(total);
                    console.log(data);
                    // $(this).attr('data-id', '');
                    // $('.files'+id).attr('data-status', 1);
                    // _this.fileload = false;
                    // _this.bmsajax.uploadstatus(id, 1);
                }, (err) => {
                    _this.bmsim.toast('文件加载失败，请重试');
                    $(this).attr('data-id', '');
                    $('.files'+id).attr('data-status', 2);
                    _this.fileload = false;
                    _this.bmsajax.uploadstatus(id, 2);
                });
            }
        });
        
        $(document).on("click",".boardTab li",function(){
            var fid = $(this).attr('data-id');
            switchFile(fid);
        });
        
        $(document).on("click",".boardTab i",function(){
            $(this).parent('li').hide();
            return false;
        });
    };
    
    // 白板事件回调处理
    var proBoardData = function() {
        this.currentFile = this.teduBoard.getCurrentFile();
        this.boardFileGroup = this.teduBoard.getFileInfoList();
        var currentBoard = this.teduBoard.getCurrentBoard();
        var boards = this.teduBoard.getFileBoardList(this.currentFile);
        $(".allPage").html((boards.indexOf(currentBoard) + 1) + " / " + boards.length);
        boardtab();
    };
    
    // 切换文件
    var switchFile = function(fid) {
        this.teduBoard.switchFile(fid);
    };

    // 删除文件
    var deleteFile = function(fid) {
        this.teduBoard.deleteFile(fid);
    };
    // 重绘
    var resize = function(){
        this.teduBoard.resize();
    }
    
    var boardtab = function () {
        var str = "";
        var title = "";
        var _this = this;
        $.each(this.boardFileGroup, function(i, v){
            title = v.title == '#DEFAULT' ? '默认页' : v.title+'<i class="layui-icon">&#x1007;</i>';
            str += "<li data-id='"+v.fid+"' ";
            if (_this.currentFile == v.fid) {
                str += "class='active'";
            }
            str += ">"+title+"</li>";
        });
        $(".boardTab").html(str);
    };
    
    return {
        init: function () {
            common();
            liveboard();
        },
        resize: function () {
            resize();
        }
    };

}();