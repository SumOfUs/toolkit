webpackJsonp([3],{212:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),c=n.n(i),u=n(44),s=(n.n(u),n(48)),p=(n.n(s),n(437)),f=n(438),d=n(439),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),y=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),a=JSON.parse(window.localStorage.getItem("email-storm:emails")||"[]");return n.state={emails:a},n}return l(t,e),m(t,[{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state,n=t.subject,a=t.to,r=t.body,o={subject:n,to:a,body:r},l=this.state.emails.concat(o);this.setState(function(e,t){return Object.assign({},e,{emails:l})}),window.localStorage.setItem("email-storm:emails",JSON.stringify(l))}},{key:"handleDelete",value:function(e){var t=this.state.emails.filter(function(t,n){return n!==e});this.setState({emails:t}),window.localStorage.setItem("email-storm:emails",JSON.stringify(t))}},{key:"handleChange",value:function(e){var t=e.target,n=t.value,r=t.name;this.setState(function(e,t){return Object.assign({},e,a({},r,n))})}},{key:"output",value:function(){return"<script>\nvar emails = "+JSON.stringify(this.state.emails)+";\n<\/script>"}},{key:"handleOnCopy",value:function(){this.setState({copied:!0})}},{key:"render",value:function(){var e=this,t=this.state.emails.map(function(t,n){return c.a.createElement(f.a,Object.assign({},t,{index:n,key:n,handleDelete:e.handleDelete.bind(e,n)}))});return c.a.createElement("div",null,c.a.createElement(u.Section,null,c.a.createElement("h1",{className:"title"},"Email Maker"),c.a.createElement("form",{className:"form",onSubmit:this.handleSubmit.bind(this)},c.a.createElement(p.a,Object.assign({handleChange:this.handleChange.bind(this)},this.state.current)))),c.a.createElement(u.Section,null,t),c.a.createElement(u.Section,{className:"raw"},c.a.createElement("h2",null,"When you're done, click below to copy your Emails..."),c.a.createElement(d.a,{dataAsJSON:this.output.bind(this),handleOnCopy:this.handleOnCopy.bind(this),handleDelete:this.handleDelete.bind(this),copied:this.state.copied})))}}]),t}(i.Component);t.default=y},231:function(e,t,n){"use strict";function a(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function r(e,t){var n,r,i,c,u,s,p=!1;t||(t={}),n=t.debug||!1;try{i=o(),c=document.createRange(),u=document.getSelection(),s=document.createElement("span"),s.textContent=e,s.style.all="unset",s.style.position="fixed",s.style.top=0,s.style.clip="rect(0, 0, 0, 0)",s.style.whiteSpace="pre",s.style.webkitUserSelect="text",s.style.MozUserSelect="text",s.style.msUserSelect="text",s.style.userSelect="text",document.body.appendChild(s),c.selectNode(s),u.addRange(c);if(!document.execCommand("copy"))throw new Error("copy command was unsuccessful");p=!0}catch(o){n&&console.error("unable to copy using execCommand: ",o),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData("text",e),p=!0}catch(o){n&&console.error("unable to copy using clipboardData: ",o),n&&console.error("falling back to prompt"),r=a("message"in t?t.message:l),window.prompt(r,e)}}finally{u&&("function"==typeof u.removeRange?u.removeRange(c):u.removeAllRanges()),s&&document.body.removeChild(s),i()}return p}var o=n(232),l="Copy to clipboard: #{key}, Enter";e.exports=r},232:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],a=0;a<e.rangeCount;a++)n.push(e.getRangeAt(a));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},239:function(e,t,n){"use strict";var a=n(240),r=a.CopyToClipboard;r.CopyToClipboard=r,e.exports=r},240:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.CopyToClipboard=void 0;var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(3),p=a(s),f=n(231),d=a(f);(t.CopyToClipboard=function(e){function t(){var e,n,a,r;o(this,t);for(var i=arguments.length,c=Array(i),u=0;u<i;u++)c[u]=arguments[u];return n=a=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.onClick=function(e){var t=a.props,n=t.text,r=t.onCopy,o=t.children,l=t.options,i=p.default.Children.only(o),c=(0,d.default)(n,l);r&&r(n,c),i&&i.props&&"function"===typeof i.props.onClick&&i.props.onClick(e)},r=n,l(a,r)}return i(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=(e.text,e.onCopy,e.options,e.children),n=r(e,["text","onCopy","options","children"]),a=p.default.Children.only(t);return p.default.cloneElement(a,c({},n,{onClick:this.onClick}))}}]),t}(p.default.PureComponent)).defaultProps={onCopy:void 0,options:void 0}},437:function(e,t,n){"use strict";var a=n(3),r=n.n(a),o=n(44),l=(n.n(o),function(e){return r.a.createElement("div",null,r.a.createElement(o.Field,null,r.a.createElement(o.Input,{name:"to",onChange:e.handleChange,placeholder:"To"})),r.a.createElement(o.Field,null,r.a.createElement(o.Input,{name:"subject",onChange:e.handleChange,placeholder:"Subject"})),r.a.createElement(o.Field,null,r.a.createElement(o.Textarea,{name:"body",onChange:e.handleChange,placeholder:"Message"})),r.a.createElement(o.Field,null,r.a.createElement(o.Button,null,"Add")))});t.a=l},438:function(e,t,n){"use strict";var a=n(3),r=n.n(a),o=n(44),l=(n.n(o),function(e){var t=e.body.split("\n").map(function(e,t){return r.a.createElement("span",{key:t},e,r.a.createElement("br",null))});return r.a.createElement(o.Message,null,r.a.createElement(o.Message.Header,null,r.a.createElement("p",null,r.a.createElement("strong",null,"To:")," ",e.to),r.a.createElement(o.Button,{onClick:e.handleDelete,className:"delete is-medium","aria-label":"delete"})),r.a.createElement(o.Message.Body,null,r.a.createElement("p",null,r.a.createElement("strong",null,"Subject:")," ",e.subject),r.a.createElement("br",null),r.a.createElement("p",null,t)))});t.a=l},439:function(e,t,n){"use strict";var a=n(3),r=n.n(a),o=n(239),l=(n.n(o),n(44)),i=(n.n(l),function(e){return r.a.createElement(o.CopyToClipboard,{text:e.dataAsJSON(),onCopy:e.handleOnCopy},r.a.createElement(l.Field,null,r.a.createElement(l.Level,null,r.a.createElement(l.Level.Left,null,r.a.createElement(l.Level.Item,null,r.a.createElement(l.Button,null,"Copy to clipboard")),r.a.createElement(l.Level.Item,null,e.copied?r.a.createElement(l.Tag,{className:"is-success"},"Copied."):"")))))});t.a=i}});
//# sourceMappingURL=3.42f16961.chunk.js.map