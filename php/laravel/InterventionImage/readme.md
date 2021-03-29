# [Intervention Image](http://image.intervention.io/)
首先使用 composer 安裝
```
composer require intervention/image
```
修改 config/app.php 將服務註冊至 Laravel
```
'providers' => [
    // ...
    Intervention\Image\ImageServiceProvider::class,
    // ...
  ],

'aliases' => [
    // ...
    'Image' => Intervention\Image\Facades\Image::class,
    // ...
  ],
```
## Controller
上傳圖片
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  Intervention\Image\ImageManagerStatic as Image;

class ImageController extends Controller
{
    private $imgdir = './img/';

    public function upload(Request $q)
    {
        $q->validate(['photo' => 'mimes:jpeg,jpg,png,gif|required|max:10000']);
        if (!($q->file('photo')->isValid())) {
            return response('Invalid file.', 400);
        }

        Image::make($q->file('photo'))->save($this->imgdir . uniqid() . '.' . $q->file('photo')->extension());
        return response()->redirectToRoute('image');
    }
}
```
調整圖片尺寸
```
// resize the image to a height of 200 and constrain aspect ratio (auto width)
$img->resize(null, 200, function ($constraint) {
    $constraint->aspectRatio();
});

// prevent possible upsizing
$img->resize(null, 400, function ($constraint) {
    $constraint->aspectRatio();
    $constraint->upsize();
});
```
加浮水印
```
$img->insert('public/watermark.png', 'bottom-right', 10, 10);
```
