
import { WebbingApplication, MockupStyle } from './types';

export const WEBBING_APPLICATIONS: WebbingApplication[] = [
  { label: '運動褲內包帶', promptValue: 'the inner waistband tape of sports pants' },
  { label: '運動上衣後領貼條帶', promptValue: 'the back neck tape of a sports jersey' },
  { label: '內衣肩帶', promptValue: 'a bra shoulder strap' },
  { label: '瑜珈褲頭帶', promptValue: 'the waistband of yoga pants' },
  { label: '運動上衣包邊帶', promptValue: 'the binding tape on the edges of a sportswear top' },
  { label: '內衣鋼圈帶', promptValue: 'the underwire casing of a bra' },
  { label: '飛行外套裝飾帶', promptValue: 'a decorative ribbon on a bomber jacket' },
  { label: '內衣細帶子', promptValue: 'a delicate lingerie strap' },
  { label: '鞋子走馬帶/抽繩', promptValue: 'a shoelace or drawstring for sneakers' },
];

export const MOCKUP_STYLES: MockupStyle[] = [
  { label: '正面模特兒實穿', promptValue: 'a front view of a model wearing the item' },
  { label: '側面模特兒實穿', promptValue: 'a side view of a model wearing the item' },
  { label: '背面模特兒實穿', promptValue: 'a back view of a model wearing the item' },
  { label: '肩部特寫', promptValue: 'a close-up shot of a model, focusing on the shoulder and collarbone area' },
  { label: '織帶平拍', promptValue: 'a flat lay' },
];
