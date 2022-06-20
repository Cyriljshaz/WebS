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
        options = webdriver.FirefoxOptions()
        options.add_argument("--headless")  # example
        driver = webdriver.Remote("http://127.0.0.1:4444/wd/hub", options=options)
        driver.get("https://readmanganato.com/manga-ko987549")
        title = driver.find_element(By.CSS_SELECTOR, ".panel-chapter-info-top h1")
        driver.close()
        print(title.text)
