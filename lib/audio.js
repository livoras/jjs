/**
 *
 * 待完善：
 * 1. config是配置项，初始化与默认值合并，待完善
 * 2. 音量调节待完善
 * 3. audio其他属性调整待完善
 * 4. 同一音频多音轨，现在统一为单音轨
 * 5. 多组音频文件未对flash做处理
 *
 * 功能项：
 * 1. 支持链式调用   audio.setMuted(1).play()
 * 2. 支持音量调节
 * 3. 支持静音选择
 */


var util = require("./util")
var $ = util.$

var AUDIO_CACHE = {}  //key-value    key:声音的地址 value:页面中audio元素的id

function Audio(path, config) {
	var audioPath = []			//音频数组、包含不同类型的同一音频 ogg mp3等
	var audioConfig = {
		muted: 0,			//是否静音
		volume: 1			//音量
	}

	audioConfig = util.mergeParams(audioConfig, config)			//默认属性 与 用户自定义属性合并

	//当传过来的音频有多个
	if (path instanceof Array) {
		for (var i in path) {
			audioPath.push(path[i])
		}
	} else if (typeof path == "string"){	//音频只有一个
		audioPath.push(path)
	}

    if(AUDIO_CACHE[path]) {			//当声音已存在
    	this.audioId = AUDIO_CACHE[path]
    } else {
    	this.audioId = "JJLONG_AUDIO_" + Math.ceil(Math.random() * 100000)	//创建随机音频DOM ID
   		
    	//创建音频DOM
   		var audio = document.createElement("audio")
   		audio.autobuffer = true
   		audio.id = this.audioId     //元素的ID不带#号

   		//插入所有的音频文件
   		for (var i in audioPath) {
   			var source = document.createElement("source")
   			source.src = audioPath[i]
   			audio.appendChild(source)
   		}

   		//更新所有的属性
   		for (var i in audioConfig) {
   			audio[i] = audioConfig[i]
   		}

   		document.body.appendChild(audio)			//插入到body

   		this.audioId = AUDIO_CACHE[path] = "#" + this.audioId		//audioId加入 #
   	}

   	this.element = $(this.audioId)			//公用属性
}

//开始播放声音
Audio.prototype.play = function() {
	_this = this.element
	_this.pause()
	_this.currentTime = 0
	_this.play()
	return this
}

//暂停声音
Audio.prototype.pause = function() {
	_this = this.element
	_this.pause()
	return this
}

//设置循环次数
Audio.prototype.setLoop = function(loop) {
	_this = this.element
	_this.loop = loop
	return this
}

//设置音量大小
Audio.prototype.setVolume = function(volume) {
	_this = this.element
	_this.volume = volume
	return this
}

//设置静音
Audio.prototype.setMuted = function(muted) {
	_this = this.element
	_this.muted = !!muted
	return this
}

module.exports = Audio