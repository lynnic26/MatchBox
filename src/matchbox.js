define(function(require) {
    var Widget = require('Widget');
    function HoteLayer() {
        this.cfg = {
        	width: '430',
        	height: '200',
        	hasCloseBtn: true,
        	title: '提示',
        	hasMask: true,
            content: '在此添加显示文字',
            text4ConfirmBtn: '确定',
            text4CancelBtn: '取消',
            text4OkBtn: '确定',
            okHandler: null,
            confirmHandler: null,
            cancelHandler: null,
            closeHandler: null
        }   
    }
    HoteLayer.prototype = $.extend({}, new Widget(), {
        renderUI: function() {
            var footerContent = null;
            switch(this.cfg.boxType) {
                case 'alert': 
                    footerContent = '<a class="btn-confirm">' + this.cfg.text4OkBtn + '</a>';
                break;
                case 'confirm':
                    footerContent = '<a class="btn-confirm">' + this.cfg.text4ConfirmBtn + '</a>' +
                                    '<a class="btn-cancel">' + this.cfg.text4CancelBtn + '</a>';
                break;
            }
            this.boundingBox = $(
                    '<div class="matchbox">' + 
                        '<h1 class="matchbox-head">' + this.cfg.title + ' </h1>' + 
                        '<div class="matchbox-body">' + this.cfg.content + '</div>' + 
                        '<div class="matchbox-footer">' + footerContent + '</div>' +   
                    '</div>'
                );
            if(this.cfg.hasMask) {
                this._mask = $('<div class="matchbox-mask"></div>');
                this._mask.appendTo('body');
            }
            if(this.cfg.hasCloseBtn) {
                var closeBtn = $('<span class="matchbox-close"><span class="v"></span><span class="h"></span></span>');
                this.boundingBox.append(closeBtn);
                this.boundingBox.appendTo(document.body);
            }
        },
        bindUI: function() {
            this.boundingBox.
                on('click', '.btn-ok', $.proxy(function() {
                    this.fire('ok');
                    this.destroy();
                }, this)).
                on('click', '.matchbox-close', $.proxy(function() {
                    this.fire('close');
                    this.destroy();
                }, this)).
                on('click', '.btn-confirm', $.proxy(function() {
                    this.fire('confirm');
                    this.destroy();
                }, this)).
                on('click', '.btn-cancel', $.proxy(function() {
                    this.fire('cancel');
                    this.destroy();
                }, this));

            if(this.cfg.okHandler) {
                this.on('ok', this.cfg.okHandler);
            }  
            if(this.cfg.closeHandler) {
                this.on('close', this.cfg.closeHandler);
            }
            if(this.cfg.confirmHandler) {
                this.on('confirm', this.cfg.confirmHandler);
            }
            if(this.cfg.cancelHandler) {
                this.on('cancel', this.cfg.cancelHandler);
            }
        },
        syncUI: function() {
            this.boundingBox.css({
                'width': this.cfg.width + 'px',
                'height': this.cfg.height + 'px'
            });
        },
        destructor: function() {
            this._mask && this._mask.remove();
        },
        alert: function(cfg) {
            $.extend(this.cfg, cfg, {
                boxType: 'alert'
            });
            this.render();
            return this;
        },
        confirm: function(cfg) {
            $.extend(this.cfg, cfg, {
                boxType: 'confirm'
            });
            this.render();
            return this;
        },
        confirmxx: function(cfg) {
            var CFG = $.extend(this.cfg, cfg, {
                boxType: 'confirm'
            });
            var box = $('<div class="hotel-layer"></div>');
             var head = $('<h1 class="layer-head"><span>' + CFG.title + '</span></h1>');
            var content = $('<div class="layer-body"></div>');
            var footer = $('<div class="layer-footer"></div>');
            var closeBtn = $('<span class="layer-close"><span class="v"></span><span class="h"></span></span>');
            var confirmBtn = $('<a class="btn-confirm">' + CFG.text4Btn +'</a>');
            var cancelBtn =  $('<a class="btn-cancel">' + CFG.text4CancelBtn + '</a>');
            footer.append(confirmBtn).append(cancelBtn);
            if(CFG.layerClass) {
                box.addClass(CFG.layerClass);
            }
            if(CFG.content) {
                content.html(CFG.content);
            }
            if(CFG.htmlStr) {
                content.html(CFG.htmlStr);
            }
            
            box.append(head).append(content).append(closeBtn);
            if(!CFG.noFooter) {
                box.append(footer);
            }
            box.appendTo('body'); 
            box.css({
                'width': CFG.width
            });
            if(!CFG.htmlStr) {
                content.css({
                    'height': CFG.height - 114 + 'px'
                });
            }
            
            
            if(CFG.hasMask) {
                var mask = $('<div class="layer-mask"></div>');
                mask.appendTo('body');
            }
            closeBtn.on('click', function() {
                CFG.handle4Cancel && CFG.handle4Cancel();
                box.remove();
                mask.remove();
            });
            cancelBtn.on('click', function() {
                CFG.handle4Cancel && CFG.handle4Cancel();
                box.remove();
                mask.remove();
            });
            confirmBtn.on('click', function() {

                //若handle4Confirm返回false或者undefined，则关闭窗口
                //若handle4Confirm返回true，则不关闭窗口
                if(CFG.handle4Confirm && !CFG.handle4Confirm()) {   
                    box.remove();
                    mask.remove();
                }else if(!CFG.handle4Confirm) {
                    box.remove();
                    mask.remove(); 
                }
            });   
            return this;               
        },
        prompt: function() {

        },
        tips: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var box = $('<div class="hotel-layer tips"></div>');
            var content = $('<div class="layer-body"></div>');
            var mask = $('<div class="layer-mask"></div>');
            
            if(!CFG.content) {
               CFG.content = "请填写参数";
            }
            var show = $('<span class="tips-content">' + CFG.content + '</span>');
            if(CFG.type) {
                var icon = $('<i></i>');
                var iconClass = 'icon-' + CFG.type;
                icon.addClass('icon ' + iconClass);
                show.prepend(icon);
            }
            if(CFG.last) {
                var last = CFG.last;
            }else {
                var last = 3000;
            }
            content.append(show);
            mask.appendTo('body');
            content.appendTo(box);
            box.appendTo('body');

            setTimeout(function() {
                mask.remove();
                box.remove();
                CFG.callback && CFG.callback();
            }, last);
        }
    });
    return HoteLayer;
});

