export var farmFactory=function(){"use strict";n=t={exports:{}},n.exports=e;function e(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?n.exports=e=function(t){return typeof t}:n.exports=e=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}var n;var t,a=function(){return(a=Object.assign||function(t){for(var e,n=1,a=arguments.length;n<a;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function u(i,r,s,u){return new(s=s||Promise)(function(t,e){function n(t){try{o(u.next(t))}catch(t){e(t)}}function a(t){try{o(u.throw(t))}catch(t){e(t)}}function o(e){e.done?t(e.value):new s(function(t){t(e.value)}).then(n,a)}o((u=u.apply(i,r||[])).next())})}function l(n,a){var o,i,r,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]},t={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,i&&(r=2&e[0]?i.return:e[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,e[1])).done)return r;switch(i=0,r&&(e=[2&e[0],r.value]),e[0]){case 0:case 1:r=e;break;case 4:return s.label++,{value:e[1],done:!1};case 5:s.label++,i=e[1],e=[0];continue;case 7:e=s.ops.pop(),s.trys.pop();continue;default:if(!(r=0<(r=s.trys).length&&r[r.length-1])&&(6===e[0]||2===e[0])){s=0;continue}if(3===e[0]&&(!r||e[1]>r[0]&&e[1]<r[3])){s.label=e[1];break}if(6===e[0]&&s.label<r[1]){s.label=r[1],r=e;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(e);break}r[2]&&s.ops.pop(),s.trys.pop();continue}e=a.call(n,s)}catch(t){e=[6,t],i=0}finally{o=r=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}var o=(i.prototype.addHandler=function(t){var e=this;this.handlers.push(t.bind({unsubscribe:function(){e.removeHandler(t)}}))},i.prototype.removeHandler=function(t){t=this.handlers.indexOf(t);this.handlers.splice(t,1)},i.prototype.call=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.handlers.forEach(function(t){try{t.apply(void 0,e)}catch(t){console.error(t)}})},i);function i(t){this.name=t,this.handlers=[]}function r(){this.events={}}function d(t){b=a(a({},b),t),w.dispatch("state change",b)}function s(t){return'<div class="farmfactory-loader'+(t?" black":"")+'"><div></div><div></div><div></div></div>'}function p(t){if(!t)return t;var e=Number(t).toFixed(5);return"0.00000"===e&&(e=Number(t).toFixed(8)),"0.00000000"===e?t:e}function c(t,e){return new window.BigNumber(t).times(new window.BigNumber(10).pow(e)).toString(10)}function m(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return console.log.apply(console,function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;for(var a=Array(t),o=0,e=0;e<n;e++)for(var i=arguments[e],r=0,s=i.length;r<s;r++,o++)a[o]=i[r];return a}(["widget: "+t],e))}function y(){return u(void 0,void 0,void 0,function(){var e,n,a,o,i,r,s,u,d,c;return l(this,function(t){switch(t.label){case 0:if(m("getData"),u=b.opts,r=b.contracts,s=b.account,e=b.stakingTokenName,n=b.stakingDecimals,a=b.rewardsTokenName,o=b.rewardsDecimals,!r)return[2];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,Promise.all([r.farm.methods.balanceOf(s).call(),r.farm.methods.earned(s).call(),r.staking.methods.allowance(s,u.farmAddress).call()])];case 2:return d=t.sent(),i=d[0],r=d[1],c=d[2],console.log("allowance:",c),S(0<Number(c)),s=document.getElementById(h.ids.widget.staked),u=document.getElementById(h.ids.widget.earned),d=document.getElementById(h.ids.widget.harvestButton),c=document.getElementById(h.ids.widget.withdrawButton),s.innerText=p(i/Math.pow(10,n))+" "+e,u.innerText=p(r/Math.pow(10,o))+" "+a,d&&(0<r?d.classList.remove("disabled"):d.classList.add("disabled")),c&&(0<i?c.classList.remove("disabled"):c.classList.add("disabled")),[3,4];case 3:return c=t.sent(),console.error(c),B(c.message),[3,4];case 4:return[2]}})})}function f(){document.getElementById(h.ids.widget.approveButton).addEventListener("click",function(){u(void 0,void 0,void 0,function(){var e,n,a,o;return l(this,function(t){switch(t.label){case 0:if(m("init approve"),n=b.opts,a=b.web3,e=b.contracts,o=b.account,A)return[2];if(!o)return[2];if(!e.staking)return B("Staking contract is not connected"),[2];t.label=1;case 1:return t.trys.push([1,3,4,5]),A=!0,document.getElementById(h.ids.widget.approveButton).innerHTML="Approve "+s(),n=n.farmAddress,a=a.utils.toBN("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),[4,e.staking.methods.approve(n,a).send({from:o})];case 2:return t.sent().status&&B("Transaction confirmed!"),y(),[3,5];case 3:return o=t.sent(),console.error(o),B(o.message),[3,5];case 4:return A=!1,document.getElementById(h.ids.widget.approveButton).innerHTML="Approve",[7];case 5:return[2]}})})})}function v(){var t=b.opts,e=document.getElementById(h.ids.widget.harvestButton);t.harvestButtonTitle&&(e.innerText=t.harvestButtonTitle),e.addEventListener("click",function(){e.classList.contains("disabled")||u(void 0,void 0,void 0,function(){var e,n,a;return l(this,function(t){switch(t.label){case 0:if(m("init harvest"),e=b.contracts,a=b.account,A)return[2];if(!a)return[2];if(!e.farm)return B("Farm contract is not connected"),[2];n=document.getElementById(h.ids.widget.harvestButton),t.label=1;case 1:return t.trys.push([1,3,4,5]),A=!0,n.innerHTML="Harvest "+s(),[4,e.farm.methods.getReward().send({from:a})];case 2:return t.sent().status&&B("Transaction confirmed!"),y(),[3,5];case 3:return a=t.sent(),console.error(a),B(a.message),[3,5];case 4:return A=!1,n.innerHTML="Harvest",[7];case 5:return[2]}})})})}var w=new(r.prototype.getEvent=function(t){var e=this.events[t];return e||(e=new o(t),this.events[t]=e),e},r.prototype.subscribe=function(t,e){t=this.getEvent(t);return t.addHandler(e),{event:t,handler:e}},r.prototype.unsubscribe=function(t,e){this.getEvent(t).removeHandler(e)},r.prototype.dispatch=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];t=this.getEvent(t);t&&t.call.apply(t,e)},r.prototype.once=function(t,n){var a=this.getEvent(t),o=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];n.apply(void 0,t)&&a.removeHandler(o)};return a.addHandler(o),{event:a,handlerWrapper:o}},r),b={opts:null,web3:null,account:null,contracts:null,stakingTokenName:"",stakingDecimals:null,rewardsTokenName:"",rewardsDecimals:null},h={networks:{mainnet:"https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c",ropsten:"https://ropsten.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c",kovan:"https://kovan.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c"},ids:{timerRoot:"farmfactory-timer-root",widgetRoot:"farmfactory-widget-root",modalsRoot:"farmfactory-modals-root",infoModalRoot:"farmfactory-info-modal-root",widget:{root:"farmfactory-widget-root",earned:"farmfactory-widget-earned",staked:"farmfactory-widget-staked",lpsButtons:"farmfactory-widget-lps-buttons",harvestButton:"farmfactory-widget-harvest-button",approveButton:"farmfactory-widget-approve-button",depositButton:"farmfactory-widget-deposit-button",withdrawButton:"farmfactory-widget-withdraw-button"},depositForm:{title:"farmfactory-deposit-title",input:"farmfactory-deposit-input",cancelButton:"farmfactory-deposit-cancel-button",depositButton:"farmfactory-deposit-deposit-button"},withdrawForm:{title:"farmfactory-withdraw-title",input:"farmfactory-withdraw-input",cancelButton:"farmfactory-withdraw-cancel-button",withdrawButton:"farmfactory-withdraw-deposit-button"},infoModal:{closeButton:"farmfactory-info-modal-close-button",cancelButton:"farmfactory-info-modal-cancel-button"},wrongNetworkModal:{closeButton:"farmfactory-wrong-network-modal-close-button"},connectModal:{closeButton:"farmfactory-connect-modal-close-button",connectButton:"farmfactory-connect-modal-connect-button",cancelButton:"farmfactory-connect-modal-cancel-button"},depositModal:{closeButton:"farmfactory-deposit-modal-close-button",title:"farmfactory-deposit-modal-title",depositButton:"farmfactory-deposit-modal-deposit-button",cancelButton:"farmfactory-deposit-modal-cancel-button",availableToDeposit:"farmfactory-deposit-modal-available-to-deposit",depositAmount:"farmfactory-deposit-modal-deposit-amount"},withdrawModal:{closeButton:"farmfactory-withdraw-modal-close-button",title:"farmfactory-withdraw-modal-title",withdrawButton:"farmfactory-withdraw-modal-withdraw-button",cancelButton:"farmfactory-withdraw-modal-cancel-button",availableToWithdraw:"farmfactory-withdraw-modal-available-to-withdraw",withdrawAmount:"farmfactory-deposit-modal-withdraw-amount"},harvestModal:{closeButton:"farmfactory-harvest-modal-close-button",connectButton:"farmfactory-harvest-modal-connect-button",cancelButton:"farmfactory-harvest-modal-cancel-button"}}},g=function(){document.getElementById(h.ids.infoModalRoot).innerHTML=""},B=function(t){document.getElementById(h.ids.infoModalRoot).innerHTML=(e=t,'\n  <div class="farmfactory-overlay">\n    <div class="farmfactory-modal">\n      <button class="farmfactory-closeButton" id="'+h.ids.infoModal.closeButton+'">\n        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">\n          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>\n        </svg>\n      </button>\n      <div class="farmfactory-inner">\n        <div>'+e+'</div>\n      </div>\n      <div class="farmfactory-footer">\n        <button class="farmfactory-button gray" id="'+h.ids.infoModal.cancelButton+'">Close</button>\n      </div>\n    </div>\n  </div>\n');var t=document.getElementById(h.ids.infoModal.closeButton),e=document.getElementById(h.ids.infoModal.cancelButton);t.addEventListener("click",g),e.addEventListener("click",g)},M='\n  <div class="farmfactory-form farmfactory-deposit">\n    <div class="farmfactory-title" id="'+h.ids.depositForm.title+'"></div>\n    <input class="farmfactory-input" id="'+h.ids.depositForm.input+'" type="number" value="" />\n    <div class="farmfactory-row">\n      <button class="farmfactory-button" id="'+h.ids.depositForm.cancelButton+'">Cancel</button>\n      <button class="farmfactory-button" id="'+h.ids.depositForm.depositButton+'">Deposit</button>\n    </div>\n  </div>\n',T=!1,k=function(){document.getElementById(h.ids.widget.root).classList.remove("farmfactory-deposit-visible")},E=function(){var t=document.getElementById(h.ids.depositForm.cancelButton),e=document.getElementById(h.ids.depositForm.depositButton);t.addEventListener("click",function(){t.classList.contains("disabled")||k()}),e.addEventListener("click",function(){u(void 0,void 0,void 0,function(){var e,n,a,o,i,r;return l(this,function(t){switch(t.label){case 0:if(b.web3,e=b.contracts,r=b.account,i=b.stakingDecimals,T)return[2];if(!e.farm)return B("Farm contract is not connected"),[2];if(o=document.getElementById(h.ids.depositForm.input),n=document.getElementById(h.ids.depositForm.cancelButton),a=document.getElementById(h.ids.depositForm.depositButton),!(0<(o=Number(o.value))))return[3,5];t.label=1;case 1:return t.trys.push([1,3,4,5]),T=!0,n.classList.add("disabled"),a.innerHTML="Deposit "+s(),i=c(o,i),[4,e.farm.methods.stake(i).send({from:r})];case 2:return t.sent().status&&B("Transaction confirmed!"),k(),w.dispatch("deposit success"),[3,5];case 3:return r=t.sent(),console.error(r),"INVALID_ARGUMENT"==r.code?B("Placeholder cannot be empty"):B(r.message),[3,5];case 4:return T=!1,n.classList.remove("disabled"),a.innerHTML="Deposit",[7];case 5:return[2]}})})})},L=function(){return u(void 0,void 0,void 0,function(){var e,n,a,o,i,r;return l(this,function(t){switch(t.label){case 0:return e=b.contracts,r=b.account,n=b.stakingTokenName,a=b.stakingDecimals,o=document.getElementById(h.ids.widget.root),i=document.getElementById(h.ids.depositForm.title),o.classList.add("farmfactory-deposit-visible"),i.innerHTML="Balance: "+s(!0),[4,e.staking.methods.balanceOf(r).call()];case 1:return r=t.sent(),i.innerHTML="Balance: <b>"+p(Number(r)/Math.pow(10,a))+" "+n+"</b>",[2]}})})},I='\n  <div class="farmfactory-form farmfactory-withdraw">\n    <div class="farmfactory-title" id="'+h.ids.withdrawForm.title+'"></div>\n    <input class="farmfactory-input" id="'+h.ids.withdrawForm.input+'" type="number" value="" />\n    <div class="farmfactory-row">\n      <button class="farmfactory-button" id="'+h.ids.withdrawForm.cancelButton+'">Cancel</button>\n      <button class="farmfactory-button" id="'+h.ids.withdrawForm.withdrawButton+'">Withdraw</button>\n    </div>\n  </div>\n',x=!1,F=function(){document.getElementById(h.ids.widget.root).classList.remove("farmfactory-withdraw-visible")},R=function(){var t=document.getElementById(h.ids.withdrawForm.cancelButton),e=document.getElementById(h.ids.withdrawForm.withdrawButton);t.addEventListener("click",function(){t.classList.contains("disabled")||F()}),e.addEventListener("click",function(){u(void 0,void 0,void 0,function(){var e,n,a,o,i,r;return l(this,function(t){switch(t.label){case 0:if(b.web3,e=b.contracts,r=b.account,i=b.rewardsDecimals,x)return[2];if(!e.farm)return B("Farm contract is not connected"),[2];if(o=document.getElementById(h.ids.withdrawForm.input),n=document.getElementById(h.ids.withdrawForm.cancelButton),a=document.getElementById(h.ids.withdrawForm.withdrawButton),!(0<(o=Number(o.value))))return[3,5];t.label=1;case 1:return t.trys.push([1,3,4,5]),x=!0,n.classList.add("disabled"),a.innerHTML="Withdraw "+s(),i=c(o,i),[4,e.farm.methods.withdraw(i).send({from:r})];case 2:return t.sent().status&&B("Transaction confirmed!"),F(),w.dispatch("withdraw success"),[3,5];case 3:return r=t.sent(),console.error(r),"INVALID_ARGUMENT"==r.code?B("Placeholder cannot be empty"):B(r.message),[3,5];case 4:return x=!1,n.classList.remove("disabled"),a.innerHTML="Withdraw",[7];case 5:return[2]}})})})},H=function(){return u(void 0,void 0,void 0,function(){var e,n,a,o,i,r;return l(this,function(t){switch(t.label){case 0:return e=b.contracts,r=b.account,n=b.stakingTokenName,a=b.stakingDecimals,o=document.getElementById(h.ids.widget.root),i=document.getElementById(h.ids.withdrawForm.title),o.classList.add("farmfactory-withdraw-visible"),i.innerHTML="Balance: "+s(!0),[4,e.farm.methods.balanceOf(r).call()];case 1:return r=t.sent(),i.innerHTML="Balance: <b>"+p(Number(r)/Math.pow(10,a))+" "+n+"</b>",[2]}})})},A=!1,N='\n  <div class="farmfactory-root" id="'+h.ids.widget.root+'">\n    '+M+"\n    "+I+'\n    <div class="farmfactory-widget">\n      <div class="farmfactory-line">\n        <div class="farmfactory-row">\n          <div class="farmfactory-title">Earned</div>\n          <div class="farmfactory-buttons">\n            <button class="farmfactory-button disabled" id="'+h.ids.widget.harvestButton+'">Harvest</button>\n          </div>\n        </div>\n        <div class="farmfactory-value" id="'+h.ids.widget.earned+'">&mdash;</div>\n      </div>\n      <div class="farmfactory-line">\n        <div class="farmfactory-row">\n          <div class="farmfactory-title">Staked</div>\n          <div class="farmfactory-buttons" id="'+h.ids.widget.lpsButtons+'"></div>\n        </div>\n        <div class="farmfactory-value" id="'+h.ids.widget.staked+'">&mdash;</div>\n      </div>\n    </div>\n  </div>\n',D='\n  <button class="farmfactory-button" id="'+h.ids.widget.approveButton+'">Approve</button>\n',C='\n  <button class="farmfactory-button" id="'+h.ids.widget.depositButton+'">Deposit</button>\n  <button class="farmfactory-button" id="'+h.ids.widget.withdrawButton+'">Withdraw</button>\n',S=function(t){var e,n,a=document.getElementById(h.ids.widget.lpsButtons);t?(a.innerHTML=C,n=b.opts,t=document.getElementById(h.ids.widget.depositButton),n.depositButtonTitle&&(t.innerText=n.depositButtonTitle),t.addEventListener("click",function(){L()}),t=b.opts,e=document.getElementById(h.ids.widget.withdrawButton),t.withdrawButtonTitle&&(e.innerText=t.withdrawButtonTitle),e.addEventListener("click",function(){e.classList.contains("disabled")||H()})):(a.innerHTML=D,f())},P=function(){document.getElementById(h.ids.widgetRoot).innerHTML=N,E(),R(),v(),w.subscribe("setup web3",y),w.subscribe("deposit success",y),w.subscribe("withdraw success",y)},_=function(t){document.getElementById(h.ids.widgetRoot).innerHTML=(t=t,'\n  <div class="farmfactory-root" id="'+h.ids.widget.root+'">\n    <div class="farmfactory-widget-error">\n      <span>'+t+"</span>\n    </div>\n  </div>\n")},O=function(){document.getElementById(h.ids.modalsRoot).innerHTML=""},W=function(){var t=b.opts;document.getElementById(h.ids.modalsRoot).innerHTML=(t=t.networkName.toUpperCase(),'\n  <div class="farmfactory-overlay">\n    <div class="farmfactory-modal">\n      <button class="farmfactory-closeButton" id="'+h.ids.wrongNetworkModal.closeButton+'">\n        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">\n          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>\n        </svg>\n      </button>\n      <div class="farmfactory-inner">\n        Please open your metamask and change network to <b>'+t+"</b>.\n      </div>\n    </div>\n  </div>\n"),document.getElementById(h.ids.wrongNetworkModal.closeButton).addEventListener("click",function(){O()})},j={farm:[{inputs:[{internalType:"address",name:"_rewardsToken",type:"address"},{internalType:"address",name:"_stakingToken",type:"address"},{internalType:"uint256",name:"_rewardsDuration",type:"uint256"},{internalType:"uint256",name:"_stakingTokensDecimal",type:"uint256"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"account",type:"address"}],name:"Paused",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"token",type:"address"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Recovered",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"reward",type:"uint256"}],name:"RewardAdded",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!1,internalType:"uint256",name:"reward",type:"uint256"}],name:"RewardPaid",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"newDuration",type:"uint256"}],name:"RewardsDurationUpdated",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Staked",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"account",type:"address"}],name:"Unpaused",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Withdrawn",type:"event"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"earned",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"exit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"getReward",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"getRewardForDuration",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"lastTimeRewardApplicable",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"lastUpdateTime",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"a",type:"uint256"},{internalType:"uint256",name:"b",type:"uint256"}],name:"min",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"reward",type:"uint256"}],name:"notifyRewardAmount",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"paused",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"periodFinish",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"n",type:"uint256"},{internalType:"uint256",name:"e",type:"uint256"}],name:"pow",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"address",name:"tokenAddress",type:"address"},{internalType:"uint256",name:"tokenAmount",type:"uint256"}],name:"recoverERC20",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"rewardPerToken",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"rewardPerTokenStored",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"rewardRate",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"rewards",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"rewardsDuration",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"rewardsToken",outputs:[{internalType:"contract IERC20",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_rewardsDuration",type:"uint256"}],name:"setRewardsDuration",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"amount",type:"uint256"}],name:"stake",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"stakingToken",outputs:[{internalType:"contract IERC20",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"stakingTokensDecimalRate",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"userRewardPerTokenPaid",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"amount",type:"uint256"}],name:"withdraw",outputs:[],stateMutability:"nonpayable",type:"function"}],rewards:[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"spender",type:"address"},{name:"value",type:"uint256"}],name:"approve",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"value",type:"uint256"}],name:"transferFrom",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_spender",type:"address"},{name:"_value",type:"uint256"},{name:"_extraData",type:"string"}],name:"approveAndCall",outputs:[{name:"success",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"spender",type:"address"},{name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"to",type:"address"},{name:"value",type:"uint256"}],name:"mint",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"value",type:"uint256"}],name:"burn",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"from",type:"address"}],name:"getAvailableBalance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"tokensMinted",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"owner",type:"address"}],name:"balanceOf",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"value",type:"uint256"}],name:"burnFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"account",type:"address"}],name:"addMinter",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[],name:"renounceMinter",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"spender",type:"address"},{name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"to",type:"address"},{name:"value",type:"uint256"}],name:"transfer",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"account",type:"address"}],name:"isMinter",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"owner",type:"address"}],name:"freezeFor",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"owner",type:"address"}],name:"freezeOf",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"},{name:"_unfreezeTimestamp",type:"uint256"},{name:"_subsequentUnlock",type:"bool"}],name:"mintWithFreeze",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"maxSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"owner",type:"address"},{name:"spender",type:"address"}],name:"allowance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,name:"account",type:"address"}],name:"MinterAdded",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"account",type:"address"}],name:"MinterRemoved",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Approval",type:"event"}]};j.staking=j.rewards;function U(t,e){var n=b.opts[t+"Address"],t=j[t];return new e.eth.Contract(t,n)}function z(){return u(void 0,void 0,void 0,function(){var n,a,o,i,r,s;return l(this,function(t){switch(t.label){case 0:return b.account?(n=new window.Web3(window.Web3.givenProvider||window.ethereum),[4,(e=n,u(void 0,void 0,void 0,function(){return l(this,function(t){return[2,Promise.all([U("farm",e),U("rewards",e),U("staking",e)]).then(function(t){return{farm:t[0],rewards:t[1],staking:t[2]}})]})}))]):[2];case 1:return[4,(a=t.sent()).staking.methods.symbol().call()];case 2:return o=t.sent(),[4,a.staking.methods.decimals().call()];case 3:return i=t.sent(),[4,a.rewards.methods.symbol().call()];case 4:return r=t.sent(),[4,a.rewards.methods.decimals().call()];case 5:return s=t.sent(),d({web3:n,contracts:a,stakingTokenName:o,stakingDecimals:i,rewardsTokenName:r,rewardsDecimals:s}),w.dispatch("setup web3"),[2]}var e})})}function V(){return u(void 0,void 0,void 0,function(){var e,n,a;return l(this,function(t){switch(t.label){case 0:if(K)return[2];e=document.getElementById(h.ids.connectModal.cancelButton),n=document.getElementById(h.ids.connectModal.connectButton),t.label=1;case 1:return t.trys.push([1,5,6,7]),K=!0,e.classList.add("disabled"),n.innerHTML="Connect "+s(),[4,window.ethereum.request({method:"eth_requestAccounts"})];case 2:return a=t.sent(),d({account:a[0]}),localStorage.setItem("ff-account-unlocked","true"),[4,window.ethereum.enable()];case 3:return t.sent(),[4,z()];case 4:return t.sent(),X(),[3,7];case 5:return a=t.sent(),console.error(a),B(a.message),[3,7];case 6:return K=!1,e.classList.remove("disabled"),n.innerHTML="Connect",[7];case 7:return[2]}})})}function q(){return u(void 0,void 0,void 0,function(){var e,n,a;return l(this,function(t){switch(t.label){case 0:if(e=b.opts,!(n={1:"mainnet",3:"ropsten",4:"rinkeby",42:"kovan",56:"bsc",97:"bsc_test"}[window.ethereum.networkVersion])||e.networkName.toLowerCase()!==n.toLowerCase())return W(),[2];if(!("true"===localStorage.getItem(tt)))return[3,5];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,window.ethereum.request({method:"eth_accounts"})];case 2:return(a=t.sent())[0]?d({account:a[0]}):(localStorage.removeItem(tt),Y()),[3,4];case 3:return a=t.sent(),console.error(a),localStorage.removeItem(tt),Y(),[3,4];case 4:return[3,6];case 5:Y(),t.label=6;case 6:return[2]}})})}function G(a){return new Promise(function(t,e){var n=document.createElement("script");n.onload=t,n.onerror=e,n.src=a,document.head.appendChild(n)})}var J,K=!1,Q='\n  <div class="farmfactory-overlay">\n    <div class="farmfactory-modal">\n      <button class="farmfactory-closeButton" id="'+h.ids.connectModal.closeButton+'">\n        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">\n          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>\n        </svg>\n      </button>\n      <div class="farmfactory-inner">\n        <img class="farmfactory-svgLogo" src="https://metamask.io/images/mm-logo.svg" alt="Metamask" />\n      </div>\n      <div class="farmfactory-footer">\n        <button class="farmfactory-button yellow" id="'+h.ids.connectModal.connectButton+'">Connect</button>\n        <button class="farmfactory-button gray" id="'+h.ids.connectModal.cancelButton+'">Cancel</button>\n      </div>\n    </div>\n  </div>\n',X=function(){document.getElementById(h.ids.modalsRoot).innerHTML=""},Y=function(){document.getElementById(h.ids.modalsRoot).innerHTML=Q;var t=document.getElementById(h.ids.connectModal.connectButton),e=document.getElementById(h.ids.connectModal.cancelButton),n=document.getElementById(h.ids.connectModal.closeButton);t.addEventListener("click",V),e.addEventListener("click",X),n.addEventListener("click",X)},Z=function(){var t=document.getElementById(h.ids.timerRoot);t&&(t.innerText="--:--:--:--")},$=function(){return u(void 0,void 0,void 0,function(){var e,o,n,a,i,r;return l(this,function(t){switch(t.label){case 0:return(e=b.opts,i=b.contracts,o=document.getElementById(h.ids.timerRoot))?i?[3,2]:(n=new Web3(h.networks[e.networkName]),[4,U("farm",n)]):[2];case 1:n=t.sent(),i={farm:n},t.label=2;case 2:return t.trys.push([2,4,,5]),[4,i.farm.methods.periodFinish().call()];case 3:return a=t.sent(),[3,5];case 4:return i=t.sent(),console.error(i),[2];case 5:return 0<(r=Number(a.toString()))-Date.now()/1e3?(J&&clearInterval(J),J=setInterval(function(){var t=Math.floor((1e3*r-Date.now())/1e3),e=Math.floor(t/86400);t-=86400*e;var n=Math.floor(t/3600)%24;t-=3600*n;var a=Math.floor(t/60)%60,t=(t-=60*a)%60,t=(e<10?"0"+e:e)+":"+(n<10?"0"+n:n)+":"+(a<10?"0"+a:a)+":"+(t<10?"0"+t:t);o.innerText=t},1e3)):o.innerText=e.timesUpMessage||"Farming not started yet",[2]}})})},tt="ff-account-unlocked";return{init:function(s){return u(void 0,void 0,void 0,function(){var a,o,i,r;return l(this,function(t){switch(t.label){case 0:return(a=s.networkName,o=s.farmAddress,i=s.rewardsAddress,r=s.stakingAddress,d({opts:s}),e=document.createElement("div"),n=document.createElement("div"),e.setAttribute("id",h.ids.modalsRoot),n.setAttribute("id",h.ids.infoModalRoot),document.body.appendChild(e),document.body.appendChild(n),a&&o&&i&&r)?document.getElementById(h.ids.widgetRoot)?(P(),Z(),[4,u(void 0,void 0,void 0,function(){return l(this,function(t){return window.ethereum?[2,new Promise(function(t){var e=setInterval(function(){window.ethereum.networkVersion&&(clearInterval(e),q(),window.ethereum.on("networkChanged",q),t())},500)})]:(_('\n      <div class="install-metamask">\n        <img src="https://swaponline.github.io/images/metamask_45038d.svg" /><br />\n        Please install MetaMask\n      </div>\n    '),[2])})})]):(B("Template variable not found! Please use {farmfactory-widget-root}."),[2]):(B("Check farmFactory.init(options). Required options: networkName, farmAddress, rewardsAddress, stakingAddress."),[2]);case 1:return t.sent(),[4,Promise.all([G("https://cdnjs.cloudflare.com/ajax/libs/bignumber.js/8.0.2/bignumber.min.js"),G("https://cdnjs.cloudflare.com/ajax/libs/web3/1.3.1/web3.min.js")])];case 2:return t.sent(),[4,u(void 0,void 0,void 0,function(){return l(this,function(t){switch(t.label){case 0:return[4,z()];case 1:return t.sent(),$(),[2]}})})];case 3:return t.sent(),[2]}var e,n})})}}}();
