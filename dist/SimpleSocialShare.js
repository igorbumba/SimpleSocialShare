'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleSocialShare = function () {

	/**
  *
  * @param options {object}
  */
	function SimpleSocialShare(options) {
		_classCallCheck(this, SimpleSocialShare);

		var _defaults = {
			facebook: '',
			twitter: '',
			googleplus: '',
			email: {
				selector: '',
				recipient: '',
				subject: '',
				cc: '',
				bcc: '',
				body: ''
			}
		};

		this.defaults = Object.assign({}, _defaults, options);

		this._shareLink = {
			facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
			twitter: 'https://twitter.com/home?status=',
			googleplus: 'https://plus.google.com/share?url='
		};

		this.initShare(this.defaults.facebook, 'facebook');
		this.initShare(this.defaults.twitter, 'twitter');
		this.initShare(this.defaults.googleplus, 'googleplus');
		this.initShare(this.defaults.email.selector, 'email');
	}

	// region Getters

	/**
  *
  * @param elementName
  * @returns {NodeListOf<Element>}
  * @private
  */


	_createClass(SimpleSocialShare, [{
		key: '_getElement',
		value: function _getElement(elementName) {
			if (elementName === '') {
				return false;
			}
			var elementType = elementName.charAt(0);
			switch (elementType) {
				case '#':
					return document.getElementById(elementName.substring(1));
				case '.':
					return document.getElementsByClassName(elementName.substring(1));
				default:
					return document.querySelectorAll(elementName);
			}
		}

		/**
   *
   * @param engine
   * @returns {*}
   * @private
   */

	}, {
		key: '_getShareLink',
		value: function _getShareLink(engine) {
			return this._shareLink[engine];
		}

		// endregion

		// region Share

	}, {
		key: 'initShare',
		value: function initShare(selector, engine) {
			var _this = this;

			var $el = this._getElement(selector);

			if ($el.length > 0) {
				Array.from($el).forEach(function (element) {
					element.addEventListener('click', _this.bindClick.bind(_this, engine));
				});
			}
		}

		/**
   *
   * @param engine
   * @param event
   */

	}, {
		key: 'bindClick',
		value: function bindClick(engine, event) {
			event.preventDefault();
			engine === 'email' ? this.emailClick(event) : window.open('' + this._getShareLink(engine) + encodeURIComponent(location.href), '_blank');
		}

		/**
   *
   * @param event
   */

	}, {
		key: 'emailClick',
		value: function emailClick(event) {

			event.preventDefault();

			var mailToLink = ['mailto:'];
			var dataset = event.currentTarget.dataset;

			this.emailDefaults = Object.assign({}, dataset, this.defaults.email);

			if (this.emailDefaults['recipient'] === undefined || this.emailDefaults['recipient'] === '') {
				return false;
			}

			mailToLink.push(this.emailDefaults['recipient'] + '?');

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.entries(this.emailDefaults).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _ref = _step.value;

					var _ref2 = _slicedToArray(_ref, 2);

					var key = _ref2[0];
					var value = _ref2[1];


					dataset[key] !== undefined ? value = dataset[key] : value;

					switch (key) {
						case 'cc':
							mailToLink.push('&cc=' + value);
							break;
						case 'bcc':
							mailToLink.push('&bcc=' + value);
							break;
						case 'subject':
							value = this._pageTitleURL(value);
							mailToLink.push('&subject=' + encodeURIComponent(value));
							break;
						case 'body':
							value = this._pageTitleURL(value);
							mailToLink.push('&body=' + encodeURIComponent(value));
							break;
						default:
							break;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			location.href = mailToLink;
		}

		/**
   *
   * @param value {string}
   * @returns {*}
   * @private
   */

	}, {
		key: '_pageTitleURL',
		value: function _pageTitleURL(value) {
			value.search("{{PAGE.TITLE}}") >= 0 ? value = value.replace(/{{PAGE.TITLE}}/g, document.title) : value;
			value.search("{{PAGE.URL}}") >= 0 ? value = value.replace(/{{PAGE.URL}}/g, location.href) : value;
			return value;
		}

		// endregion

	}]);

	return SimpleSocialShare;
}();