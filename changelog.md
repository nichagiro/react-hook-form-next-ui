# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-09-02
- update tailwind v3 => v4
- update all dependencies

## [1.0.9] - 2025-09-02
- update <DataTable>, show localText.items ('300 users') only when data length > 0

## [1.0.8] - 2025-07-21
- update padding in wrapper of <DataTable> when props is present isHeaderSticky and isVirtualize; This prevents rows from being seen when scrolling past the header.

## [1.0.7] - 2025-07-17
- add original parameter "*onSelectionChange*" and fix search onSelect when the **keyRow** is number type (toString)
```js
   <DataTable
    selectionMode="multiple"
    onSelect={row => console.log(row)}
    onSelectionChange={row => console.log("onSelectionChange", row)}
    />
```

- add effect when rows params change it's dataset, clean current page (pagination) and selecteds rows


## [1.0.2] - 2025-07-07
Fusion HeroUI with React Hook Form

- <RHFSelect>
- <RHFAutocomplete>
- <RHFCheckBox>
- <RHFCheckBoxGroup>
- <RHFInput>
- <RHFInputOpt>
- <RHFDate>
- <RHFTime>
- <RHFRadio>
- <RHFTextArea>
- <Panel>
- <Modal>
- <DataTable>