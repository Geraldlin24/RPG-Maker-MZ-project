
/*:
Help By:
@author LunaTechs - Kino

@target MV MZ


@param splashScreens
@text Splash Screens 
@desc The lilst of splash screens to use in your game.
@type struct<SplashScreen>[]

@help
==== How To Use ====

Simply add your image and your type of transition to the list
of splash screens.

These pictures must be in your picture folder.


MIT License
Copyright (c) 2020 LunaTechsDev
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
*/

/*~struct~SplashScreen:
* @param image
* @text Image Name
* @desc Name of an image in your pictures folder
* @default Actor1_1
*
* @param splashType
* @text Splash Type click or timer
* @desc The transition type of the splash screen (click or timer)
* @default click
*
* @param timer
* @text The amount of time in frames to keep the splash up when type is timer. 
* @desc The transition type of the splash screen
* @default 300
* 
*/







(function ($hx_exports, $global) { "use strict"
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {};
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""))
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0
		}
		this.r.m = this.r.exec(s)
		this.r.s = s
		return this.r.m != null;
	}
}
EReg.__name__ = true
class Lambda {
	static iter(it,f) {
		let x = $getIterator(it)
		while(x.hasNext()) {
			let x1 = x.next()
			f(x1)
		}
	}
}
Lambda.__name__ = true
class LunaMultisplash {
	static main() {
		let _g = []
		let _g1 = 0
		let _g2 = $plugins
		while(_g1 < _g2.length) {
			let v = _g2[_g1]
			++_g1
			if(new EReg("<LunaMSplash>","ig").match(v.description)) {
				_g.push(v)
			}
		}
		let plugin = _g[0]
		let screens = []
		let params = plugin.parameters
		screens = JsonEx.parse(params["splashScreens"]).map(function(screen) {
			let data = JsonEx.parse(screen)
			haxe_Log.trace(data == null ? "null" : Std.string(data),{ fileName : "src/Main.hx", lineNumber : 28, className : "Main", methodName : "main"})
			return { backgroundImageName : data.image, splashType : data.splashType.trim(), time : data.timer};
		})
		LunaMultisplash.Params = { splashScreens : screens}
		haxe_Log.trace(LunaMultisplash.Params,{ fileName : "src/Main.hx", lineNumber : 38, className : "Main", methodName : "main"})
		let _Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame
		Scene_Boot.prototype.startNormalGame = function() {
			this.checkPlayerLocation()
			DataManager.setupNewGame()
			SceneManager.goto(SceneMultisplash)
			Window_TitleCommand.initCommandPosition()
		}
	}
	static params() {
		return LunaMultisplash.Params;
	}
}
$hx_exports["LunaMultisplash"] = LunaMultisplash
LunaMultisplash.__name__ = true
Math.__name__ = true
class SceneBoot extends Scene_Boot {
	constructor() {
		super();
	}
	startNormalGame() {
		this.checkPlayerLocation()
		DataManager.setupNewGame()
		SceneManager.goto(SceneMultisplash)
		Window_TitleCommand.initCommandPosition()
	}
}
SceneBoot.__name__ = true
class SceneMultisplash extends Scene_MenuBase {
	constructor() {
		super();
	}
	initialize() {
		super.initialize()
		LunaMultisplash.Params.splashScreens.reverse()
		this._screens = LunaMultisplash.Params.splashScreens
		this._screenImages = []
		this._currentScreen = null
		this._screenTimer = 0
		this.preloadSplashImages()
	}
	preloadSplashImages() {
		let _gthis = this
		Lambda.iter(this._screens,function(screen) {
			let bitmap = ImageManager.loadPicture(screen.backgroundImageName)
			_gthis._screenImages.push(bitmap)
		})
	}
	createBackground() {
		super.createBackground()
		this._backgroundSprite.filters = []
		this.setBackgroundOpacity(255)
	}
	createButtons() {
	}
	update() {
		super.update()
		this.updateTimer()
		this.updateSplashScreens()
	}
	updateTimer() {
		if(this._screenTimer > 0) {
			this._screenTimer--
		}
	}
	updateSplashScreens() {
		if(this._currentScreen == null && this._screens.length > 0) {
			this._currentScreen = this._screens.pop()
			this._currentImage = this._screenImages.pop()
			this.setupScreen(this._currentScreen)
		} else if(this._currentScreen != null) {
			haxe_Log.trace("Updating Splash",{ fileName : "src/SceneMultisplash.hx", lineNumber : 77, className : "SceneMultisplash", methodName : "updateSplashScreens", customParams : [this._screenTimer]})
			this.transitionSplash()
		}
		if(this._fadeDuration == 0 && this._fadeSign == -1) {
			this.startFadeIn(60,false)
			this._backgroundSprite.bitmap = this._currentImage
		}
	}
	transitionSplash() {
		switch(this._currentScreen.splashType) {
		case "click":
			if(Input.isTriggered("ok") || TouchInput.isPressed() && this._screens.length > 0) {
				this._currentScreen = this._screens.pop()
				this._currentImage = this._screenImages.pop()
				this.setupScreen(this._currentScreen)
			} else if(Input.isTriggered("ok") || TouchInput.isPressed()) {
				SceneManager.goto(Scene_Title)
			}
			break
		case "timer":
			if(this._screenTimer == 0 && this._screens.length > 0) {
				this._currentScreen = this._screens.pop()
				this._currentImage = this._screenImages.pop()
				this.setupScreen(this._currentScreen)
			} else if(this._screenTimer == 0) {
				SceneManager.goto(Scene_Title)
			}
			break
		}
	}
	setupScreen(screen) {
		this.startFadeOut(60,false)
		switch(this._currentScreen.splashType) {
		case "click":
			break
		case "timer":
			this._screenTimer = this._currentScreen.time
			break
		}
	}
}
$hx_exports["SceneMultisplash"] = SceneMultisplash
SceneMultisplash.__name__ = true
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true
class haxe_Log {
	static formatOutput(v,infos) {
		let str = Std.string(v)
		if(infos == null) {
			return str;
		}
		let pstr = infos.fileName + ":" + infos.lineNumber
		if(infos.customParams != null) {
			let _g = 0
			let _g1 = infos.customParams
			while(_g < _g1.length) {
				let v = _g1[_g]
				++_g
				str += ", " + Std.string(v);
			}
		}
		return pstr + ": " + str;
	}
	static trace(v,infos) {
		let str = haxe_Log.formatOutput(v,infos)
		if(typeof(console) != "undefined" && console.log != null) {
			console.log(str)
		}
	}
}
haxe_Log.__name__ = true
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0
		this.array = array
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o)
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object"
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__]
				let n = e.__constructs__[o._hx_index]
				let con = e[n]
				if(con.__params__) {
					s = s + "\t"
					return n + "(" + ((function($this) {
						var $r
						let _g = []
						{
							let _g1 = 0
							let _g2 = con.__params__
							while(true) {
								if(!(_g1 < _g2.length)) {
									break
								}
								let p = _g2[_g1]
								_g1 = _g1 + 1
								_g.push(js_Boot.__string_rec(o[p],s))
							}
						}
						$r = _g
						return $r;
					}(this))).join(",") + ")"
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "["
				s += "\t";
				let _g = 0
				let _g1 = o.length
				while(_g < _g1) {
					let i = _g++
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr
			try {
				tostr = o.toString
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString()
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n"
			s += "\t";
			let hasp = o.hasOwnProperty != null
			let k = null
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1)
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true
class _$LTGlobals_$ {
}
_$LTGlobals_$.__name__ = true
class utils_Fn {
	static proto(obj) {
		return obj.prototype;
	}
	static updateProto(obj,fn) {
		return (fn)(obj.prototype);
	}
	static updateEntity(obj,fn) {
		return (fn)(obj);
	}
}
utils_Fn.__name__ = true
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
String.__name__ = true
Array.__name__ = true
js_Boot.__toStr = ({ }).toString
LunaMultisplash.listener = new PIXI.utils.EventEmitter()
LunaMultisplash.main()
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, {})

//# sourceMappingURL=Luna_Multisplash.js.map
