import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { title } from "process";

async function tokenShoter() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const url = "https://www.pinksale.finance/launchpads?chain=ETH";

  await page.goto(url, { waitUntil: "networkidle2" });

  const content = await page.content();
  const $ = cheerio.load(content);

  const contentWrapper = $("div.launchpad-page");
  const presaleTitle = contentWrapper.find(".launchpad-title");
  const tabHolder = $("div.ant-tabs");
  const parentDiv = $("div.ant-tabs-content-holder");
  const tokens = parentDiv.find("div.PoolNgItem_root__2cniO");

  const tokensLength = tokens.length;

  // tokens.each((index: number, el: any) => {
  //   const token = $(el);
  //   const tokenWrapper = token.find("div.lazyload-wrapper");
  //   const relativeDiv = tokenWrapper.children("div.is-relative");
  //   const customCardDiv = relativeDiv.children("div.custom-card");

  //   const cardContentDiv = customCardDiv.children("div.card-content");

  //   const tokenContentWrapper = cardContentDiv.children("div.content-title");

  //   const titleParagraph = tokenContentWrapper.find("p.title");

  //   console.log(tokenContentWrapper.html(), "card");
  // });

  let prevHeight: any = -1;
  let maxScrolls: number = 150;
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

  // Collect all loaded data
  tokens.each((index: number, el: any) => {
    const token = $(el);
    const tokenWrapper = token.find("div.lazyload-wrapper");

    const relativeDiv = tokenWrapper.children("div.is-relative");
    const customCardDiv = relativeDiv.children("div.custom-card");

    const cardContentDiv = customCardDiv.children("div.card-content");

    const tokenContentWrapper = cardContentDiv.children("div.content-title");

    const titleParagraph = tokenContentWrapper.find("p.title");

    console.log(titleParagraph.text(), "card");
  });

  await page.close();
  await browser.close();
  //return indoorSpaces;
}

export default tokenShoter;
