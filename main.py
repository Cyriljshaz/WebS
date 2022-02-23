import cv2
import pytesseract
from PIL import Image, ImageEnhance

im = Image.open("Capture.PNG")
enh = ImageEnhance.Contrast(im)
im = enh.enhance(3)  # .show("30% more contrast")
colo = ImageEnhance.Color(im)
im = colo.enhance(0)
lum = ImageEnhance.Brightness(im)
im = lum.enhance(2.5)
shar = ImageEnhance.Sharpness(im)
im = shar.enhance(0.2)

# im.show()
im.save("code.png")


def test1():
    img = cv2.imread("code.png")
    (h, w) = img.shape[:2]
    img = cv2.resize(img, (w * 3, h * 3))
    gry = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thr = cv2.threshold(gry, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    txt = pytesseract.image_to_string(thr)
    print("result :: %s" % txt)

    # cv2.imshow("image", thr)
    # cv2.waitKey(4000)


def test2():
    img = cv2.imread("code.png")
    (h, w) = img.shape[:2]
    img = cv2.resize(img, (w * 3, h * 3))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Performing OTSU threshold
    ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)

    # Specify structure shape and kernel size.
    # Kernel size increases or decreases the area
    # of the rectangle to be detected.
    # A smaller value like (10, 10) will detect
    # each word instead of a sentence.
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (15, 15))

    # Applying dilation on the threshold image
    dilation = cv2.dilate(thresh1, rect_kernel, iterations=1)

    # Finding contours
    contours, hierarchy = cv2.findContours(
        dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE
    )

    # Creating a copy of image
    im2 = img.copy()

    # print("result :: %s" % (pytesseract.image_to_string(im2)))
    # A text file is created and flushed
    file = open("recognized.txt", "w+")
    file.write("")
    file.close()

    # Looping through the identified contours
    # Then rectangular part is cropped and passed on
    # to pytesseract for extracting text from it
    # Extracted text is then written into the text file
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)

        # Drawing a rectangle on copied image
        # rect = cv2.rectangle(im2, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Cropping the text block for giving input to OCR
        # cropped = im2[y : y + h, x : x + w]

        # Open the file in append mode
        file = open("recognized.txt", "a")

        # Apply OCR on the cropped image
        text = pytesseract.image_to_string(im2)

        # Appending the text into file
        file.write(text)
        file.write("\n")

        # Close the file
        file.close


test2()
test1()
