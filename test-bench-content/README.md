# test-bench-views
Shared views to use in Contrast's web framework test apps.

## Adding a shared view to multiple apps
Once you have configured a sink within [`@contrast/test-bench-utils`](https://github.com/Contrast-Security-OSS/test-bench-utils),
you're ready to add a shared view here. Shared view templates are rendered with
the following locals provided:
- `name`: the name of the vulnerability being tested
- `link`: a link to OWASP or another reference describing the vulnerability
- `sinkData`: an array of objects describing the sinks exercising a rule,
  containing (at least) the following keys:
  - `method`: the HTTP method being used to submit the attack
  - `name`: the name of the particular sink being exercised
  - `url`: the api endpoint url to hit
- `_csrf` for Kraken apps, we provide the csrf token to be included as a hidden
  field within a form

An endpoint may also be configured to provide additional locals to the template
to render additional context for a rule. For example, we provide an XML string
to the _xxe_ endpoint as a potential attack value.
