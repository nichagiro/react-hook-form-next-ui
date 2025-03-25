# Changelog

All notable changes to this project will be documented in this file.

## [3.0.4] - 2025-03-25
In component <DataTable />, testYup

### Added 
- isVirtualized - props (Removed pagination when is in use)
- Search incon in Input search table

### Changed 
- Bottom and Top component, outside of card layout

## Fixed
- local state - if onSelect normally row select in state
- testDualTimeRange - diff in minutes time

## [3.0.2] - 2025-03-13
In component <DataTable />

### Remove 
- defaultPaginateNumber - props
- optionsPaginateNumber - props
- defaultSelectedKeys - props

### Added 
- rowsPerPageOptions  - props

### Changed
- showFilter -> hideFilterSearch - props
- showHandlePaginate -> hideRowsPerPageOptions - props

## Fixed
- when rows is new data, remove selection

## [3.0.1] - 2024-01-21
### Changed
- Update Readme with new feature heroui

## [3.0.0] - 2024-01-20
### Added
- update version librarys

## Breaking Change
- @nextui-org/* to @heroui/*

## Fixed
- Options disabled no selected with *all Options* props

## [>=2.1.0] - 2024-01-03
### Added
- Initial oficial release
- Support React 18 and 19.0.0
- All componentes of FORM NextUI
- Integration RHF
