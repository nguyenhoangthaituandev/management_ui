import { Helmet } from "react-helmet-async";

import withRouter from "../../hoc/withRouter";
import { Container, Card } from "react-bootstrap";
import DetailDepartmentComponent from "../../components/departments/view_detail/DetailDepartmentComponent";
import DepartmentAPI from "../../api/DepartmentAPI";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountNoDataComponent from "../../components/departments/view_detail/accounts/view_list/AccountNoDataComponent";
import AccountsTableComponent from "../../components/departments/view_detail/accounts/view_list/AccountsTableComponent";
import useBoolean from "../../hooks/useBoolean";
import DeleteAccountModal from "../../components/departments/view_detail/accounts/delete/DeleteAccountModal";
import useNotification from "../../hooks/useNotification";
import DeleteAllAccountsModal from "../../components/departments/view_detail/accounts/delete/DeleteAllAccountsModal";
import UserAPI from "../../api/UserAPI";
import { connect } from "react-redux";
import { selectRole } from "../../redux/selector/UserInfoSelector";
import { ROLE } from "../../constants";



const DetailDepartmentPage = (props) => {

    const navigate = useNavigate();

    const [showSuccessMessage, showErrorMessage] = useNotification();

    const departmentId = props.router.params.id;

    /**
     * Detail Department
     */
    const [detailDepartmentInfo, setDetailDepartmentInfo] = useState({
        name: '',
        managerEmail: '',
        managerFullname: '',
        memberSize: '',
        creatorEmail: '',
        creatorFullname: '',
        createdDateTime: ''
    });


    /**
     * Accounts
     */
    const [accounts, setAccounts] = useState([]);
    //paging
    const [currentAccountPage, setCurrentAccountPage] = useState(1);
    const [totalAccountPages, setTotalAccountPages] = useState(0);
    //sorting
    const [currentAccountSort, setCurrentAccountSort] = useState({ sortField: "id", isASC: false });
    //search
    const [currentAccountSearch, setCurrentAccountSearch] = useState('');
    //filter
    const [currentAccountFilter, setCurrentAccountFilter] = useState({
        minCreatedDate: '',
        maxCreatedDate: '',
        role: '',
        status: '',
    })
    //refresh table
    const [timeRefreshAccountTable, setTimeRefreshAccountTable] = useState(new Date());

    //delete account
    const [isShowDeleteAccountItemModal, setShowDeleteAccountItemModal, setHideDeleteAccountItemModal] = useBoolean(false);
    const [deleteAccountID, setDeleteAccountID] = useState();

    //delete all accounts
    const [isShowDeleteAllAccountsItemModal, setShowDeleteAllAccountsItemModal, setHideDeleteAllAccountsItemModal] = useBoolean(false);
    const [deletingAllAccountIDs, setDeletingAllAccountIDs] = useState(new Set());

    useEffect(() => {
        if (props.role === ROLE.MANAGER) {
            checkPermissionForManager();
        }
    }, []);

    const checkPermissionForManager = async () => {
        const departmentInfo = await UserAPI.getDepartmentInfo();
        if (departmentId != departmentInfo.id) {
            navigate("/auth/403");
        }
    }

    useEffect(() => {
        getDetailDepartmentInfo();
    }, []);

    const getDetailDepartmentInfo = async () => {
        const departmentInfo = await DepartmentAPI.getDetail(departmentId);
        setDetailDepartmentInfo(departmentInfo);
    }

    useEffect(() => {
        getListAccounts();
    }, [currentAccountPage, currentAccountSort, currentAccountSearch, currentAccountFilter]);

    const getListAccounts = async () => {
        const data = await DepartmentAPI.getAllAccountsInDepartment({
            departmentID: departmentId,
            page: currentAccountPage,
            sortField: currentAccountSort.sortField,
            isASC: currentAccountSort.isASC,
            search: currentAccountSearch,
            minCreatedDate: currentAccountFilter.minCreatedDate,
            maxCreatedDate: currentAccountFilter.maxCreatedDate,
            role: currentAccountFilter.role,
            status: currentAccountFilter.status,
        });
        setAccounts(data.content);
        setTotalAccountPages(data.totalPages);
    }

    const resetAccountPaging = useCallback(() => {
        setCurrentAccountPage(1);
    }, []);

    const resetCurrentAccountSort = useCallback(() => {
        setCurrentAccountSort({ sortField: 'id', isASC: false });
    }, []);

    const resetCurrentAccountSearch = useCallback(() => {
        setCurrentAccountSearch('');
    }, []);

    const resetCurrentAccountFilter = useCallback(() => {
        setCurrentAccountFilter({
            minCreatedDate: '',
            maxCreatedDate: '',
            role: '',
            status: '',
        });
    }, []);

    const isAccountSearchEmpty = () => {
        return !currentAccountSearch || currentAccountSearch.length === 0;
    }

    const isAccountFilterEmpty = () => {
        return !currentAccountFilter.minCreatedDate
            && !currentAccountFilter.maxCreatedDate
            && !currentAccountFilter.role
            && !currentAccountFilter.status;
    }

    const onResetAccountTable = useCallback(() => {
        resetAccountPaging();
        resetCurrentAccountSort();
        resetCurrentAccountSearch();
        resetCurrentAccountFilter();
        setTimeRefreshAccountTable(new Date());
        setDeleteAccountID(undefined);
        setDeletingAllAccountIDs(new Set());
    }, []);

    const onShowDeleteAccountItemModal = useCallback((accountID) => {
        //set true show modal
        setShowDeleteAccountItemModal();
        setDeleteAccountID(accountID);
    }, []);

    const onDeleteAccountItem = useCallback(async () => {
        //call api
        await DepartmentAPI.deleteAccountInDetailDepartment(deleteAccountID);
        //show success notification
        showSuccessMessage("Delete account successfully!");
        //reset account table
        onResetAccountTable();
        // reset detail department
        getDetailDepartmentInfo();
    }, [deleteAccountID]);

    const onShowDeleteAllAccountItemModal = useCallback(() => {
        if (deletingAllAccountIDs.size === 0) {
            showErrorMessage("You must choose at least a account to delete");
            return;
        } else {
            //set show delete all modal
            setShowDeleteAllAccountsItemModal();
        }
    }, [deletingAllAccountIDs]);

    const onDeleteAllAccounts = useCallback(async () => {
        //call api
        await DepartmentAPI.deleteAllAccountsInDetailDepartment(Array.from(deletingAllAccountIDs));
        //show success notification
        showSuccessMessage("Delete all accounts successfully!");
        //reset account table
        onResetAccountTable();
        // reset detail department
        getDetailDepartmentInfo();
    }, [deletingAllAccountIDs]);



    const DetailDepartmentComponentMemo = useMemo(() =>
        <DetailDepartmentComponent
            info={detailDepartmentInfo}
        />
        , [detailDepartmentInfo])

    return (
        <>
            <Helmet title="Detail Department" />
            <Container fluid className="p-0">
                <Card>
                    <Card.Header>
                        <h1 className="h3 mb-3 text-center">{detailDepartmentInfo.name} Department</h1>
                        <hr />
                    </Card.Header>
                    <Card.Body>
                        {DetailDepartmentComponentMemo}
                        {
                            accounts.length == 0 && isAccountSearchEmpty() && isAccountFilterEmpty()
                                ? <AccountNoDataComponent />
                                : <AccountsTableComponent
                                    // table
                                    accounts={accounts}
                                    // paging
                                    totalPages={totalAccountPages}
                                    currentPage={currentAccountPage}
                                    setCurrentPage={setCurrentAccountPage}
                                    resetPaging={resetAccountPaging}
                                    // sort
                                    currentSort={currentAccountSort}
                                    setCurrentSort={setCurrentAccountSort}
                                    // search
                                    currentSearch={currentAccountSearch}
                                    setCurrentSearch={setCurrentAccountSearch}
                                    resetCurrentSort={resetCurrentAccountSort}
                                    // filter
                                    currentFilter={currentAccountFilter}
                                    setCurrentFilter={setCurrentAccountFilter}
                                    // refresh table
                                    onResetTable={onResetAccountTable}
                                    timeRefreshTable={timeRefreshAccountTable}
                                    // onclick delete
                                    onShowDeleteItemModal={onShowDeleteAccountItemModal}
                                    // onclick delete all
                                    deletingAllIDs={deletingAllAccountIDs}
                                    setDeletingAllIDs={setDeletingAllAccountIDs}
                                    onShowDeleteAllItemModal={onShowDeleteAllAccountItemModal}
                                />
                        }

                        {isShowDeleteAccountItemModal &&
                            <DeleteAccountModal
                                isHideModal={setHideDeleteAccountItemModal}
                                account={accounts.find((account) => account.id === deleteAccountID)}
                                onDelete={onDeleteAccountItem}
                            />
                        }

                        {isShowDeleteAllAccountsItemModal &&
                            <DeleteAllAccountsModal
                                isHideModal={setHideDeleteAllAccountsItemModal}
                                accounts={accounts.filter((account) => deletingAllAccountIDs.has(account.id))}
                                onDeleteAll={onDeleteAllAccounts}
                            />
                        }
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default connect(
    state => {
        return {
            role: selectRole(state)
        };
    }
)(withRouter(DetailDepartmentPage));