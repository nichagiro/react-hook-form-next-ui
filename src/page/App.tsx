// hooks
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

// ui
import { DevTool } from "@hookform/devtools"
import { Button, DatePicker, Divider } from "@heroui/react";
import RHFInput from "../components/RHFInput";
import RHFTime from "../components/RHFTime";
import RHFDate from "../components/RHFDate";
import DataTable from "../components/dataTable/DataTable";
import Panel from "../components/Panel";
import RHFSelect from "../components/RHFSelect";
import RHFTextArea from "../components/RHFTextArea";
import RHFAutocomplete from "../components/RHFAutocomplete";
import Modal from "../components/Modal";
import RHFRadioGroup from "../components/RHFRadioGroup";
import RHFCheckbox from "../components/RHFCheckbox";
import RHFCheckboxGroup from "../components/RHFCheckboxGroup";
import RHFInputOtp from "../components/RHFInputOtp";

// statics
import schema from "../static/schema";
import { columns } from "../static/columns";
import { fakerRows, fakerUsers } from "../static/faker";

// hooks and types
import { useEffect, useState } from "react";
import { IForm } from "../types/app";

// utils
import React from "react";

const App = () => {
  const [data, setData] = useState<IRows[]>([]);
  const [options, setOptions] = useState<{ key: string, label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const methods = useForm<IForm>({
    shouldFocusError: true,
    resolver: yupResolver(schema),
    defaultValues: {
      input: "CRACK",
      select: "10",
      autocomplete: "928",
      checkbox: true,
      area: "lorem ipsum dolor sit amet",
      checkboxGroup: ["928", "10"],
      date: "1997-09-28",
      opt: "0928",
      time: "14:28",
      radios: "928",
    }
  });

  const onSubmit: SubmitHandler<IForm> = async data => {
    console.log("🚀 ~ Event ~ data:", data)
  }

  const getData = (index?: number) => {
    const rows = fakerRows(index);
    const options = fakerUsers(1);

    setData(rows);

    setOptions([
      {
        key: "928",
        label: "Nicolas"
      }, {
        key: "10",
        label: "James"
      },
      ...options
    ])
  }

  useEffect(() => {
    getData(100)

    setTimeout(() => {
      setLoading(false);
      methods.setValue("area", "test auto lorem", { shouldValidate: true })
      // methods.setValue("opt", "092")
      // methods.setValue("checkbox", true, { shouldValidate: true })
      // methods.setValue("checkboxGroup", ["928", "10"], { shouldValidate: true })
      // methods.setValue("radios", "2", { shouldValidate: true })
      // methods.setValue("autocomplete", "928", { shouldValidate: true })
      // methods.setValue("select", "928", { shouldValidate: true })
      // methods.setValue("input", "446545604650", { shouldValidate: true })
      // methods.setValue("date", new CalendarDate(1997, 9, 28))
      // methods.setValue("date1", today(getLocalTimeZone()))
      // methods.setValue("time", new Time(14, 28))
    }, 1000)
  }, [methods])

  return (
    <>
      <header className="bg-primary w-full text-center text-white py-5">
        <h1 className="font-bold text-lg">
          REACT HOOK FORM + NEXTU
        </h1>
      </header>
      <Divider />
      <main className="p-5 2xl:px-16 2xl:py-5 mx-auto">
        <Modal
          display={modal}
          title="Tabla de resultados"
          size="5xl"
          acceptButton={{
            color: "danger",
            onPress: () => console.log("first"),
            children: "Aceptar",
          }}
          cancelButton={{
            color: "warning",
            children: "Cancelar"
          }}
          onClose={() => setModal(false)}
        >
          <DataTable
            selectionMode="multiple"
            onSelect={row => console.log(row)}
            rows={[data[1]]}
            color="danger"
            loading={loading}
            columns={columns}
          />
        </Modal>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex gap-5 mb-5 justify-end">
              <Button color="danger" onPress={() => getData(15)}>
                submit
              </Button>
            </div>
            <Panel title="FORM WITHOUT SCHEMA" collapse>
              <div className="flex gap-5 mb-5">
                <RHFCheckboxGroup
                  name="checkboxGroup"
                  data={options.map(item => ({ children: item.label, value: item.key }))}
                  orientation="horizontal"
                  color="danger"
                  onChange={e => console.log("onchange", e)}
                  onValueChange={e => console.log("onValueChange", e)}
                // defaultValue={["928"]}
                />
              </div>
              <div className="flex gap-5">
                <DatePicker className="max-w-[284px]" label="Birth date" />
                <div className="mb-5">
                  <Button color="secondary" onPress={() => setModal(true)}>
                    Modal
                  </Button>
                </div>
                <RHFCheckbox
                  name="checkbox"
                  onValueChange={e => console.log(e)}
                >
                  PETROUSKY
                </RHFCheckbox>
                <RHFInput
                  name="inputR"
                  label="RULES INPUT"
                  onChange={e => console.log(e)}
                  color="danger"
                  type="text"
                  rules={{
                    maxLength: { message: "maximo 10 letras", value: 10 },
                    minLength: { message: "minimo 4 letras", value: 4 },
                    required: { message: "campo requerido", value: true },
                  }}
                />
                <RHFInput
                  name="inputR2"
                  label="RULES INPUT NUMBER"
                  color="primary"
                  type="number"
                  rules={{
                    max: { message: "maximo 10", value: 10 },
                    min: { message: "minimo 4", value: 4 },
                    required: { message: "campo requerido", value: true },
                  }}
                />
              </div>
            </Panel>
            <Panel title="FORM WITH SCHEMA">
              <div className="grid grid-cols-3 gap-5">
                <RHFTime
                  name="time"
                  label="Time"
                  color="primary"
                // granularity="second"
                // onChange={e => console.log(e)}
                />
                <RHFInputOtp
                  name="opt"
                  length={4}
                  onChange={e => console.log(e)}
                  color="primary"
                  rules={{ required: { message: "requerido pape", value: true } }}
                />
                <RHFInput
                  name="input"
                  label="Input"
                  placeholder="Write"
                  variant="bordered"
                  color="warning"
                  onValueChange={e => console.log(e)}
                  classNames={{ input: "text-end" }}
                />
                <RHFTime name="time2" label="Time2" color="secondary" />
                <RHFDate
                  granularity="hour"
                  hourCycle={12}
                  // defaultValue={"1997-09-28"}
                  // onBlur={e => console.log(e)}
                  name="dat3"
                  label="Dat3e"
                  color="primary"
                  onChange={e => console.log(e)}
                />
                <RHFDate
                  name="date"
                  label="Date"
                  color="success"
                  rules={{ required: { value: true, message: "Campo Requerido" } }}
                />
                <RHFSelect
                  name="select"
                  label="Select"
                  placeholder="Seleccione..."
                  isLoading={loading}
                  data={options.map(item => ({ key: item.key, children: item.label }))}
                  onSelectionChange={e => console.log(e)}
                  onChange={e => console.log("onChange- ", e)}
                // selectionMode="multiple"
                />
                <RHFTextArea
                  name="area"
                  label="textArea"
                  placeholder="escriba en el textArea"
                  rules={{ required: { message: "obligado pape", value: true } }}
                  onValueChange={e => console.log(e)}
                  onChange={e => console.log("oChange- ", e)}
                />
                <RHFAutocomplete
                  name="autocomplete"
                  label="Autocomplete"
                  placeholder="Autocomplete"
                  data={options.map(item => ({ children: item.label, key: item.key }))}
                  disabledKeys={["10"]}
                  rules={{ required: { value: true, message: "uyy zona" } }}
                  onBlur={e => console.log("onBlur- ", e)}
                  onSelectionChange={e => console.log(e)}
                />
                <RHFRadioGroup
                  name="radios"
                  data={options.map(item => ({ value: item.key, children: item.label }))}
                  label="Elementos Relacionados?"
                  orientation="horizontal"
                  onValueChange={value => console.log(value)}
                  onChange={e => console.log("onChange- ", e)}
                  rules={{ required: { message: "mmmmmjuu", value: true } }}
                />
              </div>
              <div className="my-8 gap-5 flex">
                <Button type="submit">Click</Button>
                <Button onPress={() => methods.reset()} color="danger">reset</Button>
              </div>
            </Panel >
            <Panel title="Table Component" >
              <DataTable
                isVirtualized
                maxTableHeight={500}
                isHeaderSticky
                isStriped
                cellClass="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px]"
                rowsPerPageOptions={{ default: 3, options: [3, 5, 7] }}
                sortDescriptor={{ column: "service", direction: "ascending" }}
                inputSearch={{ variant: "bordered", color: "warning" }}
                color="primary"
                selectionMode="multiple"
                onSelect={row => console.log(row)}
                onSelectionChange={row => console.log("onSelectionChange", row)}
                rows={data}
                loading={loading}
                columns={columns}
                localText={{
                  emptyContent: "NICO",
                  items: ["Nico", "Nicolas"],
                  paginateButtons: ["NICOA", "ANgela"],
                  rowsPerPage: "nico por pagina",
                }}
                extraTopContent={
                  <div className="flex gap-x-2">
                    <Button color="warning">One</Button>
                    <Button color="danger">Two</Button>
                  </div>
                }
              />
            </Panel>
          </form>
        </FormProvider>
        <DevTool control={methods.control} />
      </main>
    </>

  )
}

export default App