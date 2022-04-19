---
title: Introduction
---

# What is vue-kbar

@bytebase/vue-kbar is an extensible command+k interface for Vue 3 applications. Inspired by [timc1/kbar](https://github.com/timc1/kbar).

Press <kbd>cmd</kbd>+<kbd>k</kbd> (macOS) or <kbd>ctrl</kbd>+<kbd>k</kbd> (Linux / Windows) to try it out!

## Background

@bytebase/vue-kbar is the command+k interface of [bytebase - Database schema change and version control for teams](https://github.com/bytebase/bytebase).

## Features

- Fully customizable UI
- Keyboard <kbd>up</kbd> / <kbd>down</kbd> / <kbd>ctrl</kbd>+<kbd>p</kbd> / <kbd>ctrl</kbd>+<kbd>n</kbd> navigation
- Global keyboard shortcuts support; e.g. <kbd>g</kbd> then <kbd>h</kbd> for "Go home"
- Navigation from nested actions to parents with <kbd>backspace</kbd>
- Dynamic and auto action registration along with vue component's lifecycle
