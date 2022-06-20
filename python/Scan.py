from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


class Scan:
    def __init__(self):
        self.urlSite = {
            "manganato": "https://manganato.com/",
            "readmanganato": "https://readmanganato.com/",
        }
        self.mangaNum = "manga-ko987549"
        self.name = "Scan"

    def fetchOneScan(self):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(chrome_options=chrome_options)
        # driver.close()
        driver.get("https://www.readmanganato.com/manga-ec981811/chapter-122")
        screenshot = driver.save_screenshot("test.png")
        title = driver.find_element(By.TAG_NAME, "h1")
        # driver.close()
        print(title.text)
