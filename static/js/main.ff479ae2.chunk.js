(this["webpackJsonpmemory-game"]=this["webpackJsonpmemory-game"]||[]).push([[0],[,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(7),i=a.n(s),c=(a(12),a(2)),u=a(3),l=a(5),o=a(4),d=(a(13),a(0));var m=function(e){return Object(d.jsx)("div",{id:"overlay"})};a(15);var p=function(e){var t=parseInt(e.id)-1;return Object(d.jsxs)("article",{className:"setup-".concat(e.id," setup-panel"),children:[Object(d.jsx)("input",{id:"setupplayer-".concat(e.id),name:"player".concat(e.id,"-setup"),value:e.name,onChange:function(t){return e.handleChange(t,e.id)},placeholder:"Enter Name"}),Object(d.jsx)("button",{onClick:function(){return e.buttonFunc(t)},children:"Set"})]})};a(16);var h=function(e){return e.nameSet?Object(d.jsx)("table",{className:"player".concat(e.turn?" my-turn":"").concat(e.winner?" winner-declared":""," player-").concat(e.number),children:Object(d.jsxs)("tbody",{children:[Object(d.jsxs)("tr",{children:[Object(d.jsxs)("td",{className:"label",children:["Player ",e.number,":"]}),Object(d.jsxs)("td",{className:"input",children:[e.winner===e.number||3===e.winner?Object(d.jsx)("span",{className:"winner-crown",children:String.fromCharCode("0xD83D","0xDC51")}):null,e.name]})]}),Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{className:"label",children:"Score:"}),Object(d.jsx)("td",{className:"input",children:e.score})]})]})}):Object(d.jsx)("div",{className:"player player-".concat(e.number," setup-wrapper"),children:Object(d.jsx)(p,{id:e.number,name:e.name,buttonFunc:e.setPlayer,handleChange:e.handleChange})})};a(17);var j=function(e){var t="";switch(e.winner){case 1:t=e.player1.name;break;case 2:t=e.player2.name;break;case 3:t="";break;default:return void console.log("switch case error")}return Object(d.jsxs)("div",{id:"game-over",children:[t?Object(d.jsxs)("span",{children:[t," wins!"]}):Object(d.jsx)("span",{children:"It's a tie!"}),Object(d.jsxs)("div",{className:"pyro fireworks1",children:[" ",Object(d.jsx)("div",{className:"before"}),Object(d.jsx)("div",{className:"after"})]}),Object(d.jsxs)("div",{className:"pyro fireworks2",children:[" ",Object(d.jsx)("div",{className:"before"}),Object(d.jsx)("div",{className:"after"})]}),Object(d.jsx)("button",{id:"rematch",onClick:e.rematch,children:"Rematch?"})]})},x=(a(18),function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handlePlayerNameChange=function(e){var t=n.state.players;t[parseInt(e.target.id.split("-")[1])-1].name=e.target.value,n.setState({players:t})},n.setPlayer=function(e){var t=n.state.players;t[e].name.length>0&&(t[e].set=!0,n.setState({players:t}),t[0].set&&t[1].set&&n.props.startGame())},n.turn=n.props.turn,n.state={players:[{id:1,name:"",set:!1},{id:2,name:"",set:!1}]},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){console.log("dash mounted"),console.log(this.state)}},{key:"render",value:function(){var e=this;return Object(d.jsxs)("aside",{id:"player-bank",className:"".concat(this.props.winner?" winner-declared":""," turn-").concat(this.props.turn),children:[this.state.players.map((function(t){return Object(d.jsx)(h,{id:"player-".concat(t.id),number:t.id,name:t.name,score:e.props.scores[t.id-1],turn:e.props.turn===t.id,setup:e.props.setup,setPlayer:e.setPlayer.bind(e),handleChange:e.handlePlayerNameChange.bind(e),nameSet:t.set,winner:e.props.winner},"player-".concat(t.id))})),this.props.winner?Object(d.jsx)(j,{player1:this.state.players[0],player2:this.state.players[1],winner:this.props.winner,rematch:this.props.rematch}):null]})}}]),a}(n.Component));a(19);var b=function(e){return Object(d.jsx)("div",{className:"card-wrapper",children:Object(d.jsx)("article",{className:"card ".concat(e.name," ").concat(e.status," turn-").concat(e.turn),id:e.id,onClick:function(){return e.cardClick(e.id,e.status,e.name)},children:Object(d.jsx)("span",{className:"img",children:String.fromCharCode(e.u1,e.u2)})})})};a(20);var f=function(e){return Object(d.jsx)("div",{className:"board",children:e.bank.map((function(t){return Object(d.jsx)(b,{id:t.id,u1:t.u1,u2:t.u2,name:t.name,status:t.status,cardClick:e.cardClick,turn:e.turn},t.id)}))})},y=[{id:1,u1:"0xD83C",u2:"0xDF37",name:"tulip",status:"waiting"},{id:2,u1:"0xD83C",u2:"0xDF37",name:"tulip",status:"waiting"},{id:3,u1:"0xD83C",u2:"0xDF38",name:"sakura",status:"waiting"},{id:4,u1:"0xD83C",u2:"0xDF38",name:"sakura",status:"waiting"},{id:5,u1:"0xD83C",u2:"0xDF3B",name:"sunflower",status:"waiting"},{id:6,u1:"0xD83C",u2:"0xDF3B",name:"sunflower",status:"waiting"},{id:7,u1:"0xD83C",u2:"0xDF08",name:"rainbow",status:"waiting"},{id:8,u1:"0xD83C",u2:"0xDF08",name:"rainbow",status:"waiting"},{id:9,u1:"0xD83C",u2:"0xDF35",name:"cactus",status:"waiting"},{id:10,u1:"0xD83C",u2:"0xDF35",name:"cactus",status:"waiting"},{id:11,u1:"0xD83C",u2:"0xDF3A",name:"hibiscus",status:"waiting"},{id:12,u1:"0xD83C",u2:"0xDF3A",name:"hibiscus",status:"waiting"},{id:13,u1:"0xD83C",u2:"0xDF44",name:"mushroom",status:"waiting"},{id:14,u1:"0xD83C",u2:"0xDF44",name:"mushroom",status:"waiting"},{id:15,u1:"0xD83C",u2:"0xDF3C",name:"daisy",status:"waiting"},{id:16,u1:"0xD83C",u2:"0xDF3C",name:"daisy",status:"waiting"},{id:17,u1:"0xD83C",u2:"0xDF39",name:"rose",status:"waiting"},{id:18,u1:"0xD83C",u2:"0xDF39",name:"rose",status:"waiting"},{id:19,u1:"0xD83C",u2:"0xDF33",name:"tree",status:"waiting"},{id:20,u1:"0xD83C",u2:"0xDF33",name:"tree",status:"waiting"}],w=(a(21),function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).shuffle=function(e){for(var t,a,n=e.length;0!==n;)a=Math.floor(Math.random()*n),t=e[n-=1],e[n]=e[a],e[a]=t;return e},n.setUpGame=function(){n.setState({setup:!0})},n.startGame=function(){console.log("play"),n.setState({overlay:!1,setup:!1,playerTurn:1}),console.log(n.state),n.resetBoard()},n.resetBoard=function(){y.forEach((function(e){e.status="waiting"})),n.setState({cards:n.shuffle(y)}),n.state.winner&&n.setState({firstClick:{name:null,id:null},playerTurn:1,playerScore:[0,0],winner:null})},n.gameOver=function(){n.state.playerScore[0]>n.state.playerScore[1]?n.setState({winner:1}):n.state.playerScore[0]<n.state.playerScore[1]?n.setState({winner:2}):n.setState({winner:3})},n.nextPlayer=function(e){return 1===e?2:2===e?1:void console.log("player turn error: ",e)},n.cardCompare=function(e,t,a){var r=null,s=null,i=n.state.cards[t],c=n.state.cards[a];i.name===c.name?(r="match",s="removed",e.playerScore[e.playerTurn-1]++):(r="no-match",s="waiting",e.playerTurn=n.nextPlayer(e.playerTurn)),e.cards[t].status=r,e.cards[a].status=r,n.setState({cards:e.cards}),setTimeout((function(){e.cards[t].status=s,e.cards[a].status=s,n.setState({overlay:!1,cards:e.cards,firstClick:{id:null,name:null},playerTurn:e.playerTurn,playerScore:e.playerScore}),e.playerScore[0]+e.playerScore[1]===10&&n.gameOver()}),500)},n.cardClick=function(e,t,a){var r=n.state,s=r.cards.findIndex((function(t){return t.id===e}));if("waiting"===t)if(r.cards[s].status="clicked",null===r.firstClick.id)r.firstClick={id:e,name:a},n.setState({cards:r.cards,firstClick:r.firstClick});else{n.setState({overlay:!0});var i=r.cards.findIndex((function(e){return e.id===r.firstClick.id}));n.setState({cards:r.cards}),setTimeout((function(){n.cardCompare(r,s,i)}),200)}},n.state={overlay:!0,setup:!0,cards:[],firstClick:{name:null,id:null},playerTurn:0,playerScore:[0,0],winner:null},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){console.log("app mounted"),console.log(this.state)}},{key:"render",value:function(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(x,{turn:this.state.playerTurn,scores:this.state.playerScore,setup:this.state.setup,startGame:this.startGame.bind(this),winner:this.state.winner,rematch:this.resetBoard.bind(this)}),Object(d.jsxs)("div",{className:"board-wrapper",children:[this.state.overlay?Object(d.jsx)(m,{}):null,Object(d.jsx)(f,{bank:this.state.cards,cardClick:this.cardClick,turn:this.state.playerTurn})]}),Object(d.jsx)("div",{id:"app-footer"})]})}}]),a}(n.Component)),C=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,23)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),s(e),i(e)}))};i.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(w,{})}),document.getElementById("root")),C()}],[[22,1,2]]]);
//# sourceMappingURL=main.ff479ae2.chunk.js.map