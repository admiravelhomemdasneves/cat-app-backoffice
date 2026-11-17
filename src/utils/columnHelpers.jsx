import { Link } from "react-router-dom";

export const createIdLinkColumn = ({ field, pathPrefix, headerName = "ID", flex = 0.5, getState }) => ({
    field,
    headerName,
    flex,
    editable: false,
    sortable: true,
    renderCell: (params) => (
        <Link
            to={`/${pathPrefix}/${params.value}`}
            state={getState ? getState(params.row) : undefined}
            onClick={(e) => e.stopPropagation()}
            style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
        >
            #{params.value}
        </Link>
    ),
});
