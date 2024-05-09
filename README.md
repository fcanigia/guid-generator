# guid-generator

[![CI/CD](https://github.com/fcanigia/guid-generator/actions/workflows/azure-static-web-apps-ambitious-sky-01081dc0f.yml/badge.svg)](https://github.com/fcanigia/guid-generator/actions/workflows/azure-static-web-apps-ambitious-sky-01081dc0f.yml)

[Guid Generator](https://freeguid.online)

## Features
- [x] allow to create GUIDS
  - [x] selecting quantity
  - format (hyphens, uppercase, braces, quotes, commas)
  - encoding
- [x] copy to clipboard 
- download to a file
- parse depending on the language
  - c#: var guid1 = new Guid("98b46b60-d125-11ee-8939-63aed55d17c4");
  - plain text
  - js/ts
  - java
- guid version? v1? v4?
  - explain different guid types
- console mode?
- generated guids counter?
- github link
- disclaimer that the guid is generated as is without any warranty
- licence? mit?

## benchmark 
good info: https://www.squash.io/tutorial-generating-guid-in-typescript/
- check the fastest option to create 100.000 guids
- libraries
- function with random

https://github.com/tinylibs/tinybench

## stack
- vue
- tailwind

## hosting
Azure Static Web App

## CI/CD
Github Actions

## tests
absolutely, should be green for the CI/CD

## GUIDS?
- https://www.ietf.org/rfc/rfc4122.txt RFC4122
