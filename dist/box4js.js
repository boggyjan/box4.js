'use strict';

(function (window, document, $, undefined) {

  'use strict';

  $.fn.box4 = function () {
    return this.each(function () {

      var verticalPercentage = 50;
      var horizontalPercentage = 50;
      var resizeType = null;
      var container = $(this);

      function init() {

        var handler = {
          v: $('<div class="box4-handler" data-direction="vertical"></div>'),
          h: $('<div class="box4-handler" data-direction="horizontal"></div>'),
          c: $('<div class="box4-handler" data-direction="center"></div>')
        };

        container.append(handler.v, handler.h, handler.c).on('mousedown', function (e) {
          var target = $(e.target);

          if (target.hasClass('box4-handler')) {
            resizeType = target.data('direction');
            e.preventDefault();
            e.stopPropagation();
          }
        }).find(handler.c).on('dblclick', function (e) {
          horizontalPercentage = verticalPercentage = 50;
          redraw();
          e.preventDefault();
          e.stopPropagation();
        });

        $(document).on('mouseup', function (e) {
          resizeType = null;
        }).on('mousemove', function (e) {

          if (!resizeType) return;

          var c = container.get(0);
          var r = c.getBoundingClientRect();
          var mouseX = e.pageX - r.left - window.scrollX,
              mouseY = e.pageY - r.top - window.scrollY;


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
        container.find('>.box4-box.left').each(function (i, t) {
          return t.style.width = horizontalPercentage + '%';
        });
        container.find('>.box4-box.right').each(function (i, t) {
          return t.style.width = 100 - horizontalPercentage + '%';
        });
        container.find('>.box4-box.top').each(function (i, t) {
          return t.style.height = verticalPercentage + '%';
        });
        container.find('>.box4-box.bottom').each(function (i, t) {
          return t.style.height = 100 - verticalPercentage + '%';
        });
        container.find('>.box4-handler[data-direction=horizontal]').each(function (i, t) {
          return t.style.top = verticalPercentage + '%';
        });
        container.find('>.box4-handler[data-direction=vertical]').each(function (i, t) {
          return t.style.left = horizontalPercentage + '%';
        });
        container.find('>.box4-handler[data-direction=center]').each(function (i, t) {
          t.style.top = verticalPercentage + '%';
          t.style.left = horizontalPercentage + '%';
        });
      }

      init();
    });
  };
})(window, document, jQuery);