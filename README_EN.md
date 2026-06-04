# Thinking Island

Thinking Island is an open-source math thinking practice app for first-grade children.

It is designed to help young learners build number sense, pattern recognition, comparison reasoning, word problem understanding, and spatial reasoning through short interactive practice sessions.

Live demo: https://freewindtyler.github.io/thinking-island/

## Features

* Five learning levels:

  * Number sense warm-up
  * Pattern detective
  * Comparison practice
  * Word problem reasoning
  * Spatial observation
* Randomized practice sessions
* Expanded question bank
* Instant feedback and explanations
* Mistake review mode
* Local progress storage in the browser
* Mobile-friendly interface
* No login required
* No learning data uploaded by default

## Project Principles

* Child privacy first
* Low-pressure learning
* Reasoning over rote calculation
* Open and extensible educational content
* Community-friendly maintenance

## Local Development

Open `index.html` directly in a browser.

Or run the local static server:

```bash
npm run serve
```

Then visit:

```text
http://localhost:8080
```

## Checks and Tests

Run project checks:

```bash
npm run check
```

Run tests:

```bash
npm test
```

Before release or application review, run:

```bash
npm run release:audit
npm run application:preflight
```

## Question Bank Maintenance

The question bank is located in:

```text
data/lessons.js
```

Each lesson should maintain enough question variations so learners do not simply memorize a fixed order.

Each question should include:

* A stable question ID
* A clear prompt
* Visual support when useful
* Multiple choices
* A valid answer
* A child-friendly explanation

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## Support

See [SUPPORT.md](SUPPORT.md).

## License

This project is released under the MIT License.
