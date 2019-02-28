from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
# 缩放图片
def handle_image():
    im = Image.open('test.jpg')
    w, h = im.size
    print('原图片的尺寸 %s %s' % (w, h))
    # 缩放到50%:
    im.thumbnail((w//2, h//2))
    print('处理后的尺寸 %s %s' % (w//2, h//2))
    # 把缩放后的图像用jpeg格式保存
    im.save('thumbnail.jpg', 'jpeg')

# 图片验证码
def img_validate():
    
    # 获取随机字母
    def rndChar():
        return chr(random.randint(65, 90))
    
    # 获取北京随机颜色
    def rndColor_backgruod():
        return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))

    # 随机字体颜色:
    def rndColor_front():
        return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))

    width = 60 * 4
    height = 60
    # 创建一个图片
    img = Image.new('RGB', (width, height), (255, 255, 255))

    # 创建front对象
    font = ImageFont.truetype('arial.ttf', 36)
    # 创建Draw对象
    draw = ImageDraw.Draw(img)
    for x in range(width):
        for y in range(height):
            draw.point((x, y), fill=rndColor_backgruod())
    
    # 输出字体
    for t in range(4):
        draw.text((60 * t + 10, 10), rndChar(), font=font, fill=rndColor_front())
    
    # 模糊
    img = img.filter(ImageFilter.BLUR)
    img.save('code.jpg', 'jpeg')
# handle_image()

img_validate()