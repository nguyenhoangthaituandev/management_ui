import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSort,
    faSortUp,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";


const SortComponent = React.memo((props) => {

    const onClickSortIcon = () => {
        if (props.currentSort.sortField !== props.APIField) {
            props.setCurrentSort({ sortField: props.APIField, isASC: false });
        } else {
            props.setCurrentSort({ sortField: props.APIField, isASC: !props.currentSort.isASC });
        }
        if (props.resetPaging) {
            props.resetPaging();
        }
    }

    return (
        <FontAwesomeIcon
            className="ms-2"
            icon={
                props.currentSort.sortField !== props.APIField
                    ? faSort
                    : (props.currentSort.isASC ? faSortUp : faSortDown)
            }
            onClick={onClickSortIcon}

        />
    );
})

export default SortComponent;