function Ajax(options) {
	var _this = this,
		ops = options || {};
	_this.type = 'get';
	_this.secure = false;
	_this.data = null;
	_this.dataType = 'text';
	for (var key in ops) {
		this[key] = ops[key];
	}
	_this.xml = this.getXML();
	if (!this.xml && !this.url) {
		return;
	}
	_this.xml.onreadystatechange = function() {
		var rs;
		if (4 === _this.xml.readyState) {
			if (200 === _this.xml.status) {
				rs = _this.xml.responseText || _this.xml.responseXML;
				if ('json' === _this.dataType) {
					rs = eval('(' + rs + ')');
				}
				_this.success(rs, _this.xml);
			} else {
				_this.error(_this.xml.statusText, _this.xml);
			}
		}
	};
	_this.xml.open(this.type, this.url, this.secure);
	_this.xml.send(this.data);
}

Ajax.prototype = {
	getXML: function() {
		var xml;
		if (window.XMLHttpRequest) {
			xml = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xml = new ActiveXObject('Microsoft.XMLHTTP');
		}
		return xml;
	},
	success: function() {},
	error: function() {},
	abort: function() {
		this.xml.abort();
	}
};
Ajax.prototype.constructor = Ajax;
var ajax = new Ajax({
	url: '/a.html',
	dataType: 'json',
	success: function(rs) {
		console.log('成功', rs);
	},
	error: function() {
		console.log('失败');
	}
});
console.log(ajax);