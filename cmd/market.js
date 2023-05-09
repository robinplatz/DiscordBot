import Discord from 'discord.js';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const filterItems = (el) => {
    if (el.name.includes('Blackstar') && el.level == 20) {
        return el;
    }
    if ((el.name.includes('Manos Belt') || el.name.includes('Manos Necklace') ||
    el.name.includes('Manos Earring') || el.name.includes('Manos Ring')) && el.level == 5) {
        return el;
    }
    return null;
};

export const name = 'market';
export const description = 'list incoming market registrations';
export async function execute(message) {
    


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://veliainn.com/market-queue', { waitUntil: 'networkidle0' });
    const data = await page.evaluate(async () => document.querySelector('*').outerHTML);
    let $ = cheerio.load(data);
    let scraped = $(".item_grade_4");
    if (scraped[0]) {
        scraped = scraped[0].parent.parent;
        let content = [];
        for (let j = 0; j < scraped.children.length; j++) {
            let temp = {};
            for (let i = 0; i < scraped.children[j].children.length; i++) {
                if (scraped.children[j].children[i].children) {
                    if (scraped.children[j].children[i].children[0].data) {
                        switch (i) {
                            case 0:
                                temp.id = scraped.children[j].children[i].children[0].data;
                                break;
                            case 2:
                                temp.name = scraped.children[j].children[i].children[0].data;
                                break;
                            case 4:
                                temp.price = scraped.children[j].children[i].children[0].data;
                                break;
                            case 6:
                                temp.level = scraped.children[j].children[i].children[0].data;
                                break;
                            case 8:
                                temp.time = scraped.children[j].children[i].children[0].data;
                                break;
                        }
                    } else {
                    }
                }
            }
            content.push(temp);
        }
        console.log(content);
        content.forEach((el) => {
            msg = filterItems(el);
            if (msg) {
                const response = new Discord.MessageEmbed()
                    .setTitle(msg.name)
                    .setDescription(`Enhancement level ${msg.level} listed at ${msg.time}. <@167452889445302272>`);
                message.channel.send(response);
            }
        });
    }
    await browser.close();
};

export default {
    name,
    description,
    execute,
};