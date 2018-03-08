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

		// INIT FACEBOOK
		this.initFacebook();

		// INIT TWITTER
		this.initTwitter();

		// INIT GOOGLE PLUS
		this.initGooglePlus();

		// INIT EMAIL
		this.initEmail();

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

	/**
	 *
	 * @returns {NodeListOf<Element>}
	 */
	getFacebookElements() {
		return this._getElement(this.defaults.facebook);
	}

	/**
	 *
	 * @returns {NodeListOf<Element>}
	 */
	getTwitterElements() {
		return this._getElement(this.defaults.twitter);
	}

	/**
	 *
	 * @returns {NodeListOf<Element>}
	 */
	getGooglePlusElements() {
		return this._getElement(this.defaults.googleplus);
	}

	/**
	 *
	 * @returns {NodeListOf<Element>}
	 */
	getEmailElements() {
		return this._getElement(this.defaults.email.selector);
	}

	// endregion

	// region Facebook

	/**
	 *
	 */
	initFacebook() {
		if (this.getFacebookElements().length > 0) {
			Array.from(this.getFacebookElements()).forEach((element) => {
				element.addEventListener('click', this.facebookClick.bind(this));
			});
		}
	}

	/**
	 *
	 * @param event
	 */
	facebookClick(event) {
		event.preventDefault();
		window.open(`${this._getShareLink('facebook')}${encodeURIComponent(location.href)}`, '_blank');
	}

	// endregion

	// region Twitter

	/**
	 *
	 */
	initTwitter() {
		if (this.getTwitterElements().length > 0) {
			Array.from(this.getTwitterElements()).forEach((element) => {
				element.addEventListener('click', this.twitterClick.bind(this));
			});
		}
	}

	/**
	 *
	 * @param event
	 */
	twitterClick(event) {
		event.preventDefault();
		window.open(`${this._getShareLink('twitter')}${encodeURIComponent(location.href)}`, '_blank');
	}

	// endregion

	// region Google Plus

	/**
	 *
	 */
	initGooglePlus() {
		if (this.getGooglePlusElements().length > 0) {
			Array.from(this.getGooglePlusElements()).forEach((element) => {
				element.addEventListener('click', this.googlePlusClick.bind(this));
			});
		}
	}

	/**
	 *
	 * @param event
	 */
	googlePlusClick(event) {
		event.preventDefault();
		window.open(`${this._getShareLink('googleplus')}${encodeURIComponent(location.href)}`, '_blank');
	}

	// endregion

	// region Email

	initEmail() {
		if (this.getEmailElements().length > 0) {
			Array.from(this.getEmailElements()).forEach((element) => {
				element.addEventListener('click', this.emailClick.bind(this));
			});
		}
	}

	/**
	 *
	 * @param event
	 */
	emailClick(event) {

		let mailToLink = ['mailto:'];
		const dataset = event.currentTarget.dataset;

		this.emailDefaults = Object.assign({}, dataset, this.defaults.email);

		if (this.emailDefaults['recipient'] === undefined || this.emailDefaults['recipient'] === '') {
			return false;
		}

		mailToLink.push(`${this.emailDefaults['recipient']}?`);

		for (let [key, value] of Object.entries(this.emailDefaults).reverse()) {

			dataset[key] !== undefined ? value = dataset[key] : value;

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