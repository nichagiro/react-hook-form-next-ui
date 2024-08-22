// hooks
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

// ui
import { DevTool } from "@hookform/devtools"
import schema from "./schema";
import RHFInput from "./components/RHFInput ";
import { Button } from "@nextui-org/react";
import RHFTime from "./components/RHFTime";
import RHFDate from "./components/RHFDate";
import { Iform, iRows } from "./vite-env";
import RHFDualDate from "./components/RHFDualDate";
import DataTable from "./components/dataTable/DataTable";
import Panel from "./components/Panel";
import { useEffect, useState } from "react";
import { fakerRows, fakerUsers } from "./faker";
import { columns } from "./columns";
import Layout from "./components/Layout";
import RHFSelect from "./components/RHFSelect";

const App = () => {
  const [data, setData] = useState<iRows[]>([]);
  const [options, setOptions] = useState<{ id: string, name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const methods = useForm<Iform>({
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Iform> = async data => {
    console.log("🚀 ~ Event ~ data:", data)
  }

  useEffect(() => {
    const rows = fakerRows();
    const options = fakerUsers();
    setData(rows);
    setOptions(options)
    setTimeout(() => {
      setLoading(false);
      methods.setValue("input", "test auto lorem", { shouldValidate: true })
    }, 1000)
  }, [methods])

  return (
    <Layout title="REACT HOOK FORM + NEXTUI">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-5">
            <RHFInput name="input" label="Input" placeholder="Write" />
            <RHFTime name="time" label="Time" />
            <RHFDate name="date" label="Date" />
            <RHFDualDate
              startDate={{ name: "date1", label: "Fecha Inicial" }}
              endDate={{ name: "date2", label: "Fecha Final", visibleMonths: 2 }}
            />
            <RHFSelect
              name="select"
              label="Select"
              placeholder="Seleccione..."
              isLoading={loading}
              data={options}
            />
          </div>
          <div className="my-8">
            <Button type="submit">Click</Button>
          </div>
          <Panel title="Table Component" >
            <DataTable
              selectionMode="multiple"
              onSelect={row => console.log(row)}
              rows={data}
              loading={loading}
              columns={columns}
              renderRow={[{
                key: "view",
                render: () => <>view Component</>
              }, {
                key: "attendance",
                render: () => "attendanceString"
              }]}
            />
          </Panel>
        </form>
      </FormProvider>
      <DevTool control={methods.control} />
    </Layout>
  )
}

export default App