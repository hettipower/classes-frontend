/* eslint-disable react/prop-types */
import DefaultCell from "components/ICTableCell/DefaultCell";
import ButtonCell from "components/ICTableCell/ButtonCell";

export default {
  columns: [
    { Header: "Teachers Name", accessor: "teachersName", Cell: ({ value }) => <DefaultCell value={value} />, sortedCol: true },
    { Header: "Email", accessor: "email", Cell: ({ value }) => <DefaultCell value={value} />, sortedCol: true },
    { Header: "Contact No", accessor: "contactNo", Cell: ({ value }) => <DefaultCell value={value} />, sortedCol: true },
    {
      Header: "actions",
      accessor: "actions",
      Cell: ({ value }) => <ButtonCell buttonData={value} />,
      align: "right"
    },
  ],
};
