# Changelog

All notable changes to this project will be documented in this file.

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