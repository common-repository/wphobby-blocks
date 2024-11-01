!function(e){function t(n){if(l[n])return l[n].exports;var o=l[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var l={};t.m=e,t.c=l,t.d=function(e,l,n){t.o(e,l)||Object.defineProperty(e,l,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var l=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(l,"a",l),l},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l(1);l.n(n),l(2)},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor||wp.editor,o=n.RichText,r=n.InspectorControls,i=n.ColorPalette,a=(n.AlignmentToolbar,n.BlockControls,wp.components),c=(a.IconButton,a.Dropdown,a.PanelBody),s=(a.RangeControl,a.SelectControl),u=wp.compose,d=u.withState,p=u.compose,m=wp.data.withSelect;l("wphobby-gutenberg/wphobby-list",{title:__("WPHobby: List","wphobby-gutenberg"),icon:"universal-access-alt",category:"layout",attributes:{blockID:{type:"string",default:""},list:{type:"text",default:[].concat(function(e){if(Array.isArray(e)){for(var t=0,l=Array(e.length);t<e.length;t++)l[t]=e[t];return l}return Array.from(e)}(Array(3).keys())).map(function(e){return"<li>"+__("Item "+(e+1))+"</li>"}).join()},listItem:{type:"array",default:Array(3).fill({text:"",selectedIcon:"check",indent:0})},selectedIcon:{type:"string",default:"check"},iconColor:{type:"string",default:"#000000"},iconRound:{type:"string",default:"0"}},keywords:[__("List"),__("Styled List"),__("WPHobby Blocks")],edit:p([d({availableIcons:[],iconSearchTerm:"",recentSelection:"",edits:0}),m(function(e,t){return{block:(e("core/block-editor")||e("core/editor")).getBlock(t.clientId)}})])(function(e){var t=e.block,l=e.isSelected,n=e.attributes,a=e.setAttributes,u=(e.setState,e.availableIcons,e.iconSearchTerm,e.edits,n.list),d=n.listItem,p=n.iconColor,m=n.iconRound,b=(n.selectedIcon,n.blockID);if(b!==t.clientId&&a({blockID:t.clientId}),JSON.stringify(d)!=="["+Array(3).fill('{"text":"","selectedIcon":"check","indent":0}').join(",")+"]"){var y="";d.forEach(function(e,t){for(var l=y.length,n=0;n<e.indent;n++){var o=y.lastIndexOf("</ul>",l-1);if(!(o>-1&&y.lastIndexOf("<li>")<o)){l-=5;break}l=o}var r=0===t||e.indent<=d[t-1].indent?"<li>"+e.text+"</li>":'<ul class="fa-ul"><li>'+e.text+"</li></ul>";y=[y.slice(0,l),r,y.slice(l)].join("")}),a({selectedIcon:d[0].selectedIcon,list:y,listItem:Array(3).fill({text:"",selectedIcon:"check",indent:0})})}return[l&&wp.element.createElement(r,null,wp.element.createElement(c,{title:__("Icon Options")},wp.element.createElement("p",null,__("Icon color")),wp.element.createElement(i,{value:p,onChange:function(e){return a({iconColor:e})},allowReset:!0}),wp.element.createElement("p",null,__("Button Style")),wp.element.createElement(s,{value:m,options:[{label:__("Boxed","wphobby-blocks"),value:"0"},{label:__("Rounded","wphobby-blocks"),value:"99%"}],onChange:function(e){return a({iconRound:e})}}))),wp.element.createElement("div",{className:"wphobby-styled-list",id:"wphobby-styled-list-"+b},wp.element.createElement(o,{className:"fa-ul",multiline:"li",tagName:"ol",value:u,onChange:function(e){e=e.replace("<ul>",'<ul class="fa-ul">'),a({list:e})}}),wp.element.createElement("style",{dangerouslySetInnerHTML:{__html:"#wphobby-styled-list-"+b+" li:before{\n                       background:"+p+";\n                       border-radius: "+m+";\n                       }"}}))]}),save:function(){return null}})},function(e,t,l){"use strict";var __=wp.i18n.__,n=wp.blocks.registerBlockType,o=wp.blockEditor||wp.editor,r=(o.MediaUpload,o.MediaPlaceholder),i=(o.BlockControls,o.URLInput,o.InspectorControls),a=(o.mediaUpload,o.BlockAlignmentToolbar,o.BlockIcon,o.InspectorAdvancedControls,o.MediaReplaceFlow,o.RichText,wp.blob),c=(a.getBlobByURL,a.isBlobURL,a.revokeBlobURL,{imgUrl:{type:"string",default:"http://placehold.it/500"}}),s=["image"];n("wphobby-gutenberg/wphobby-image",{title:__("WPHobby: Image","wphobby-gutenberg"),icon:"smiley",category:"layout",keywords:[__("Image Slider"),__("Slideshow"),__("WPHobby Image")],attributes:c,edit:function(e){function t(e){console.log(e.url),n({imgUrl:e.url})}var l=e.className,n=e.setAttributes,o=e.attributes,a={title:__("Image"),instructions:__("Upload an image file, pick one from your media library, or add one with a URL.")},c=o.url,u=(o.id,o.imgUrl),d=wp.element.createElement("img",{alt:__("Edit image"),title:__("Edit image"),className:"edit-image-preview",src:u});return[wp.element.createElement(i,null,wp.element.createElement("div",{style:{padding:"1em 0"}},"Options")),wp.element.createElement("div",{className:l},wp.element.createElement("div",{className:"media"},wp.element.createElement(r,{labels:a,onSelect:t,accept:"image/*",allowedTypes:s,value:u,mediaPreview:d,disableMediaButtons:c})))]},save:function(){return null}})}]);