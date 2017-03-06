(function (window, document, $, undefined) {
  
  'use strict';

  $.fn.box4 = function(h = 50, v = 50) {
    return this.each(function() {

      var horizontalPercentage = h;
      var verticalPercentage = v;
      var resizeType = null;
      var container = $(this);
      console.log(horizontalPercentage, verticalPercentage)

      function init() {

        var handler = {
          v: $('<div class="box4-handler" data-direction="vertical"></div>'),
          h: $('<div class="box4-handler" data-direction="horizontal"></div>'),
          c: $('<div class="box4-handler" data-direction="center"></div>')
        }
        
        container
        .append(handler.v, handler.h, handler.c)
        .on('mousedown touchstart', function(e) {
          let target = $(e.target);

          if (target.hasClass('box4-handler')) {
            resizeType = target.data('direction');
            e.preventDefault();
            e.stopPropagation();
          }
        })
        .find(handler.c)
        .on('dblclick', function(e){
          horizontalPercentage = verticalPercentage = 50;
          redraw();
          e.preventDefault();
          e.stopPropagation();
        });
        
        $(document)
        .on('mouseup touchend', function(e) {
          resizeType = null;
        })
        .on('mousemove touchmove', function(e) {
          
          if (!resizeType) return;

          let c = container.get(0);
          let r = c.getBoundingClientRect();
          let [mouseX, mouseY] = [e.pageX - r.left - window.scrollX, e.pageY - r.top - window.scrollY];

          switch (resizeType) {
            case 'vertical':
              horizontalPercentage = mouseX / c.offsetWidth * 100;
              break;
            case 'horizontal':
              verticalPercentage = mouseY / c.offsetHeight * 100;
              break;
            case 'center':
              horizontalPercentage = mouseX / c.offsetWidth * 100;
              verticalPercentage = mouseY / c.offsetHeight * 100;
              break;
          }
          horizontalPercentage = horizontalPercentage > 100 ? 100 : horizontalPercentage < 0 ? 0 : horizontalPercentage;
          verticalPercentage = verticalPercentage > 100 ? 100 : verticalPercentage < 0 ? 0 : verticalPercentage;

          redraw();
          e.preventDefault();
          e.stopPropagation();
        });

        redraw();
      }

      function redraw() {
        container.find('>.box4-box.left').each((i,t)=>t.style.width = horizontalPercentage + '%');
        container.find('>.box4-box.right').each((i,t)=>t.style.width = (100 - horizontalPercentage) + '%');
        container.find('>.box4-box.top').each((i,t)=>t.style.height = verticalPercentage + '%');
        container.find('>.box4-box.bottom').each((i,t)=>t.style.height = (100 - verticalPercentage) + '%');
        container.find('>.box4-handler[data-direction=horizontal]').each((i,t) => t.style.top = verticalPercentage + '%');
        container.find('>.box4-handler[data-direction=vertical]').each((i,t) => t.style.left = horizontalPercentage + '%');
        container.find('>.box4-handler[data-direction=center]').each((i,t) => {
          t.style.top = verticalPercentage + '%';
          t.style.left = horizontalPercentage + '%';
        });
      }

      init();
    });
  };
} (window, document, jQuery));