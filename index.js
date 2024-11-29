// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { assert } = require("console");
const { lstat } = require("fs");
const { firefox } = require("playwright");
const { expect } = require('@playwright/test');


async function sortHackerNewsArticles() {
  // launch browser
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // validate that exactly the first 100 articles are sorted from newest to oldest
  array = page.locator(".age");
  let lastAge;
  let currentAge;

  // For each page (4 pages for 100 articles)
  for (let j = 1; j <= 4; j++ ){
    for (let i = 0; i <= 29; i++ ){
      console.log(j + "-" + i);
      

      if (i == 0 && j > 1){
        lastAge = currentAge;
      } 

      currentAge = await array.nth(i).textContent();
      
      if (i > 0){
        lastAge = await array.nth(i - 1).textContent();
      }else if (i == 0 && j == 1){
        lastAge = await array.nth(0).textContent();
      }

      // calculate as minutes
      currentAge = (currentAge.includes("hour")) ? parseInt(currentAge) * 60 : currentAge = parseInt(currentAge);
      lastAge = (typeof lastAge === "string" && lastAge.includes("hour")) 
        ? parseInt(lastAge) * 60 
        : parseInt(lastAge); 

      // Check order 
      console.log(currentAge);
      console.log(lastAge);
      // assert(currentAge >= lastAge);
      expect(currentAge).toBeGreaterThanOrEqual(lastAge);



      // Stop at the last/100th article 
      if(j == 4 && i == 9){break;}

      // Next page
      if(i == 29){
        //Click the More Button
        await page.getByText("More").last().click();
        console.log("Clicked")
        await page.waitForTimeout(3000);
        array = page.locator(".age");
      }
    }
  }
  
  // Close browser
  browser.close();
}


(async () => {
  await sortHackerNewsArticles();
})();
