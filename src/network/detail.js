import axios from './axios'

export function getDetail(iid) {
  return axios({
    url:"/detail",
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return axios({
    url:"/recommend"
  })
}

//ES6创建类语法
class person {
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}