(this["webpackJsonptweet-storm-builder"]=this["webpackJsonptweet-storm-builder"]||[]).push([[10],{556:function(e,t,a){"use strict";a.r(t);var n=a(15),l=a(3),r=a(27),i=a(28),c=a(31),s=a(30),o=a(32),u=a(0),m=a.n(u),d=a(29),h=(a(47),a(163)),b=a.n(h),E=function(e){return m.a.createElement("div",null,m.a.createElement(d.Form.Field,null,m.a.createElement(d.Form.Input,{name:"to",onChange:e.handleChange,placeholder:"To",value:e.to})),m.a.createElement(d.Form.Field,null,m.a.createElement(d.Form.Input,{name:"subject",value:e.subject,onChange:e.handleChange,placeholder:"Subject"})),m.a.createElement(d.Form.Field,null,m.a.createElement(b.a,{name:"body",onChange:e.handleChange,placeholder:"Message",value:e.body})),m.a.createElement(d.Form.Field,null,m.a.createElement(d.Button,null,"Add")))},p=function(e){var t=e.body.split("\n").map((function(e,t){return m.a.createElement("span",{key:t},e,m.a.createElement("br",null))}));return m.a.createElement(d.Message,null,m.a.createElement(d.Message.Header,null,m.a.createElement("p",null,m.a.createElement("strong",null,"To:")," ",e.to),m.a.createElement(d.Button,{onClick:e.handleDelete,className:"delete is-medium","aria-label":"delete"})),m.a.createElement(d.Message.Body,null,m.a.createElement("p",null,m.a.createElement("strong",null,"Subject:")," ",e.subject),m.a.createElement("br",null),m.a.createElement("p",null,t)))},g=a(114),y=function(e){return m.a.createElement(g.CopyToClipboard,{text:e.dataAsJSON(),onCopy:e.handleOnCopy},m.a.createElement(d.Form.Field,null,m.a.createElement(d.Level,null,m.a.createElement(d.Level.Side,{align:"left"},m.a.createElement(d.Level.Item,null,m.a.createElement(d.Button,null,"Copy to clipboard")),m.a.createElement(d.Level.Item,null,e.copied?m.a.createElement(d.Tag,{className:"is-success"},"Copied."):"")))))},f=function(e){function t(e){var a;Object(r.a)(this,t),a=Object(c.a)(this,Object(s.a)(t).call(this,e));var n=JSON.parse(window.localStorage.getItem("email-storm:emails")||"[]");return a.state={emails:n},a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state,a={subject:t.subject,to:t.to,body:t.body},n=this.state.emails.concat(a);this.setState((function(e,t){return Object(l.a)({},e,{emails:n})})),window.localStorage.setItem("email-storm:emails",JSON.stringify(n))}},{key:"handleDelete",value:function(e){var t=this.state.emails.filter((function(t,a){return a!==e}));this.setState({emails:t}),window.localStorage.setItem("email-storm:emails",JSON.stringify(t))}},{key:"handleChange",value:function(e){var t=e.target,a=t.value,r=t.name;this.setState((function(e,t){return Object(l.a)({},e,Object(n.a)({},r,a))}))}},{key:"output",value:function(){return"<script>\nvar emails = ".concat(JSON.stringify(this.state.emails),";\n<\/script>")}},{key:"handleOnCopy",value:function(){this.setState({copied:!0})}},{key:"render",value:function(){var e=this,t=this.state.emails.map((function(t,a){return m.a.createElement(p,Object.assign({},t,{index:a,key:a,handleDelete:e.handleDelete.bind(e,a)}))}));return m.a.createElement("div",null,m.a.createElement(d.Section,null,m.a.createElement("h1",{className:"title"},"Email Maker"),m.a.createElement("form",{className:"form",onSubmit:this.handleSubmit.bind(this)},m.a.createElement(E,Object.assign({handleChange:this.handleChange.bind(this)},this.state)))),m.a.createElement(d.Section,null,t),m.a.createElement(d.Section,{className:"raw"},m.a.createElement("h2",null,"When you're done, click below to copy your Emails..."),m.a.createElement(y,{dataAsJSON:this.output.bind(this),handleOnCopy:this.handleOnCopy.bind(this),handleDelete:this.handleDelete.bind(this),copied:this.state.copied})))}}]),t}(u.Component);t.default=f}}]);
//# sourceMappingURL=10.a584d975.chunk.js.map