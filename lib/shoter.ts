import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

async function screenshotTaker(url: string) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(`${url}`);

  let prevHeight: any = -1;
  let maxScrolls: number = 100;
  let scrollCount: number = 0;

  while (scrollCount < maxScrolls) {
    // Scroll to the bottom of the page
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    // Wait for page load
    new Promise((r) => setTimeout(r, 30000));
    // Calculate new scroll height and compare
    let newHeight = await page.evaluate("document.body.scrollHeight");
    if (newHeight == prevHeight) {
      break;
    }
    prevHeight = newHeight;
    scrollCount += 1;
  }

  // const selectorToWaitFor = "div.launchpad-page";
  // await page.waitForSelector(selectorToWaitFor);

  await page.screenshot({ path: "screenshot.png", fullPage: true });
  await browser.close();
}

export default screenshotTaker;
