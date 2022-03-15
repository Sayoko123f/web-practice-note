# Vertically center
## 1 Text
```css
  .outer {
  position: absolute;
  display: table;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.middle {
  display: table-cell;
  vertical-align: middle;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  /* Whatever width you want */
}
```
```html
<div class="outer">
  <div class="middle">
    <div class="inner">
      <h1>The Content</h1>
      <p>Once upon a midnight dreary...</p>
    </div>
  </div>
</div>
```

## 2 Text
```css
.Center-Container {
  position: relative;
  height: 100%;
}

.Absolute-Center {
  position: absolute;
  width: 50%;
  height: 50%;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  border: solid black;
  overflow: auto;
}
```

## 3 Image 
```css
.container {
    height: 160px; /* Can be anything */
    width: 160px; /* Can be anything */
    position: relative;
}
img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```
```html

<div class="container">
  <img src="foo"/>
</div>
```

## 4 Image
```css
div {
    position: relative;
    width: 200px;
    height: 200px;
}
img {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}
/* If you wish to also horizontally align the image, add left:0; right: 0; to img */
.image {
    min-height: 50px
}
```

## 5 Image
```css
.frame {
    height: 25px;      /* equals max image height */
    width: 160px;
    border: 1px solid red;
    white-space: nowrap;
    margin: 1em 0;
    text-align: center;
}

.helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

img {
    background: #3A6F9A;
    vertical-align: middle;
    max-height: 25px;
    max-width: 160px;
}
```
```html
<div class="frame">
    <span class="helper"></span><img src="http://jsfiddle.net/img/logo.png" height="250" />
</div>
<div class="frame">
    <span class="helper"></span><img src="http://jsfiddle.net/img/logo.png" height="25" />
</div>
<div class="frame">
    <span class="helper"></span><img src="http://jsfiddle.net/img/logo.png" height="23" />
</div>
<div class="frame">
    <span class="helper"></span><img src="http://jsfiddle.net/img/logo.png" height="21" />
</div>
<div class="frame">
    <span class="helper"></span><img src="http://jsfiddle.net/img/logo.png" height="19" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="17" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="15" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="13" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="11" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="9" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="7" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="5" />
</div>
<div class="frame">
    <span class="helper"></span>
    <img src="http://jsfiddle.net/img/logo.png" height="3" />
</div>
```