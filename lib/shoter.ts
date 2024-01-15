import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

async function screenshotTaker(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${url}`);

  await page.waitForTimeout(40000);

  await page.screenshot({ path: "screenshot.png", fullPage: true });
  await browser.close();
}

export default screenshotTaker;
