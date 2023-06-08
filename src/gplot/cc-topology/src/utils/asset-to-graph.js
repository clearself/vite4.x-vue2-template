import gatewayImg from '@/gplot/assets/images/gateway.png'; // 网闸
import bastionHostImg from '@/gplot/assets/images/blj.png'; // 堡垒机
import firewallImg from '@/gplot/assets/images/firewall.png'; // 防火墙
import rqfyImg from '@/gplot/assets/images/rqfy.png'; // 入侵防御
import rqjcImg from '@/gplot/assets/images/rqjc.png'; // 入侵检测
import fbdxtImg from '@/gplot/assets/images/fbdxt.png'; // 防病毒系统
import sjksjImg from '@/gplot/assets/images/sjksj.png'; // 数据库审计
import vpnsbImg from '@/gplot/assets/images/vpn.png'; // VPN设备
import webGatewayImg from '@/gplot/assets/images/web_way.png'; // Web应用安全网关
import routerImg from '@/gplot/assets/images/router.png'; // 路由器
import switchImg from '@/gplot/assets/images/jhj.png'; // 交换机
import wlanImg from '@/gplot/assets/images/wlan.png'; // WLAN
import hubImg from '@/gplot/assets/images/firewall.png'; // Hub
import jsjImg from '@/gplot/assets/images/jsj.png'; // 计算机
import notebookImg from '@/gplot/assets/images/bjb.png'; // 笔记本
import cloudServicesImg from '@/gplot/assets/images/cloud.png'; // 云服务
import othersImg from '@/gplot/assets/images/others.png'; // 其他

/* assetObj对象用于将资产类型映射成guid
 * 只有在新增拓扑图时会用到
 * */
export const assetObj = {
    wz: 'gateway',
    blj: 'bastion_host',
    fhq: 'firewall',
    rqfy: 'rqfy',
    rqjc: 'rqjc',
    fbdxt: 'fbdxt',
    sjksj: 'sjksj',
    vpnsb: 'vpnsb',
    webyyaqwg: 'web_gateway',
    lyq: 'router',
    jhj: 'switch',
    wlan: 'wlan',
    others: 'others',
    // hub: 'hub'
    jsj: 'computer',
    bjb: 'notebook',
    yfw: 'cloud_services',
};

/**
 * 根据已知资产类型的guid类型映射图片src
 * @param type
 * @returns {string}
 */
export function switchToImg(type) {
    let path = '';
    switch (type) {
        case 'gateway':
            path = gatewayImg;
            break;
        case 'bastion_host':
            path = bastionHostImg;
            break;
        case 'firewall':
            path = firewallImg;
            break;
        case 'rqfy':
            path = rqfyImg;
            break;
        case 'rqjc':
            path = rqjcImg;
            break;
        case 'fbdxt':
            path = fbdxtImg;
            break;
        case 'sjksj':
            path = sjksjImg;
            break;
        case 'vpnsb':
            path = vpnsbImg;
            break;
        case 'web_gateway':
            path = webGatewayImg;
            break;
        case 'router':
            path = routerImg;
            break;
        case 'switch':
            path = switchImg;
            break;
        case 'wlan':
            path = wlanImg;
            break;
        // case 'hub':
        //     path = hubImg
        //     break
        case 'computer':
            path = jsjImg;
            break;
        case 'notebook':
            path = notebookImg;
            break;
        case 'cloud_services':
            path = cloudServicesImg;
            break;
        default:
            path = othersImg;
            break;
    }
    return path;
}
/**
 * 根据资产类型映射图片背景
 * @param type
 * @returns {string}
 */
export function mapGraph(type) {
    let graphType = assetObj[type] || 'others';
    return switchToImg(graphType);
}
export function getAssetsType(type) {
    let key = '';
    for (let attr in assetObj) {
        if (assetObj[attr] === type) {
            key = attr;
        }
    }
    return key;
}
