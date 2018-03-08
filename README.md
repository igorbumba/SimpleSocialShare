# SimpleSociaShare.js

Simple social and email share script without using iframe.

Plain JS ES6 with babelized ES5 version using [Babel JS](https://babeljs.io/) compiler.

### Social networks:
- Facebook
- Twitter
- Google Plus

### Email share includes:
- recipient
- CC
- BCC
- subject
- body

## How to use

```JS
new SimpleSocialShare();
```

### Facebook

```JS
new SimpleSocialShare({
    facebook: '.js-share-facebook'
});
```

```HTML
<a href="#" class="js-share-facebook">Share this page on Facebook</a>
```

### Twitter

```JS
new SimpleSocialShare({
    twitter: '.js-share-twitter'
});
```

```HTML
<a href="#" class="js-share-twitter">Tweet this page</a>
```

### Google Plus

```JS
new SimpleSocialShare({
    googleplus: '.js-share-googleplus'
});
```

```HTML
<a href="#" class="js-share-googleplus">Share this page on G+</a>
```

### Email

Using JavaScript:

```JS
new SimpleSocialShare({
    email: {
        selector: '.js-share-email',
        recipient: 'test@test.com',
        subject: 'This is test email subject',
        cc: '',
        bcc: '',
        body: 'This is test email body text'
    }
});
```

```HTML
<a href="#" class="js-share-email">Create new email</a>
```

Using JavaScript and HTML data attributes:

```JS
new SimpleSocialShare({
    email: {
        selector: '.js-share-email'
    }
});
```

```HTML
<a href="#" class="js-share-email" data-recipient="test@test.com" data-subject="This is test email subject" data-cc="test2@test.com" data-bcc="test3@test.com" data-body="This is test email body text">Create new email</a>
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.