/* eslint-disable react/prop-types */
import DefaultCell from "components/ICTableCell/DefaultCell";
import ButtonCell from "components/ICTableCell/ButtonCell";

export default {
  columns: [
    { Header: "Class Name", accessor: "className", Cell: ({ value }) => <DefaultCell value={value} />, sortedCol: true },
    { Header: "Teacher", accessor: "teacher", Cell: ({ value }) => <DefaultCell value={value} />, sortedCol: true },
    {
      Header: "actions",
      accessor: "actions",
      Cell: ({ value }) => <ButtonCell buttonData={value} />,
      align: "right"
    },
  ],
};
