from asyncio.windows_events import NULL
import cv2
import pytesseract
from PIL import Image, ImageEnhance
import re

CAPTCHA_LEN = 4
BASE_IMG = "Capture2.PNG"
ENCHANCED_IMG = "code.png"


def enchanceCaptchaPic():
    im = Image.open(BASE_IMG)
    enh = ImageEnhance.Contrast(im)
    im = enh.enhance(3)  # .show("30% more contrast")
    colo = ImageEnhance.Color(im)
    im = colo.enhance(0)
    lum = ImageEnhance.Brightness(im)
    im = lum.enhance(2.5)
    shar = ImageEnhance.Sharpness(im)
    im = shar.enhance(0.2)

    # im.show()
    im.save(ENCHANCED_IMG)


def testScanPic1():
    img = cv2.imread(ENCHANCED_IMG)
    (h, w) = img.shape[:2]
    img = cv2.resize(img, (w * 3, h * 3))
    gry = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thr = cv2.threshold(gry, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    txt = pytesseract.image_to_string(thr)
    return txt


def testScanPic2():
    img = cv2.imread(ENCHANCED_IMG)
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
    text = pytesseract.image_to_string(im2)

    return text


def getCaptcha():
    enchanceCaptchaPic()
    captcha1 = cleanCaptchaString(testScanPic2())
    captcha2 = cleanCaptchaString(testScanPic1())

    if len(captcha1) == CAPTCHA_LEN and isInt(captcha1):
        return captcha1
    elif len(captcha2) == CAPTCHA_LEN and isInt(captcha2):
        return captcha2

    # Try rebuild captcha
    rebuildedCaptcha = buildCaptcha(captcha1, captcha2)

    if rebuildedCaptcha != False:
        return rebuildedCaptcha

    return False


def cleanCaptchaString(strToclean):
    cleanStr = strToclean.strip()
    cleanStr = re.sub(r"\s+", "", cleanStr)
    cleanStr = re.sub("[^0-9]", "*", cleanStr)
    return cleanStr


def isInt(toTest):
    isInt = False
    try:
        int(toTest)
        isInt = True
    except:
        isInt = False
    finally:
        return isInt


def buildCaptcha(captcha1, captcha2):
    #  data we will itenerate trough
    base = captcha1
    ref = captcha2

    if len(captcha2) == CAPTCHA_LEN or len(captcha2) > len(captcha1):
        base = captcha2
        ref = captcha2

    ref = list(ref)
    rebuild = list(base)

    for index, letter in enumerate(base):
        if letter == "*":
            try:
                rebuild[index] = ref[index]
            except:
                return False

    rebuild = "".join(rebuild)
    if len(rebuild) == CAPTCHA_LEN and isInt(rebuild):
        return rebuild

    return False


if "__main__" == __name__:
    # catpcha = getCaptcha()
    print("DOcker runnig")
    # if catpcha != False:
    #     catpcha
