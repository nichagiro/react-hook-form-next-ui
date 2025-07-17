# Changelog

All notable changes to this project will be documented in this file.

## [1.0.6] - 2025-07-17
add original parameter "*onSelectionChange*" and fix search onSelect when the **keyRow** is number type (toString)
```js
    rows.map(item => item[keyRow].toString()); //for bug nextUI "ALL"
    rows.filter(item => [...row].includes(item[keyRow].toString())); //multi
```

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