let puppeteer = require("puppeteer");
let { password, email } = require("../secret");
let fs = require("fs");
console.log("Before");
let noofPosts = process.argv[2];//input

(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized",]
        });
        let newTab = await browserInstance.newPage();
        await newTab.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });//to load the inputs of the page
        // await newTab.screenshot({path: 'example.png'});
        await newTab.type("input[name='username']", email, { delay: 100 });
        await newTab.type("input[name='password']", password, { delay: 100 });
        await Promise.all([
            newTab.waitForNavigation({ waitUntil: "networkidle2" }),
            newTab.click("button[type='submit']"),
        ]);
        await newTab.type("input[placeholder='Search']", "soo.cute.babies");
        await newTab.waitForSelector(".-qQT3 .Igw0E.IwRSH.YBx95.vwCYk", { visible: true }); //selector->wait ya visible
        await Promise.all([
            newTab.waitForNavigation({ waitUntil: "networkidle2" }),
            newTab.click(".-qQT3 .Igw0E.IwRSH.YBx95.vwCYk"),
        ]);

        await newTab.waitForSelector(".eLAPa", { visible: true });
        await Promise.all([
            newTab.waitForNavigation({ waitUntil: "networkidle2" }),
            newTab.click(".eLAPa"),
        ]);
        let i = 0;
        do {
            await newTab.waitForSelector(".fr66n .wpO6b", { visible: true });
            await newTab.click(".fr66n .wpO6b");//like
            await Promise.all([
                newTab.waitForNavigation({ waitUntil: "networkidle2" }),
                newTab.click("._65Bje.coreSpriteRightPaginationArrow",{delay:300}),
            ]);
            i++;
        }
        while (i < noofPosts) {}
        await browserInstance.close();
    }
    catch (err) {
        console.log(err);
    }
})();
