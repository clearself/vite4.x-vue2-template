/**
 * @author: wenyuan
 * @data: 2019/08/15
 * @repository: https://github.com/wenyuan
 * @description: default style
 */

export default {
    // 节点样式
    nodeStyle: {
        default: {
            stroke: '#CED4D9',
            fill: 'transparent',
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur: 10,
            shadowColor: 'rgba(13, 26, 38, 0.08)',
            lineWidth: 1,
            radius: 4,
            strokeOpacity: 0.7
        },
        selected: {
            shadowColor: '#00aeff',
            shadowBlur: 4,
            shadowOffsetX: 0,
            shadowOffsetY: 0
            // shadowColor: '#626262',
            // shadowBlur: 8,
            // shadowOffsetX: -1,
            // shadowOffsetY: 3
        },
        unselected: {
            shadowColor: ''
        }
    },
    // 节点标签样式
    nodeLabelCfg: {
        position: 'top',
        style: {
            fill: '#333'
        }
    },
    // 连线样式
    edgeStyle: {
        default: {
            stroke: '#387dee',
            lineWidth: 2,
            strokeOpacity: 0.92,
            lineAppendWidth: 10,
            endArrow: true
        },
        active: {
            shadowColor: '#00aeff',
            shadowBlur: 6,
            shadowOffsetX: 0,
            shadowOffsetY: 0
        },
        inactive: {
            shadowColor: ''
        },
        selected: {
            stroke: '#00aeff',
            // shadowColor: '#ff240b',
            shadowBlur: 6
            // shadowOffsetX: 0,
            // shadowOffsetY: 0
        },
        unselected: {
            stroke: '#a3e2ff',
            shadowColor: ''
        }
    },
    // 连线标签样式
    edgeLabelCfg: {
        position: 'center',
        refX: 6,
        refY: 6,
        autoRotate: true,
        style: {
            fill: '#333'
        }
    },
    // 锚点样式
    anchorStyle: {
        default: {
            r: 5,
            symbol: 'circle',
            fill: '#FFFFFF',
            fillOpacity: 0,
            stroke: '#1890FF',
            strokeOpacity: 0,
            cursor: 'crosshair'
        },
        hover: {
            fillOpacity: 1,
            strokeOpacity: 1
        },
        unhover: {
            fillOpacity: 0,
            strokeOpacity: 0
        },
        active: {
            fillOpacity: 1,
            strokeOpacity: 1
        },
        inactive: {
            fillOpacity: 0,
            strokeOpacity: 0
        }
    },
    // 锚点背景样式
    anchorBgStyle: {
        default: {
            r: 7,
            symbol: 'circle',
            fill: '#1890FF',
            fillOpacity: 0,
            stroke: '#1890FF',
            strokeOpacity: 0,
            cursor: 'crosshair'
        },
        hover: {
            fillOpacity: 1,
            strokeOpacity: 1
        },
        unhover: {
            fillOpacity: 0,
            strokeOpacity: 0
        },
        active: {
            fillOpacity: 0.3,
            strokeOpacity: 0.5
        },
        inactive: {
            fillOpacity: 0,
            strokeOpacity: 0
        }
    },
    // 分组样式
    comboStyle: {
        default: {
            fill: 'rgba(0,0,0,0)',
            stroke: '#a3e2ff',
            lineWidth: 2
        },
        selected: {
            fill: 'rgba(0,0,0,0)',
            stroke: '#00aeff'
        }
    },
    // 分组标签样式
    comboLabelCfg: {
        position: 'top',
        refX: 0,
        refY: -14,
        style: {
            fontSize: 12,
            fill: '#fff'
        }
    }
}
