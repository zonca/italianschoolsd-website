
import qrcode
from PIL import Image, ImageDraw, ImageFont
import sys

def process_flyer_custom(image_path, output_path, url, text_content, font_path="/usr/share/fonts/chromeos/monotype/georgiab.ttf"):
    try:
        img = Image.open(image_path)
    except FileNotFoundError:
        print(f"Error: File {image_path} not found.")
        sys.exit(1)

    draw = ImageDraw.Draw(img)
    
    # 1. Add "italianschoolsd.com" to Top Left
    try:
        font = ImageFont.truetype(font_path, 36)
    except IOError:
        font = ImageFont.load_default()

    text_x = 30
    text_y = 30
    
    # Draw text with outline for visibility
    # White text with black stroke usually works well on header graphics
    draw.text((text_x, text_y), text_content, font=font, fill="white", stroke_width=3, stroke_fill="black")

    # 2. Add QR Code to Top Right
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")

    # Resize QR
    target_qr_size = 180
    qr_img = qr_img.resize((target_qr_size, target_qr_size))
    
    # Position: Top Right
    qr_x = img.width - target_qr_size - 30
    qr_y = 30
    
    img.paste(qr_img, (qr_x, qr_y))

    img.save(output_path)
    print(f"Saved processed flyer to {output_path}")

if __name__ == "__main__":
    image_path = "/home/zonca/p/software/italianschoolsd-website/site/static/flyers/flyer_italian_teens_spring_2026.png"
    output_path = "/home/zonca/p/software/italianschoolsd-website/site/static/flyers/flyer_italian_teens_spring_2026.png"
    url = "https://italianschoolsd.com/news/italian-online-class-teens-spring-2026/"
    text_content = "italianschoolsd.com"
    process_flyer_custom(image_path, output_path, url, text_content)
