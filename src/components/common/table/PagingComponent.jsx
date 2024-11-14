import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


const PagingComponent = React.memo((props) => {
    return (
        <Pagination
            size="md"
        >
            {/* first page */}
            {props.totalPages > 1 &&
                <PaginationItem disabled={props.currentPage === 1}>
                    <PaginationLink onClick={() => props.setCurrentPage(1)}>
                        First
                    </PaginationLink>
                </PaginationItem>
            }


            {/* Previous */}
            {props.totalPages > 1 &&
                <PaginationItem
                    disabled={props.currentPage === 1}
                >
                    <PaginationLink
                        onClick={() => props.setCurrentPage(props.currentPage - 1)}
                    >
                        Previous
                    </PaginationLink>
                </PaginationItem>
            }


            {/* Page */}
            {
                new Array(props.totalPages).fill(0).map((_, index) =>
                    <PaginationItem
                        key={index}
                        active={props.currentPage == (index + 1)}
                    >
                        <PaginationLink onClick={() => props.setCurrentPage(index + 1)}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }

            {/* Next */}
            {props.totalPages > 1 &&
                <PaginationItem disabled={props.currentPage === props.totalPages}>
                    <PaginationLink onClick={() => props.setCurrentPage(props.currentPage + 1)}>
                        Next
                    </PaginationLink>
                </PaginationItem>
            }


            {/* Last */}
            {props.totalPages > 1 &&
                <PaginationItem disabled={props.currentPage === props.totalPages}>
                    <PaginationLink onClick={() => props.setCurrentPage(props.totalPages)}>
                        Last
                    </PaginationLink>
                </PaginationItem>
            }

        </Pagination>
    );
})

export default PagingComponent;