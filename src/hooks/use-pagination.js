import { useCallback, useState } from "react";

export function usePagination() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = useCallback((event, value) => setPage(value), []);

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
        },
        []
    );

    return { page, rowsPerPage, handlePageChange, handleRowsPerPageChange }
}