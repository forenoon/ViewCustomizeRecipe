/* ------ view-customizes:
 TransparentBg
 Path pattern: /*
 ----------------------- */
$(function() {
    const urlBackgroundImg = 'url(http://192.168.48.10/redmine/attachments/download/2/Skyrim_1080x964.png)';

    const mapPathAlpha = {
        '#header':0.0,
        '#main-menu':0.7,
        '#main-menu ul li a.selected':0.5,
        '#main':0.0,
        '#sidebar':0.7,
        '#sidebar-expander.collapsed':0.7,
        '#sidebar-expander.expanded':0.7,
        '#content':0.6,
        'h2':0.5,
        'table':0.8,
        'th':0.8,
        'tr':0.8,
        'td':0.8,
        '.box':0.8,
        '.details':0.8,
        '.gantt_hdr':0.7,
    }

    $('#wrapper2').css('background-image', urlBackgroundImg);

    Object.keys(mapPathAlpha).forEach(function(path){
        $(path).each(function(index,element){
            let propOrigin = window.getComputedStyle(element,null).background;
            let propAlpha = ReplaceStyleAlpha(propOrigin, mapPathAlpha[path]);
            element.style.background = propAlpha;
        })
    })
})


/**
* this funciton add alpha number to color value and color name in CSS property. but, not overwrite when origin alpha less than arg alpha.
* @param {string} propertyCss CSS property. ex) rgb(230, 241, 246) none repeat scroll 0% 0% / auto padding-box border-box
* @param {float} alpha alpha number. 0.0 to 1.0.
*/
function ReplaceStyleAlpha(propertyCss, alpha)
{
    const mapColorName = {'black':'#000000','silver':'#c0c0c0','gray':'#808080','white':'#ffffff','maroon':'#800000','red':'#ff0000','purple':'#800080','fuchsia':'#ff00ff','green':'#008000','lime':'#00ff00','olive':'#808000','yellow':'#ffff00','navy':'#000080','blue':'#0000ff','teal':'#008080','aqua':'#00ffff','orange':'#ffa500','aliceblue':'#f0f8ff','antiquewhite':'#faebd7','aquamarine':'#7fffd4','azure':'#f0ffff','beige':'#f5f5dc','bisque':'#ffe4c4','blanchedalmond':'#ffebcd','blueviolet':'#8a2be2','brown':'#a52a2a','burlywood':'#deb887','cadetblue':'#5f9ea0','chartreuse':'#7fff00','chocolate':'#d2691e','coral':'#ff7f50','cornflowerblue':'#6495ed','cornsilk':'#fff8dc','crimson':'#dc143c','cyan':'#00ffff','darkblue':'#00008b','darkcyan':'#008b8b','darkgoldenrod':'#b8860b','darkgray':'#a9a9a9','darkgreen':'#006400','darkgrey':'#a9a9a9','darkkhaki':'#bdb76b','darkmagenta':'#8b008b','darkolivegreen':'#556b2f','darkorange':'#ff8c00','darkorchid':'#9932cc','darkred':'#8b0000','darksalmon':'#e9967a','darkseagreen':'#8fbc8f','darkslateblue':'#483d8b','darkslategray':'#2f4f4f','darkslategrey':'#2f4f4f','darkturquoise':'#00ced1','darkviolet':'#9400d3','deeppink':'#ff1493','deepskyblue':'#00bfff','dimgray':'#696969','dimgrey':'#696969','dodgerblue':'#1e90ff','firebrick':'#b22222','floralwhite':'#fffaf0','forestgreen':'#228b22','gainsboro':'#dcdcdc','ghostwhite':'#f8f8ff','gold':'#ffd700','goldenrod':'#daa520','greenyellow':'#adff2f','grey':'#808080','honeydew':'#f0fff0','hotpink':'#ff69b4','indianred':'#cd5c5c','indigo':'#4b0082','ivory':'#fffff0','khaki':'#f0e68c','lavender':'#e6e6fa','lavenderblush':'#fff0f5','lawngreen':'#7cfc00','lemonchiffon':'#fffacd','lightblue':'#add8e6','lightcoral':'#f08080','lightcyan':'#e0ffff','lightgoldenrodyellow':'#fafad2','lightgray':'#d3d3d3','lightgreen':'#90ee90','lightgrey':'#d3d3d3','lightpink':'#ffb6c1','lightsalmon':'#ffa07a','lightseagreen':'#20b2aa','lightskyblue':'#87cefa','lightslategray':'#778899','lightslategrey':'#778899','lightsteelblue':'#b0c4de','lightyellow':'#ffffe0','limegreen':'#32cd32','linen':'#faf0e6','magenta':'#ff00ff','mediumaquamarine':'#66cdaa','mediumblue':'#0000cd','mediumorchid':'#ba55d3','mediumpurple':'#9370db','mediumseagreen':'#3cb371','mediumslateblue':'#7b68ee','mediumspringgreen':'#00fa9a','mediumturquoise':'#48d1cc','mediumvioletred':'#c71585','midnightblue':'#191970','mintcream':'#f5fffa','mistyrose':'#ffe4e1','moccasin':'#ffe4b5','navajowhite':'#ffdead','oldlace':'#fdf5e6','olivedrab':'#6b8e23','orangered':'#ff4500','orchid':'#da70d6','palegoldenrod':'#eee8aa','palegreen':'#98fb98','paleturquoise':'#afeeee','palevioletred':'#db7093','papayawhip':'#ffefd5','peachpuff':'#ffdab9','peru':'#cd853f','pink':'#ffc0cb','plum':'#dda0dd','powderblue':'#b0e0e6','rosybrown':'#bc8f8f','royalblue':'#4169e1','saddlebrown':'#8b4513','salmon':'#fa8072','sandybrown':'#f4a460','seagreen':'#2e8b57','seashell':'#fff5ee','sienna':'#a0522d','skyblue':'#87ceeb','slateblue':'#6a5acd','slategray':'#708090','slategrey':'#708090','snow':'#fffafa','springgreen':'#00ff7f','steelblue':'#4682b4','tan':'#d2b48c','thistle':'#d8bfd8','tomato':'#ff6347','turquoise':'#40e0d0','violet':'#ee82ee','wheat':'#f5deb3','whitesmoke':'#f5f5f5','yellowgreen':'#9acd32','rebeccapurple':'#663399'};
    const regexColorName = /(?:^|[^\w])(yellowgreen|yellow|whitesmoke|white|wheat|violet|turquoise|tomato|thistle|teal|tan|steelblue|springgreen|snow|slategrey|slategray|slateblue|skyblue|silver|sienna|seashell|seagreen|sandybrown|salmon|saddlebrown|royalblue|rosybrown|red|rebeccapurple|purple|powderblue|plum|pink|peru|peachpuff|papayawhip|palevioletred|paleturquoise|palegreen|palegoldenrod|orchid|orangered|orange|olivedrab|olive|oldlace|navy|navajowhite|moccasin|mistyrose|mintcream|midnightblue|mediumvioletred|mediumturquoise|mediumspringgreen|mediumslateblue|mediumseagreen|mediumpurple|mediumorchid|mediumblue|mediumaquamarine|maroon|magenta|linen|limegreen|lime|lightyellow|lightsteelblue|lightslategrey|lightslategray|lightskyblue|lightseagreen|lightsalmon|lightpink|lightgrey|lightgreen|lightgray|lightgoldenrodyellow|lightcyan|lightcoral|lightblue|lemonchiffon|lawngreen|lavenderblush|lavender|khaki|ivory|indigo|indianred|hotpink|honeydew|grey|greenyellow|green|gray|goldenrod|gold|ghostwhite|gainsboro|fuchsia|forestgreen|floralwhite|firebrick|dodgerblue|dimgrey|dimgray|deepskyblue|deeppink|darkviolet|darkturquoise|darkslategrey|darkslategray|darkslateblue|darkseagreen|darksalmon|darkred|darkorchid|darkorange|darkolivegreen|darkmagenta|darkkhaki|darkgrey|darkgreen|darkgray|darkgoldenrod|darkcyan|darkblue|cyan|crimson|cornsilk|cornflowerblue|coral|chocolate|chartreuse|cadetblue|burlywood|brown|blueviolet|blue|blanchedalmond|black|bisque|beige|azure|aquamarine|aqua|antiquewhite|aliceblue)(?!\w)/gmi;
    const regexColorValue = /(rgba?)\(([\d\.-]+)\s*,\s*([\d\.-]+)\s*,\s*([\d\.-]+)(?:\s*,\s*([\d\.-]+))?\)|(#)([\da-f]{3,8})/gmi;

    let strReplacedNames = propertyCss;
    let matches = propertyCss.match(regexColorName);
    if(matches != null){
        matches.forEach((match, groupIndex) => {
            strReplacedNames = strReplacedNames.replace(match, mapColorName[match]);
        });
    }
  
    let strAddedAlpha = strReplacedNames;
    while ((m = regexColorValue.exec(strReplacedNames)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regexColorValue.lastIndex) {
            regex.lastIndex++;
        }
        if(m[1] != null)
        {
            let floatAlpha = Math.max(Math.min(alpha, 1),0);
            if((m[5] == null) || ((m[5] != null) && (floatAlpha < m[5])))
            {
                strAddedAlpha = strAddedAlpha.replace(m[0],`rgba(${m[2]},${m[3]},${m[4]},${floatAlpha})`);
            }
        }
        else if(m[6] != null)
        {
            let hexAlphaF = Math.round(Math.max(Math.min(alpha * 15, 15), 0));
            let hexAlphaFF = Math.round(Math.max(Math.min(alpha * 255, 255), 0));
            switch(m[7].length){
                case 3: {
                    strAddedAlpha = strAddedAlpha.replace(m[0], `${m[0].substr(0,3)}${hexAlphaF.toString(16)}`);
                } break;

                case 4: {
                    if(hexAlphaF < Number('0x'+m[0].substr(4,1))){
                        strAddedAlpha = strAddedAlpha.replace(m[0], `${m[0].substr(0,3)}${hexAlphaF.toString(16)}`);
                    }
                } break;

                case 6: {
                    strAddedAlpha = strAddedAlpha.replace(m[0], `${m[0].substr(0,6)}${('0'+hexAlphaFF.toString(16)).slice(-2)}`);
                } break;

                case 8: {
                    if(hexAlphaFF < Number('0x'+m[0].substr(7,2))){
                        strAddedAlpha = strAddedAlpha.replace(m[0], `${m[0].substr(0,6)}${('0'+hexAlphaFF.toString(16)).slice(-2)}`);
                    }
                } break;
            }
        }
    }

    return strAddedAlpha;
}