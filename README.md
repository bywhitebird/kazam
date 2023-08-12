# Kazam 🪄

Create reusable components for multiple frameworks and libraries using a single codebase.

> **Warning**
> This project is still in early development. You can use it, but expect breaking changes.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) to see how to setup the project and to know the contribution guidelines.

## Getting Started

Please refer to the [examples](examples) folder to see how to use Kazam.

## Packages

### Core

| Package | Version | Description |
| --- | --- | --- |
| [`kazam`](packages/kazam) | [![npm](https://img.shields.io/npm/v/kazam.svg)](https://www.npmjs.com/package/kazam) | The core package of Kazam. |
| [`@whitebird/kaz-ast`](packages/kaz-ast) | [![npm](https://img.shields.io/npm/v/@whitebird/kaz-ast)](https://www.npmjs.com/package/@whitebird/kaz-ast) | A library to manipulate Kaz files |

### Transformers

| Package | Version | Description |
| --- | --- | --- |
| [`@whitebird/kazam-transformer-react`](packages/kazam-transformer-react) | [![npm](https://img.shields.io/npm/v/@whitebird/kazam-transformer-react)](https://www.npmjs.com/package/@whitebird/kazam-transformer-react) | The React transformer |
| [`@whitebird/kazam-transformer-vue`](packages/kazam-transformer-vue) | [![npm](https://img.shields.io/npm/v/@whitebird/kazam-transformer-vue)](https://www.npmjs.com/package/@whitebird/kazam-transformer-vue) | The Vue transformer |
| [`@whitebird/kazam-transformer-typescript`](packages/kazam-transformer-typescript) | [![npm](https://img.shields.io/npm/v/@whitebird/kazam-transformer-typescript)](https://www.npmjs.com/package/@whitebird/kazam-transformer-typescript) | The TypeScript transformer |

### Parsers

| Package | Version | Description |
| --- | --- | --- |
| [`@whitebird/kazam-parser-kaz`](packages/kazam-parser-kaz) | [![npm](https://img.shields.io/npm/v/@whitebird/kazam-parser-kaz)](https://www.npmjs.com/package/@whitebird/kazam-parser-kaz) | The Kaz parser |

### Other

| Package | Version | Description |
| --- | --- | --- |
| [`@whitebird/kazam-parser-base`](packages/kazam-parser-base) | [![npm](https://img.shields.io/npm/v/@whitebird/kazam-parser-base)](https://www.npmjs.com/package/@whitebird/kazam-parser-base) | An abstract class to create your own parser |
| [`@whitebird/kazam-transformer-base`](packages/kazam-transformer-base) | [![npm](https://img.shields.io/npm/v/@whitebird/kazam-transformer-base)](https://www.npmjs.com/package/@whitebird/kazam-transformer-base) | An abstract class to create your own transformer |
| [`@whitebird/kazam-test-web-transformer`](packages/kazam-test-web-transformer) | [![npm](https://img.shields.io/npm/v/@whitebird/kazam-test-web-transformer)](https://www.npmjs.com/package/@whitebird/kazam-test-web-transformer) | Utility to test your custom transformers |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
