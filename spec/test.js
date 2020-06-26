const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:9999/listing/549504785';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    ars: [`--window-size-=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(pageUrl, {waitUntil: 'networkidle2'})
});

afterAll( () => {
  browser.close();
})

describe('Proxy', () => {

  it('should render search bar', async done => {
    const search = await page.$eval('#search-wrapper', el => el ? true : false);
    const etsy = await page.$eval('#etsy', el => el ? true : false);
    const input = await page.$eval('.search-input', el => el ? true : false);
    const signin = await page.$eval('.search-signin-button', el => el ? true : false);
    const cart = await page.$eval('#cart', el => el ? true : false);
    expect(search).toEqual(true);
    expect(etsy).toEqual(true);
    expect(input).toEqual(true);
    expect(signin).toEqual(true);
    expect(cart).toEqual(true);
    done();
  })

  it('should render menu bar', async done => {
    var menu = await page.$$eval('#menu-item', el => el.map(each => each.textContent));
    expect(menu[0]).toEqual('Jewelry & Accessories');
    expect(menu[1]).toEqual('Clothing & Shoes');
    expect(menu[2]).toEqual('Home & Living');
    expect(menu[3]).toEqual('Wedding & Party');
    expect(menu[4]).toEqual('Toys & Entertainment');
    expect(menu[5]).toEqual('Art & Collectibles');
    expect(menu[6]).toEqual('Craft Supplies');
    expect(menu[7]).toEqual('Vintage');
    expect(menu[8]).toEqual('Gifts');
    done();
  })

});


describe('Product service', () => {

  it('should render product name', async done => {
    var name = await page.$eval('.name-component', el => el.textContent);
    expect(name).toEqual('PokéNatomy: The Science of Pokémon (An Unofficial Guide)')
    done();
  });

  it('should render stars', async done => {
    var stars = await page.$$eval('.star-icon', el => el.length);
    expect(stars).toEqual(5)
    done();
  })

});
