import { describe, test } from 'vitest'

describe('transformer-vue', () => {
  describe('transform', () => {
    test('')
  })
})

// describe('transformer-vue', () => {
//   describe('transform', () => {
//     Object.values(transformFixtures).forEach((fixtures) => {
//       fixtures.forEach((fixture) => {
//         test(fixture.name, async () => {
//           const transformer = new TransformerVue(fixture.input, {})

//           const result = await transformer.transform()

//           if (fixture.expectedOutput) {
//             for (const [name, output] of Object.entries(result)) {
//               // console.log(name, await (output as Blob).text())
//               // expectToEqualIgnoreWhitespace(
//               //   await (output as Blob).text(),
//               //   prettier.format(
//               //     fixture.expectedOutput[`components/${name}.vue`],
//               //     {
//               //       parser: 'babel-ts',
//               //       printWidth: Infinity,
//               //     },
//               //   ),
//               // )
//             }
//           }
//         })
//       })
//     })
//   })
// })
