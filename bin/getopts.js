(function(){var t,n,o,e=[].slice;n=require("path"),t=function(){function t(t){this.short_options={},this.long_options={},this.long_names=[],this.events={},this.argv=[],this.options={},this.unique_names={},this.optionsPattern=[],this.errorFunc=function(t){return console.info(t.message),process.exit(1)},process.argv[1]?this.help="Usage:\n  node "+n.basename(process.argv[1])+" [OPTION]\n\nOptions:\n[[OPTIONS]]":this.help="[[OPTIONS]]",this.append(t)}return t.HAS_ARGUMENT=!0,t.NO_ARGUMENT=!1,t.MULTI_SUPPORTED=!0,t.SINGLE_ONLY=!1,t.VERSION="0.3.2",t.prototype.append=function(t){var n,e,i,s,r,h,p,l,u,a,f,c,g;for(c=0,g=t.length;c<g;c++){if(f=(u=t[c])[0],i=u[1],n=u[2],e=u[3],null==n&&(n=""),null==i&&(i=""),null==f&&(f=""),h=(o=i.match(/^([\w\-]*)/))[1],r=-1!==i.indexOf("="),p=-1!==i.indexOf("+"),a=/\[=.*?\]/.test(i),h=h.trim(),f=f.trim(),a&&f)throw new Error("optional argument can only work with long option");if(h||(h=f),s="opt_"+h,l=h,""===h)throw new Error("empty option found. the last option name is "+this.long_names.slice(-1));if(null!=this.unique_names[s])throw new Error("option "+h+" is redefined.");if(this.long_names.push(h),this.long_options[h]={name:l,short_name:f,long_name:h,has_argument:r,multi_supported:p,comment:n,optional:a,definition:i,def:e},this.unique_names[s]=!0,""!==f){if(1!==f.length)throw new Error("short option must be single characters");this.short_options[f]=this.long_options[h]}}return this},t.prototype.fill=function(t){var n,o,i,s;if(s=t[0],o=t[1],i="",n="",this.short_options[s]||(i=s),this.long_options[o]||(n=o),i||n)return this.append([[i,n].concat(e.call(t.slice(2)))])},t.prototype.getOptionByName=function(t){var n;return null!=(n=this.long_options[t])?n:this.short_options[t]},t.prototype.getOptionName=function(t){var n;return null!=(n=this.getOptionByName(t))?n.name:void 0},t.prototype.on=function(t,n){var o;if(t){if(!(o=this.getOptionName(t)))throw new Error("unknown option "+t)}else o=t;return this.events[o]=n,this},t.prototype.emit=function(t,n){var o;if(o=this.events[this.getOptionName(t)])return o.call(this,n);throw new Error("Getopt event on '"+t+"' is not found")},t.prototype.save_option_=function(t,n,o){var e,i,s;if(n.has_argument){if(0===o.length)throw new Error("option "+n.long_name+" need argument");i=o.shift()}else i=!0;return e=n.name,n.multi_supported?(null==t[e]&&(t[e]=[]),t[e].push(i)):t[e]=i,null!=(s=this.events[e])&&s.call(this,i),this},t.prototype.parse=function(t){var n,e,i,s,r,h,p,l,u,a,f,c,g,m,_,v,w,y,d,O,N,E,S,I;try{for(t=t.slice(0),l={},p=[],N=this.long_names,g=0,w=N.length;g<w;g++)s=N[g],null==(h=this.long_options[s]).def&&null==l[h.long_name]||(l[h.long_name]=h.def);for(;null!=(n=t.shift());)if(o=n.match(/^-(\w[\w\-]*)/))for(a=o[1],i=m=0,y=a.length;m<y;i=++m){if(u=a[i],!(h=this.short_options[u]))throw new Error("invalid option "+u);if(h.has_argument){i<n.length-2&&t.unshift(n.slice(i+2)),this.save_option_(l,h,t);break}this.save_option_(l,h,t)}else if(o=n.match(/^--(\w[\w\-]*)((?:=[^]*)?)$/)){if(s=o[1],c=o[2],!(h=this.long_options[s]))throw new Error("invalid option "+s);""!==c?(c=c.slice(1),t.unshift(c)):h.optional&&t.unshift(""),this.save_option_(l,h,t)}else{if("--"===n){for(p=p.concat(t),_=0,d=t.length;_<d;_++)n=t[_],null!=(E=this.events[""])&&E.call(this,n);break}p.push(n),null!=(S=this.events[""])&&S.call(this,n)}for(I=Object.keys(l),v=0,O=I.length;v<O;v++)r=I[v],""!==(f=this.long_options[r].short_name)&&(l[f]=l[r])}catch(t){e=t,this.errorFunc(e)}return this.argv=p,this.options=l,this},t.prototype.parse_system=function(){return this.parseSystem()},t.prototype.parseSystem=function(){return this.parse(process.argv.slice(2))},t.prototype.setHelp=function(t){return this.help=t,this},t.prototype.sort=function(){return this.long_names.sort((function(t,n){return(t>n?1:t<n&&-1)||0}))},t.prototype.getHelp=function(){var t,n,o,e,i,s,r,h,p,l,u,a,f,c,g,m,_,v,w,y,d;for(c=[],[],u=[],g=0,v=(d=this.long_names).length;g<v;g++)r=d[g],f=[],l=(p=this.long_options[r]).short_name,r=p.long_name,t=p.comment,o=p.definition,n=p.def,f.push(l?l===r?"  -"+l:"  -"+l+", --"+o:"      --"+o),f.push(" "+t),n&&f.push(" (default: "+n+")"),u.push(f);for(m=0,w=u.length;m<w;m++)for(f=u[m],e=_=0,y=f.length;_<y;e=++_)a=f[e],null==c[e]&&(c[e]=0),c[e]=Math.max(c[e],a.length);return s=function(){var t,n,o,s,r;for(r=[],t=0,n=u.length;t<n;t++){for(f=u[t],i="",e=s=0,o=f.length;s<o;e=++s){if(a=f[e],e)for(h=c[e-1]-f[e-1].length;h--;)i+=" ";i+=a}r.push(i.trimRight())}return r}(),this.help.replace("[[OPTIONS]]",s.join("\n"))},t.prototype.showHelp=function(){return console.info(this.getHelp()),this},t.prototype.bindHelp=function(t){return t&&this.setHelp(t),this.fill(["h","help","display this help"]),this.on("help",(function(){return this.showHelp(),process.exit(0)})),this},t.prototype.getVersion=function(){return t.VERSION},t.prototype.error=function(t){return this.errorFunc=t,this},t.getVersion=function(){return this.VERSION},t.create=function(n){return new t(n)},t}(),module.exports=t}).call(this);
