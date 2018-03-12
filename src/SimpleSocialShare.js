class SimpleSocialShare {

	/**
	 *
	 * @param options {object}
	 */
	constructor(options) {

		let _defaults = {
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
	_getElement(elementName) {
		if (elementName === '') {
			return false;
		}
		const elementType = elementName.charAt(0);
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
	_getShareLink(engine) {
		return this._shareLink[engine];
	}

	// endregion

	// region Share

	initShare(selector, engine) {

		const $el = this._getElement(selector);

		if ($el.length > 0) {
			Array.from($el).forEach((element) => {
				element.addEventListener('click', this.bindClick.bind(this, engine));
			});
		}

	}

	/**
	 *
	 * @param engine
	 * @param event
	 */
	bindClick(engine, event) {
		event.preventDefault();
		engine === 'email' ? this.emailClick(event) : window.open(`${this._getShareLink(engine)}${encodeURIComponent(location.href)}`, '_blank');
	}

	/**
	 *
	 * @param event
	 */
	emailClick(event) {

		event.preventDefault();

		let mailToLink = ['mailto:'];
		const dataset = event.currentTarget.dataset;

		this.emailDefaults = Object.assign({}, dataset, this.defaults.email);

		if (this.emailDefaults['recipient'] === undefined || this.emailDefaults['recipient'] === '') {
			return false;
		}

		mailToLink.push(`${this.emailDefaults['recipient']}?`);

		for (let [key, value] of Object.entries(this.emailDefaults).reverse()) {

			dataset[key] !== undefined ? value = dataset[key] : value;

			value.search("{{PAGE.TITLE}}") >= 0 ? value = value.replace(/{{PAGE.TITLE}}/g, document.title) : value;
			value.search("{{PAGE.URL}}") >= 0 ? value = value.replace(/{{PAGE.URL}}/g, location.href) : value;

			switch (key) {
				case 'cc':
					mailToLink.push(`&cc=${value}`);
					break;
				case 'bcc':
					mailToLink.push(`&bcc=${value}`);
					break;
				case 'subject':
					mailToLink.push(`&subject=${encodeURIComponent(value)}`);
					break;
				case 'body':
					mailToLink.push(`&body=${encodeURIComponent(value)}`);
					break;
				default:
					break;
			}

		}

		location.href = mailToLink;

	}

	// endregion

}