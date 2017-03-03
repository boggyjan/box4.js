# Box4.js

#### Resizable 2x2 grid

### Usage

```html
<div class="box4">
  <div class="box4-box left top">left top content</div>
  <div class="box4-box right top">right top content</div>
  <div class="box4-box left bottom">left bottom content</div>
  <div class="box4-box right bottom">right bottom content</div>
</div>
```

```javascript
$(function(){
  $('.box4').box4();
});
```

## Options
You can custom percentage numbers for vertical and horizontal grid size by fill v and h params. $('.box4').box4(v, h);
ex: $('.box4').box4(20, 60);

## Demo
Click [here](https://boggyjan.github.io/box4.js/test/) for a demo and to see how to use it.