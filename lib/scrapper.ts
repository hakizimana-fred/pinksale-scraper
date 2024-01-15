import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

async function tokenShoter() {
  const browser = await puppeteer.launch({
    headless: false,
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
  const tokens = parentDiv.find("div.content-title");

  const tokensLength = tokens.length;

  tokens.each((index: number, el: any) => {
    const token = $(el);
    const tokenWrapper = token.find("div.lazyload-wrapper");
    const relativeDiv = tokenWrapper.children("div.is-relative");
    const customCardDiv = relativeDiv.children("div.custom-card");

    const cardContentDiv = customCardDiv.children("div.card-content");

    const tokenContentWrapper = cardContentDiv.children("div.content-title");

    const titleParagraph = tokenContentWrapper.find("p.title");

    console.log(tokenContentWrapper.html(), "card");
  });

  await page.close();
  await browser.close();
  //return indoorSpaces;
}

export default tokenShoter;
